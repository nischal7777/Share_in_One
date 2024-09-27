import React from 'react';

export default function StockCard() {
	return (
		<div>
			<div class='max-w-md w-full lg:flex'>
				<div class='border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal'>
					<div class='mb-8'>
						<div class='text-black font-bold text-xl mb-2'>
							Can coffee make you a better developer?
						</div>
						<p class='text-grey-darker text-base'>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit.
							Voluptatibus quia, nulla! Maiores et perferendis eaque,
							exercitationem praesentium nihil.
						</p>
					</div>
					<div class='flex items-center'>
						<img
							class='w-10 h-10 rounded-full mr-4'
							src='https://pbs.twimg.com/profile_images/885868801232961537/b1F6H4KC_400x400.jpg'
							alt='Avatar of Jonathan Reinink'
						/>
						<div class='text-sm'>
							<p class='text-black leading-none'>Jonathan Reinink</p>
							<p class='text-grey-dark'>Aug 18</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
