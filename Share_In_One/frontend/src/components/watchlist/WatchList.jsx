import React, { useEffect, useState } from 'react';
import { SidebarLayout } from '../../utils/SidebarLayout';

export const WatchList = () => {
	const [showModal, setShowModal] = useState(false);
	const [companies, setCompanies] = useState([]);
	const [watchlist, setWatchlist] = useState([]);
	const [stock, setStock] = useState('NABIL');
	const [counter, setCounter] = useState(0);
	useEffect(() => {
		(async () => {
			const response = await fetch('http://localhost:5000/nepse-companies', {
				method: 'GET',
				credentials: 'include',
			});
			const data = await response.json();
			setCompanies(data);
		})();
	}, [counter]);
	useEffect(() => {
		(async () => {
			const response = await fetch('http://localhost:5000/api/watchlist', {
				method: 'GET',
				credentials: 'include',
			});
			const data = await response.json();
			setWatchlist(data);
		})();
	}, [counter]);
	const watchlistSubmit = async (e) => {
		e.preventDefault();
		setCounter(counter + 1);
		await fetch('http://localhost:5000/api/watchlist/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({ stock: stock }),
		});
		setShowModal(false);
	};
	return (
		<SidebarLayout layoutName={'Watchlist'}>
			<nav className='flex items-center justify-between px-10 bg-white py-6 border-b'>
				<div className='flex items-center'>
					<p className='font-semibold text-2xl'>Watchlist</p>
				</div>
				<div
					className='flex items-center space-x-4'
					onClick={() => {
						setShowModal(true);
					}}>
					<div className='flex items-center gap-2 w-full bg-[#EC5252] py-1 px-5 rounded-xl text-white'>
						{/* <GrAdd size={20} style={{ color: 'white' }} /> */}
						<p style={{ color: 'white', fontSize: '30px' }}>+</p>
						Add Stock
					</div>
				</div>
			</nav>
			<table class='min-w-full leading-normal'>
				<thead>
					<tr>
						<th class='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
							Company
						</th>
						<th class='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
							Percentage Change
						</th>
						<th class='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
							High
						</th>
						<th class='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
							Low
						</th>
						<th class='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
							Open
						</th>
						<th class='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
							Close
						</th>
						<th class='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'></th>
					</tr>
				</thead>
				<tbody>
					{watchlist.map((item) => {
						return (
							<tr>
								<td class='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
									<div class='flex items-center'>
										<div class='flex-shrink-0 w-10 h-10'></div>
										<div class='ml-3'>
											<p class='text-gray-900 whitespace-no-wrap'>
												{item.symbol}
											</p>
										</div>
									</div>
								</td>
								<td class='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
									<p class='text-gray-900 whitespace-no-wrap'>
										{item.percentage_change}
									</p>
								</td>
								<td class='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
									<p class='text-gray-900 whitespace-no-wrap'>{item.high}</p>
								</td>
								<td class='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
									<p class='text-gray-900 whitespace-no-wrap'>{item.low}</p>
								</td>
								<td class='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
									<p class='text-gray-900 whitespace-no-wrap'>{item.open}</p>
								</td>
								<td class='px-4 py-5 border-b border-gray-200 bg-white text-sm'>
									<p class='text-gray-900 whitespace-no-wrap'>{item.ltp}</p>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			{showModal ? (
				<>
					<div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
						<div className='relative w-[30%] my-6 mx-auto'>
							{/*content*/}
							<div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
								{/*header*/}
								<div className='flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t'>
									<h3 className='text-3xl font-semibold'>Add to Watchlist</h3>
									<button
										className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
										onClick={() => setShowModal(false)}>
										<span className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>
											×
										</span>
									</button>
								</div>
								{/*body*/}
								<div className='p-8'>
									<form class='space-y-5' onSubmit={watchlistSubmit}>
										<div class=''>
											<label class='block mb-1 font-bold text-gray-500'>
												Holding Period
											</label>
											<select
												class='border border-[#d1d5db] rounded w-full p-4 bg-gray-100'
												value={stock}
												onChange={(e) => {
													setStock(e.target.value);
												}}>
												{companies.map((item, index) => (
													<option value={item} key={index}>
														{item}
													</option>
												))}
											</select>
										</div>

										<input
											className='block w-full bg-[#EC5252] p-4 rounded text-white transition duration-300'
											type='submit'
											value={'Send'}
											onClick={watchlistSubmit}
										/>
									</form>
								</div>
								{/*footer*/}
								<div className='flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b'>
									<button
										className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
										type='button'
										onClick={() => setShowModal(false)}>
										Close
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
