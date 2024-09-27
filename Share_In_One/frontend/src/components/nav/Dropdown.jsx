import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export const Dropdown = () => {
	return (
		<Menu as='div' className='relative inline-block text-left'>
			<div>
				<Menu.Button
					className='inline-flex justify-center w-full px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75
        bg-gray-500 text-white'>
					Options
					{/* icon */}
				</Menu.Button>
			</div>
			<Transition
				as={Fragment}
				enter='transition ease-out duration-100'
				enterFrom='transform opacity-0 scale-95'
				enterTo='transform opacity-100 scale-100'
				leave='transition ease-in duration-75'
				leaveFrom='transform opacity-100 scale-100'
				leaveTo='transform opacity-0 scale-95'>
				<Menu.Items className='absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
					<div className='px-1 py-1 '>
						<Menu.Item>
							<button
								className={`
											'bg-violet-500 text-gray-900
										group flex rounded-md items-center w-full px-2 py-2 text-sm`}>
								Profile
							</button>
						</Menu.Item>
						<Menu.Item>
							<button
								className={`
											'bg-violet-500 text-gray-900
										group flex rounded-md items-center w-full px-2 py-2 text-sm`}>
								Settings
							</button>
						</Menu.Item>
					</div>
					<div className='px-1 py-1'>
						<Menu.Item>
							<button
								className={`
											'bg-violet-500 text-red-500
										group flex rounded-md items-center w-full px-2 py-2 text-sm`}>
								Logout
							</button>
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
};
