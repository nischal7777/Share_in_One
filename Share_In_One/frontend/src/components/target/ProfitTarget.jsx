import React, { useEffect, useState } from 'react';
import { SidebarLayout } from '../../utils/SidebarLayout';

export const ProfitTarget = () => {
	const [showModal, setShowModal] = useState(false);
	const [companies, setCompanies] = useState([]);
	const [targets, setTargets] = useState([]);
	const [company, setCompany] = useState('NABIL');
	const [percentage, setPercentage] = useState('');
	const [counter, setCounter] = useState(0);
	useEffect(() => {
		(async () => {
			const resp = await fetch('http://localhost:5000/api/stock/companies', {
				method: 'GET',
				credentials: 'include',
			});
			const respData = await resp.json();
			setCompanies(respData);
		})();
	}, []);

	useEffect(() => {
		(async () => {
			const resp = await fetch('http://localhost:5000/api/target/', {
				method: 'GET',
				credentials: 'include',
			});
			const respData = await resp.json();
			setTargets(respData);
		})();
	}, [counter]);

	const onSubmitHandler = async () => {
		setCounter(counter + 1);
		await fetch('http://localhost:5000/api/target/', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				changeType: 'profit',
				company: company,
				percentage: Number(percentage),
			}),
			credentials: 'include',
		});
		setPercentage('');
		showModal(false);
	};
	return (
		<SidebarLayout layoutName={'Stop Loss'}>
			<nav className='flex items-center justify-between px-10 bg-white py-6 border-b'>
				<div className='flex items-center'>
					<p className='font-semibold text-2xl'>Profit Target</p>
				</div>
				<div className='flex items-center'>
					<p className='font-semibold text-2xl'></p>
				</div>
				<div className='flex items-center space-x-4'>
					<div
						className='flex items-center gap-2 w-full bg-[#EC5252] py-1 px-5 rounded-xl text-white'
						onClick={() => {
							setShowModal(true);
						}}>
						{/* <GrAdd size={20} style={{ color: 'white' }} /> */}
						<p style={{ color: 'white', fontSize: '30px' }}>+</p>
						Add Stock
					</div>
				</div>
			</nav>
			<div>
				{targets.map((item) => {
					if (item.changeType === 'profit') {
						return (
							<div
								className='grid grid-cols-3 text-xl border p-5 bg-gray-100 rounded text-center'
								key={item.id}>
								<p>{item.company_name}</p>
								<p>{item.percentage}</p>
								<p>{item.price}</p>
							</div>
						);
					} else {
						return null;
					}
				})}
			</div>
			{showModal ? (
				<>
					<div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
						<div className='relative w-[40%] my-6 mx-auto'>
							{/*content*/}
							<div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
								{/*header*/}
								<div className='flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t'>
									<h3 className='text-3xl font-semibold'>Add Target</h3>
									<button
										className='p-1 ml-auto border-0 text-black float-right text-3xl leading-none font-semibold'
										onClick={() => setShowModal(false)}>
										<span className='text-black h-6 w-6 text-2xl block'>×</span>
									</button>
								</div>
								{/*body*/}
								<div className='p-8'>
									<form class='space-y-5'>
										<div>
											<label className='block mb-1 font-bold text-gray-500'>
												Company
											</label>
											<select
												className='border border-gray-200 rounded w-full p-3 bg-white'
												onChange={(e) => {
													setCompany(e.target.value);
												}}
												value={company}>
												{companies.map((item) => {
													return (
														<option key={item} value={item}>
															{item}
														</option>
													);
												})}
											</select>
										</div>

										<div>
											<label class='block mb-1 font-bold text-gray-500'>
												Target (%)
											</label>
											<input
												type='text'
												placeholder='10'
												class='w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500'
												value={percentage}
												onChange={(e) => {
													setPercentage(e.target.value);
												}}
											/>
										</div>
									</form>
								</div>
								{/*footer*/}
								<div className='flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b'>
									<button
										className='text-white bg-green-500 rounded-lg background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
										type='button'
										onClick={onSubmitHandler}>
										Submit
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
				</>
			) : null}
		</SidebarLayout>
	);
};
