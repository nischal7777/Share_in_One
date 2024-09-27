import React, { useEffect, useState } from 'react';
import { SidebarLayout } from '../../utils/SidebarLayout';
import { CandleStick } from './CandleStick';

export const Chart = () => {
	const [companies, setCompanies] = useState([]);
	const [company, setCompany] = useState('NABIL');
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
	return (
		<SidebarLayout layoutName={'Chart'}>
			<div className=''>
				{console.log(companies)}
				<div className='container md:mt-0 md:col-span-2 w-[20%]'>
					<div className='sm:rounded-md sm:overflow-hidden'>
						<div className='px-4 py-4 space-y-7 sm:p-6'>
							<div className='post-type'>
								{/* <label className='block text-sm font-medium text-gray-700'>
									Select Company
								</label> */}
								<select
									className='border border-[#d1d5db] rounded-md w-full py-4 p-4 bg-white'
									onChange={(e) => {
										setCompany(e.target.value);
									}}
									value={company}>
									{companies.map((item, index) => {
										return (
											<option key={index} value={item}>
												{item.toUpperCase()}
											</option>
										);
									})}
								</select>
							</div>
						</div>
					</div>
				</div>
			</div>
			<CandleStick companyName={company} />
		</SidebarLayout>
	);
};
