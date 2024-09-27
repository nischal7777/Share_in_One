import React, { useEffect, useState } from 'react';
import { SidebarLayout } from '../../utils/SidebarLayout';

export const Dashboard = () => {
	const [user, setUser] = useState({});
	const [company, setCompany] = useState('');
	const [units, setUnits] = useState('');
	const [buyingPrice, setBuyingPrice] = useState('');
	const [date, setDate] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [stock, setStocks] = useState([]);
	const [insertCounter, setInsertCounter] = useState(0);

	const onSubmitHandler = async () => {
		await fetch('http://localhost:5000/api/portfolio/', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				company,
				units,
				buyingPrice,
				date,
			}),
			credentials: 'include',
		});
		setInsertCounter(insertCounter + 1);
		setShowModal(false);
		setCompany('');
		setUnits('');
		setBuyingPrice('');
		setDate('');
	};

	useEffect(() => {
		const userInfoHandler = async () => {
			const response = await fetch('http://localhost:5000/api/user', {
				method: 'GET',
				credentials: 'include',
			});
			const responseBody = await response.json();
			setUser(responseBody);
		};
		userInfoHandler();
	}, []);

	//get portfolio
	useEffect(() => {
		const getPortfolioItems = async () => {
			const response = await fetch('http://localhost:5000/api/portfolio/', {
				method: 'GET',
				credentials: 'include',
			});
			const responseData = await response.json();
			setStocks(responseData);
		};
		getPortfolioItems();
	}, [insertCounter]);
	return (
		<SidebarLayout layoutName={'Dashboard'}>
			{console.log(stock)}
			<nav className='flex items-center justify-between px-10 bg-white py-6 border-b'>
				<div className='flex items-center'>
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
				<div className='flex items-center'>
					<p className='font-semibold text-2xl'>My Portfolio</p>
				</div>
				<div className='flex items-center space-x-4'>
					<p className='hidden md:block'>{`${user.firstname} ${user.lastname}`}</p>
				</div>
			</nav>
			{stock.map((item) => {
				return (
					<>
						<div className='p-4 mt-4 grid grid-cols-3 bg-gray-100 px-10 w-[70%] mx-auto'>
							<div className=''>
								<p className='font-semibold'>
									{String(item.company_name).toUpperCase()}
								</p>
							</div>
							<div>
								<p className='font-semibold'>LTP</p>
								<p>{item.buying_price}</p>
							</div>
							<div>
								<p className='font-semibold'>Units</p>
								<p>{item.units}</p>
							</div>
							<div className=''>
								<p className='font-semibold'>Transaction Date</p>
								<p>{item.date}</p>
							</div>
							<div className='mt-6'>
								<p className='font-semibold'>Buying Price</p>
								<p>Rs. {item.buying_price}</p>
							</div>
							<div className='mt-6'>
								<p className='font-semibold'>Total Investment</p>
								<p>Rs. {item.buying_price * item.units}</p>
							</div>
						</div>
					</>
				);
			})}
			{/* Modal Form */}
			{showModal ? (
				<>
					<div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
						<div className='relative w-[40%] my-6 mx-auto'>
							{/*content*/}
							<div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
								{/*header*/}
								<div className='flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t'>
									<h3 className='text-3xl font-semibold'>Add Stock</h3>
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
											<label class='block mb-1 font-bold text-gray-500'>
												Company Symbol
											</label>
											<input
												type='text'
												class='w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500'
												value={company}
												onChange={(e) => {
													setCompany(e.target.value);
												}}
												placeholder='Eg: NMB'
											/>
										</div>
										<div>
											<label className='block mb-1 font-bold text-gray-500'>
												Sector
											</label>
											<select className='border border-gray-200 rounded w-full p-3 bg-white'>
												<option value={'commercial_banks'}>
													{'Commercial Banks'}
												</option>
												<option value={'corporate_debentures'}>
													{'Corporate Debenture'}
												</option>
												<option value={'development_banks'}>
													{'Development Banks'}
												</option>
												<option value={'finance'}>{'Finance'}</option>
												<option value={'hotels_and_tourism'}>
													{'Hotels And Tourism'}
												</option>
												<option value={'hydro_power'}>{'Hydro Power'}</option>
												<option value={'investment'}>{'Investment'}</option>
												<option value={'life_insurance'}>
													{'Life Insurance'}
												</option>
												<option value={'manufacturing_and_processing'}>
													{'Manufacturing And Processing'}
												</option>
												<option value={'microfinance'}>{'Microfinance'}</option>
												<option value={'mutual_fund'}>{'Mutual Fund'}</option>
												<option value={'non_life_insurance'}>
													{'Non-Life Insurance'}
												</option>
												<option value={'others'}>{'Others'}</option>
												<option value={'promoter_share'}>
													{'Promotor Share'}
												</option>
												<option value={'tradings'}>{'Tradings'}</option>
											</select>
										</div>

										<div>
											<label class='block mb-1 font-bold text-gray-500'>
												Units
											</label>
											<input
												type='text'
												placeholder='Eg: 20'
												value={units}
												onChange={(e) => {
													setUnits(Number(e.target.value));
												}}
												class='w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500'
											/>
										</div>

										<div>
											<label class='block mb-1 font-bold text-gray-500'>
												Buying Price
											</label>
											<input
												type='text'
												placeholder='Eg: 500'
												value={buyingPrice}
												onChange={(e) => {
													setBuyingPrice(Number(e.target.value));
												}}
												class='w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500'
											/>
										</div>

										<div>
											<label class='block mb-1 font-bold text-gray-500'>
												Transaction Date
											</label>
											<input
												type='date'
												placeholder='Eg: 500'
												onChange={(e) => {
													setDate(e.target.value);
												}}
												class='w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500'
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
