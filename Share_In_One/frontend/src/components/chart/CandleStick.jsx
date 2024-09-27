import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

export const CandleStick = ({ companyName }) => {
	const [companyData, setCompanyData] = useState([]);
	useEffect(() => {
		(async () => {
			const resp = await fetch(
				`http://localhost:5000/api/stock/company/${companyName}`,
				{
					method: 'GET',
					credentials: 'include',
				}
			);
			const respData = await resp.json();
			setCompanyData(respData);
		})();
	}, [companyName]);
	const options = {
		chart: {
			type: 'candlestick',
			height: 350,
		},
		title: {
			text: 'CandleStick Chart',
			align: 'left',
		},
		xaxis: {
			type: 'datetime',
		},
		yaxis: {
			tooltip: {
				enabled: true,
			},
		},
	};

	const series = [
		{
			data: companyData,
		},
	];
	return (
		<Chart options={options} series={series} type='candlestick' height={700} />
	);
};
