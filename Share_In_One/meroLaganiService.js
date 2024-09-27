const axios = require('axios');
const cheerio = require('cheerio');

const getMeroLaganiData = async () => {
	const URL = 'https://merolagani.com/LatestMarket.aspx';
	try {
		const nepseLiveData = [];
		const { data } = await axios({
			method: 'GET',
			url: URL,
		});
		const keys = [
			'symbol',
			'ltp',
			'percentage_change',
			'high',
			'low',
			'open',
			'quantity',
		];
		const $ = cheerio.load(data);
		const tableBodySelector =
			'#ctl00_ContentPlaceHolder1_LiveTrading > table > tbody > tr';
		$(tableBodySelector).each((index, element) => {
			const companyData = {};
			$(element)
				.children()
				.each((childIdx, childElm) => {
					const tableValue = $(childElm).text();
					if (tableValue) {
						companyData[keys[childIdx]] = tableValue;
					}
				});
			nepseLiveData.push(companyData);
		});
		return nepseLiveData;
	} catch (error) {
		console.error(error);
	}
};

module.exports = { getMeroLaganiData };
