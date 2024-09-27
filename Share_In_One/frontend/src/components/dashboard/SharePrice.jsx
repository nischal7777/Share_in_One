import React, { useEffect, useState } from 'react';
import { SidebarLayout } from '../../utils/SidebarLayout';

export const SharePrice = () => {
	const [shaprePrice, setSharePrice] = useState([]);
	useEffect(() => {
		const getShareData = async () => {
			const resp = await fetch('http://localhost:5000/nepse-data', {
				method: 'GET',
				credentials: 'include',
			});
			const data = await resp.json();
			setSharePrice(data);
		};
		getShareData();
	}, []);
	return (
		<SidebarLayout layoutName={"Toaday's Share Price"}>
			<div class='overflow-x-auto'>
				<table class='table-auto w-full'>
					<thead class='text-xs font-semibold uppercase text-gray-400 bg-gray-50'>
						<tr>
							<th class='p-2 whitespace-nowrap'>
								<div class='font-semibold text-left'>Company</div>
							</th>
							<th class='p-2 whitespace-nowrap'>
								<div class='font-semibold text-left'>Percentage Change</div>
							</th>
							<th class='p-2 whitespace-nowrap'>
								<div class='font-semibold text-center'>High</div>
							</th>
							<th class='p-2 whitespace-nowrap'>
								<div class='font-semibold text-center'>Low</div>
							</th>
							<th class='p-2 whitespace-nowrap'>
								<div class='font-semibold text-center'>Open</div>
							</th>
							<th class='p-2 whitespace-nowrap'>
								<div class='font-semibold text-left'>LTP (Close)</div>
							</th>
						</tr>
					</thead>
					<tbody class='text-sm divide-y divide-gray-100'>
						{shaprePrice.map((item) => (
							<tr>
								<td class='p-2 whitespace-nowrap'>
									<div class='flex items-center'>
										<div class='font-medium text-gray-800'>
											{item.company_name}
										</div>
									</div>
								</td>
								<td class='p-2 whitespace-nowrap'>
									<div class='text-left'>{item.percentage_change}</div>
								</td>
								<td class='p-2 whitespace-nowrap'>
									<div class='text-left font-medium text-green-500'>
										{item.high}
									</div>
								</td>
								<td class='p-2 whitespace-nowrap'>
									<div class='text-left font-medium text-green-500'>
										{item.low}
									</div>
								</td>
								<td class='p-2 whitespace-nowrap'>
									<div class='text-left font-medium text-green-500'>
										{item.open}
									</div>
								</td>
								<td class='p-2 whitespace-nowrap'>
									<div class='text-left font-medium text-black'>{item.ltp}</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</SidebarLayout>
	);
};
