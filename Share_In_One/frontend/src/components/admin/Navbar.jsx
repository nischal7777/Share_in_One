import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ children }) {
	return (
		<>
			<div class='relative min-h-screen md:flex'>
				<div class='sidebar bg-blue-800 text-blue-100 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out'>
					<p class='text-white flex items-center space-x-2 px-4'>
						<Link to={'/admin'}>
							<span class='text-2xl font-extrabold'>Admin Panel</span>
						</Link>
					</p>

					<nav>
						<Link to={'/admin/users'}>
							<p class='block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white'>
								Users
							</p>
						</Link>
						<p class='block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white'>
							Config
						</p>
					</nav>
				</div>

				<div class='flex-1 p-10 text-2xl font-bold'>{children}</div>
			</div>
		</>
	);
}

export default Navbar;
