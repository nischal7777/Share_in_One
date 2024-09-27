import React, { useEffect, useState } from 'react';
import { SidebarLayout } from '../../utils/SidebarLayout';

function Sell() {
	const [quantity, setQuantity] = useState();
	const [sellingRate, setSellingRate] = useState();
	const [purchaseRate, setPurchaseRate] = useState();
	const [companyName, setCompanyName] = useState('');
	const [profitGainTax, setProfitGainTax] = useState(7.5);
	const [result, setResult] = useState();
	const [profitGain, setProfitGain] = useState();
	const [taxedAmount, setTaxedAmount] = useState();
	const [isCalculated, setIsCalculated] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const [nepseData, setNepseData] = useState([]);

	useEffect(() => {
		const getNepseData = async () => {
			const resp = await fetch('http://localhost:5000/nepse-data', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const data = await resp.json();
			setNepseData(data);
		};
		getNepseData();
	}, []);

	useEffect(() => {
		const getNepseData = async () => {
			const resp = await fetch('http://localhost:5000/nepse-data', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const data = await resp.json();
			setNepseData(data);
		};
		getNepseData();
	}, []);

	return (
		<SidebarLayout layoutName={'Sell Calculator'}>
			<div class='min-h-screen flex items-center justify-center'>
				<div class='bg-white p-8 rounded shadow-2xl w-[90%]'>
					{/* <h2 class='text-3xl font-bold mb-10 text-gray-800'>
						Sell Calculator
					</h2> */}

					<form
						class='space-y-5'
						onSubmit={(e) => {
							e.preventDefault();
							const profit = sellingRate - purchaseRate;
							setProfitGain(profit * quantity);
							if (profit <= 0) {
								const totalValue = quantity * sellingRate;
								setResult(totalValue);
								setIsCalculated(true);
							} else {
								if (profitGainTax === 7.5) {
									const totalValue = quantity * sellingRate;
									const tax = (7.5 / 100) * totalValue;
									const res = totalValue - tax;
									setTaxedAmount(tax);
									setResult(res);
									setIsCalculated(true);
								} else {
									const totalValue = quantity * sellingRate;
									const tax = (5 / 100) * totalValue;
									const res = totalValue - tax;
									setTaxedAmount(tax);
									setResult(res);
									setIsCalculated(true);
								}
							}
						}}>
						<div>
							<label class='block mb-1 font-bold text-gray-500'>
								Company Name
							</label>
							<input
								type='text'
								class='w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500'
								placeholder='Company Name'
								value={companyName}
								onChange={(e) => {
									setCompanyName(e.target.value);
								}}
							/>
						</div>

						<div>
							<label class='block mb-1 font-bold text-gray-500'>
								Selling Rate
							</label>
							<input
								type='text'
								class='w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500'
								placeholder='Selling Rate(Rs)'
								value={sellingRate}
								onChange={(e) => {
									setSellingRate(e.target.value);
								}}
								onClick={(e) => {
									nepseData.forEach((value, index) => {
										if (
											value.symbol.toLowerCase() === companyName.toLowerCase()
										) {
											setSellingRate(value.ltp);
										}
									});
								}}
							/>
						</div>

						<div>
							<label class='block mb-1 font-bold text-gray-500'>Rate</label>
							<input
								type='text'
								class='w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500'
								placeholder='Purchased Rate(Rs)'
								value={purchaseRate}
								onChange={(e) => {
									setPurchaseRate(e.target.value);
								}}
							/>
						</div>

						<div>
							<label class='block mb-1 font-bold text-gray-500'>Quantity</label>
							<input
								type='text'
								class='w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500'
								placeholder='10'
								value={quantity}
								onChange={(e) => {
									setQuantity(e.target.value);
								}}
							/>
						</div>

						<div class=''>
							<label class='block mb-1 font-bold text-gray-500'>
								Holding Period
							</label>
							<select
								class='border border-[#d1d5db] rounded w-full p-4 bg-gray-100'
								onChange={(e) => {
									setProfitGainTax(e.target.value);
								}}
								value={profitGainTax}>
								<option value={5.0}>{'Greater than 1 Year'}</option>
								<option value={7.5}>{'Less than 1 Year'}</option>
							</select>
						</div>

						<button
							class='block w-full bg-[#EC5252] p-4 rounded text-white transition duration-300'
							onClick={(e) => {
								setShowModal(!showModal);
							}}>
							Calculate
						</button>
					</form>
				</div>
				{showModal ? (
					<>
						<div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
							<div className='relative w-auto my-6 mx-auto max-w-3xl'>
								{/*content*/}
								<div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
									{/*header*/}
									<div className='flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t'>
										<h3 className='text-3xl font-semibold'>Buy Summary</h3>
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
										{isCalculated && (
											<div className=''>
												<h1>Total amount receivable: {result}</h1>
												<h1>Total Taxed amount: {taxedAmount}</h1>
												<h1>
													Total profit gained/lost:{' '}
													{profitGain < 0 && (
														<span className='text-red-500'>{profitGain}</span>
													)}
													{profitGain > 0 && (
														<span className='text-green-500'>{profitGain}</span>
													)}
												</h1>
											</div>
										)}
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
			</div>
		</SidebarLayout>
	);
}

export default Sell;
