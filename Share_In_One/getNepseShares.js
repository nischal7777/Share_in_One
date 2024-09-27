const axios = require('axios');
const cheerio = require('cheerio');

const getNepseShares = async () => {
	const URL = 'https://www.nepalipaisa.com/StockLive.aspx';
	try {
		const nepseLiveData = [];
		const { data } = await axios({
			method: 'GET',
			url: URL,
		});
		const keys = [
			'symbol',
			'ltp',
			'ltv',
			'percentage_change',
			'high',
			'low',
			'open',
			'volume',
			'num_transaction',
			'point_change',
		];
		const $ = cheerio.load(data);
		const tableBodySelector = '#tbl_LiveStock > tbody > tr';
		$(tableBodySelector).each((index, element) => {
			const companyData = {};
			if (index > 0) {
				$(element)
					.children()
					.each((childIdx, childElm) => {
						const tableValue = $(childElm).text();
						if (tableValue) {
							companyData[keys[childIdx]] = tableValue;
						}
					});
				nepseLiveData.push(companyData);
			}
		});
		return nepseLiveData;
	} catch (error) {
		console.error(error);
	}
};

module.exports = { getNepseShares };
