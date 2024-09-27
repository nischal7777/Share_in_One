import React from 'react';

export default function AddStock() {
	return (
		<div>
			<form
				class='space-y-5'
				onSubmit={(e) => {
					e.preventDefault();
				}}>
				<div>
					<label class='block mb-1 font-bold text-gray-500'>
						Company Symbol
					</label>
					<input
						type='text'
						class='w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500'
						placeholder='Eg: NMB'
					/>
				</div>

				<div>
					<label class='block mb-1 font-bold text-gray-500'>Units</label>
					<input
						type='text'
						placeholder='Eg: 20'
						class='w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500'
					/>
				</div>

				<div>
					<label class='block mb-1 font-bold text-gray-500'>Buying Price</label>
					<input
						type='text'
						placeholder='Eg: 500'
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
						class='w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500'
					/>
				</div>

				<button
					className='block bg-[#EC5252] p-4 rounded text-white transition duration-300'
					type='submit'>
					Calculate
				</button>
			</form>
		</div>
	);
}
