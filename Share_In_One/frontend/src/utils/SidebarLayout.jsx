import React, { useState } from 'react';
import {
	BiCalculator,
	BiChart,
	BiHome,
	BiMinusCircle,
	BiMoney,
	BiPlusCircle,
	BiStar,
	BiTv,
} from 'react-icons/bi';
import { IoIosArrowForward } from 'react-icons/io';
import { Link, useHistory } from 'react-router-dom';

export function SidebarLayout({ children, layoutName }) {
	const [openCalculator, setOpenCalculator] = useState(false);
	const history = useHistory();
	const logoutHandler = async () => {
		await fetch('http://localhost:5000/api/user/logout', {
			method: 'GET',
			credentials: 'include',
		});
		history.push('/login');
	};
	return (
		<>
			<div className='flex'>
				<div className='md:flex w-2/5 md:w-1/4 h-screen bg-white border-r hidden sticky top-0'>
					<div className='mx-auto py-10'>
						<h1 className='text-2xl font-bold mb-10 cursor-pointer text-[#EC5252] duration-150'>
							Share In One
						</h1>
						<ul className=''>
							<Link to={'/dashboard'}>
								<li className='flex space-x-2 mt-8 cursor-pointer hover:text-[#EC5252] duration-150'>
									<BiHome size={22} />
									<span className='font-semibold'>Home</span>
								</li>
							</Link>
							<li
								className='flex space-x-2 mt-8 cursor-pointer hover:text-[#EC5252] duration-150'
								onClick={(e) => {
									setOpenCalculator(!openCalculator);
								}}>
								<BiCalculator size={22} />
								<span className='font-semibold'>Calculator</span>
							</li>
							<Link to={'/calculator/sell'}>
								<li
									className={`${
										openCalculator ? '' : 'hidden'
									} flex space-x-2 mt-8 ml-4 cursor-pointer hover:text-[#EC5252] duration-150`}>
									<IoIosArrowForward size={22} />
									<span className='font-semibold'>Sell</span>
								</li>
							</Link>
							<Link to={'/calculator/buy'}>
								<li
									className={`${
										openCalculator ? '' : 'hidden'
									} flex space-x-2 mt-8 ml-4 cursor-pointer hover:text-[#EC5252] duration-150`}>
									<IoIosArrowForward size={22} />
									<span className='font-semibold'>Buy</span>
								</li>
							</Link>

							<Link to={'/shares'}>
								<li className='flex space-x-2 mt-8 cursor-pointer hover:text-[#EC5252] duration-150'>
									<BiMoney size={22} />
									<span className='font-semibold'>Prices</span>
								</li>
							</Link>

							<Link to={'/watchlist'}>
								<li className='flex space-x-2 mt-8 cursor-pointer hover:text-[#EC5252] duration-150'>
									<BiTv size={22} />
									<span className='font-semibold'>Watchlist</span>
								</li>
							</Link>

							<Link to={'/chart'}>
								<li className='flex space-x-2 mt-8 cursor-pointer hover:text-[#EC5252] duration-150'>
									<BiChart size={22} color='' />
									<span className='font-semibold'>Chart</span>
								</li>
							</Link>

							<Link to={'/prediction'}>
								<li className='flex space-x-2 mt-8 cursor-pointer hover:text-[#EC5252] duration-150'>
									<BiStar size={22} color='' />
									<span className='font-semibold'>Price Prediction</span>
								</li>
							</Link>

							<Link to={'/stop-loss'}>
								<li className='flex space-x-2 mt-8 cursor-pointer hover:text-[#EC5252] duration-150'>
									<BiMinusCircle size={22} color='' />
									<span className='font-semibold'>Stop Loss</span>
								</li>
							</Link>

							<Link to={'/profit-target'}>
								<li className='flex space-x-2 mt-8 cursor-pointer hover:text-[#EC5252] duration-150'>
									<BiPlusCircle size={22} color='' />
									<span className='font-semibold'>Profit Target</span>
								</li>
							</Link>

							<button
								className='w-full mt-10 bg-[#EC5252] rounded-full py-1.5 text-white'
								onClick={logoutHandler}>
								Logout
							</button>
						</ul>
					</div>
				</div>
				<main className='min-h-screen w-full bg-white'>
					{layoutName.startsWith('Watchlist') ||
					layoutName.startsWith('Stop Loss') ||
					layoutName.startsWith('Profit Target') ||
					layoutName.startsWith('Dashboard') ? null : (
						<nav className='flex items-center justify-between px-10 bg-white py-6 border-b'>
							<div className='flex items-center'>
								<p className='font-semibold text-2xl'>{layoutName}</p>
							</div>
						</nav>
					)}
					{children}
				</main>
			</div>
		</>
	);
}
