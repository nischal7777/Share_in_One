import React from 'react';

function Footer() {
	return (
		<footer className='bg-white'>
			<div className='container mx-auto px-8'>
				<div className='w-full flex flex-col md:flex-row py-6'>
					<div className='flex-1 mb-6 text-black'>
						<p
							className='
								text-pink-600
								no-underline
								hover:no-underline
								font-bold
								text-2xl
								lg:text-4xl
							'>
							Share In One
						</p>
					</div>
					<div className='flex-1'>
						<p className='uppercase text-gray-500 md:mb-6'>Links</p>
						<ul className='list-reset mb-6'>
							<li className='mt-2 inline-block mr-2 md:block md:mr-0'>
								<p
									className='
										no-underline
										hover:underline
										text-gray-800
										hover:text-pink-500
									'>
									FAQ
								</p>
							</li>
							<li className='mt-2 inline-block mr-2 md:block md:mr-0'>
								<p
									className='
										no-underline
										hover:underline
										text-gray-800
										hover:text-pink-500
									'>
									Help
								</p>
							</li>
							<li className='mt-2 inline-block mr-2 md:block md:mr-0'>
								<p
									className='
										no-underline
										hover:underline
										text-gray-800
										hover:text-pink-500
									'>
									Support
								</p>
							</li>
						</ul>
					</div>
					<div className='flex-1'>
						<p className='uppercase text-gray-500 md:mb-6'>Legal</p>
						<ul className='list-reset mb-6'>
							<li className='mt-2 inline-block mr-2 md:block md:mr-0'>
								<p
									className='
										no-underline
										hover:underline
										text-gray-800
										hover:text-pink-500
									'>
									Terms
								</p>
							</li>
							<li className='mt-2 inline-block mr-2 md:block md:mr-0'>
								<p
									className='
										no-underline
										hover:underline
										text-gray-800
										hover:text-pink-500
									'>
									Privacy
								</p>
							</li>
						</ul>
					</div>
					<div className='flex-1'>
						<p className='uppercase text-gray-500 md:mb-6'>Social</p>
						<ul className='list-reset mb-6'>
							<li className='mt-2 inline-block mr-2 md:block md:mr-0'>
								<p
									className='
										no-underline
										hover:underline
										text-gray-800
										hover:text-pink-500
									'>
									Facebook
								</p>
							</li>
							<li className='mt-2 inline-block mr-2 md:block md:mr-0'>
								<p
									className='
										no-underline
										hover:underline
										text-gray-800
										hover:text-pink-500
									'>
									Linkedin
								</p>
							</li>
							<li className='mt-2 inline-block mr-2 md:block md:mr-0'>
								<p
									className='
										no-underline
										hover:underline
										text-gray-800
										hover:text-pink-500
									'>
									Twitter
								</p>
							</li>
						</ul>
					</div>
					<div className='flex-1'>
						<p className='uppercase text-gray-500 md:mb-6'>Company</p>
						<ul className='list-reset mb-6'>
							<li className='mt-2 inline-block mr-2 md:block md:mr-0'>
								<p
									className='
										no-underline
										hover:underline
										text-gray-800
										hover:text-pink-500
									'>
									Official Blog
								</p>
							</li>
							<li className='mt-2 inline-block mr-2 md:block md:mr-0'>
								<p
									className='
										no-underline
										hover:underline
										text-gray-800
										hover:text-pink-500
									'>
									About Us
								</p>
							</li>
							<li className='mt-2 inline-block mr-2 md:block md:mr-0'>
								<p
									className='
										no-underline
										hover:underline
										text-gray-800
										hover:text-pink-500
									'>
									Contact
								</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
