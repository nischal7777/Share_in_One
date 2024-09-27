import React from 'react';
import { Link } from 'react-router-dom';
import menu from '../../images/menu.svg';

function Navbar() {
	return (
		<nav className='fixed w-full z-30 top-0 text-black'>
			<div
				className='
					w-full
					container
					mx-auto
					flex flex-wrap
					items-center
					justify-between
					mt-0
					py-2
				'>
				<div className='pl-4 flex items-center'>
					<p
						className='
							toggleColour
							text-white
							no-underline
							hover:no-underline
							font-bold
							text-2xl
							lg:text-4xl
						'
						href='#'>
						Share In One
					</p>
				</div>
				<div className='block lg:hidden pr-4'>
					<button
						className='
							flex
							items-center
							p-1
							text-black
							hover:text-gray-900
							focus:outline-none focus:shadow-outline
							transform
							transition
							hover:scale-105
							duration-300
							ease-in-out
						'>
						<img src={menu} alt='ham' />
					</button>
				</div>
				<div
					className='
						w-full
						flex-grow
						lg:flex lg:items-center lg:w-auto
						hidden
						mt-2
						lg:mt-0
						bg-white
						lg:bg-transparent
						text-black
						p-4
						lg:p-0
						z-20
					'
					id='nav-content'>
					<ul className='list-reset lg:flex justify-end flex-1 items-center'>
						<li className='mr-3'>
							<p className='inline-block py-2 px-4 text-black font-bold no-underline'>
								Home
							</p>
						</li>
						<li className='mr-3'>
							<Link to={'/login'}>
								<p
									className='
									inline-block
									text-black
									no-underline
									hover:text-gray-800 hover:text-underline
									py-2
									px-4
								'>
									Login
								</p>
							</Link>
						</li>
						<li className='mr-3'>
							<Link to={'/register'}>
								<p
									className='
									inline-block
									text-black
									no-underline
									hover:text-gray-800 hover:text-underline
									py-2
									px-4
								'>
									Register
								</p>
							</Link>
						</li>
					</ul>
					<button
						className='
							mx-auto
							lg:mx-0
							hover:underline
							bg-white
							text-gray-800
							font-bold
							rounded-full
							mt-4
							lg:mt-0
							py-4
							px-8
							shadow
							opacity-75
							focus:outline-none focus:shadow-outline
							transform
							transition
							hover:scale-105
							duration-300
							ease-in-out
						'>
						Dashboard
					</button>
				</div>
			</div>
			<hr className='border-b border-gray-100 opacity-25 my-0 py-0' />
		</nav>
	);
}

export default Navbar;
