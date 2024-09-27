const nodemailer = require('nodemailer');
const { getNepseShares } = require('../getNepseShares');
const { Target } = require('../models/Target');
const { Users } = require('../models/Users');
const { convertModelToJSON } = require('../utils/convertModelToJSON');

const senderMailAddress = 'anjaldhakal01@gmail.com';
const senderMailPassword = 'olgcyxrrjyljrync';

const handleLoss = async () => {
	try {
		console.log('Task Hit');
		const targets = await Target.findAll();
		const nepseData = await getNepseShares();
		if (targets.length !== 0) {
			let mailTransporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					user: senderMailAddress,
					pass: senderMailPassword,
				},
			});
			for (const target of targets) {
				const newTarget = convertModelToJSON(target);
				const user = await Users.findOne({ where: { id: target.userId } });
				const receiverMail = user.email;
				if (newTarget.changeType === 'loss') {
					for (const nepseItem of nepseData) {
						if (nepseItem.symbol === newTarget.company_name) {
							const percentageOfLTP =
								Number(nepseItem.ltp) * (Number(newTarget.percentage) / 100);
							const percentageOfTarget =
								Number(newTarget.price) * (Number(newTarget.percentage) / 100);

							if (percentageOfLTP < percentageOfTarget) {
								let mailDetails = {
									from: senderMailAddress,
									to: receiverMail,
									subject: 'EMERGENCY!! STOP LOSS HIT',
									text: `The specified stop loss of ${target.percentage}% has been hit. The new price of ${target.company_name} is ${nepseItem.ltp}`,
								};
								mailTransporter.sendMail(
									mailDetails,
									async function (err, data) {
										if (err) {
											console.log('Error Occurs');
										} else {
											await Target.destroy({ where: { id: newTarget.id } });
											console.log('Successfully Deleted');
										}
									}
								);
								console.log(mailDetails);
							}
						}
					}
				} else if (newTarget.changeType === 'profit') {
					for (const nepseItem of nepseData) {
						if (nepseItem.symbol === newTarget.company_name) {
							const percentageOfLTP =
								Number(nepseItem.ltp) * (Number(newTarget.percentage) / 100);
							const percentageOfTarget =
								Number(newTarget.price) * (Number(newTarget.percentage) / 100);

							if (percentageOfLTP > percentageOfTarget) {
								let mailDetails = {
									from: senderMailAddress,
									to: receiverMail,
									subject: 'EMERGENCY!! PROFIT TARGET HIT',
									text: `The specified profit target of ${target.percentage}% has been hit. The new price of ${target.company_name} is ${nepseItem.ltp}`,
								};
								mailTransporter.sendMail(
									mailDetails,
									async function (err, data) {
										if (err) {
											console.log('Error Occurs');
										} else {
											await Target.destroy({ where: { id: newTarget.id } });
											console.log('Successfully Deleted');
										}
									}
								);
								console.log(mailDetails);
							}
						}
					}
				}
			}
		} else {
			console.log('Empty Targets');
		}
	} catch (error) {
		console.log(error);
	}
};

/** @type {import("express").RequestHandler} */
const addTarget = async (req, res) => {
	const { changeType, company, percentage } = req.body;
	const userId = Number(req.user);
	try {
		const nepseData = await getNepseShares();
		let price = 0;
		for (const nepseItem of nepseData) {
			if (nepseItem.symbol === String(company)) {
				price = Number(nepseItem.ltp);
			}
		}
		const createdTarget = await Target.create({
			company_name: String(company),
			percentage: Number(percentage),
			changeType: String(changeType),
			price: price,
			userId: userId,
		});
		return res.status(200).json(createdTarget);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: 'An Internal Error Occured' });
	}
};

/** @type {import("express").RequestHandler} */
const getTargets = async (req, res) => {
	const userId = Number(req.user);
	try {
		const user = await Users.findOne({ where: { id: userId } });
		if (!user) return res.status(404).json({ error: 'User Not Found' });
		const allTargets = await Target.findAll({ where: { userId: user.id } });
		return res.status(200).json(allTargets);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: 'An Internal Error Occured' });
	}
};

module.exports = { handleLoss, addTarget, getTargets };
