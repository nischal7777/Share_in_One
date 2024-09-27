import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

function Register({ history }) {
	const [email, setEmail] = useState('');
	const [FirstName, setFirstName] = useState('');
	const [LastName, setLastName] = useState('');
	const [password, setPassword] = useState('');
	const [ConfirmPassword, setConfirmPassword] = useState('');
	const registerHandler = async (e) => {
		e.preventDefault();
		const resp = await fetch('http://localhost:5000/api/user/register', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				email: email,
				firstname: FirstName,
				lastname: LastName,
				password: password,
			}),
		});
		if (resp.status === 200) {
			history.push('/login');
		} else {
			alert('Register Failed');
		}
	};

	return (
		<body class='bg-white font-family-karla h-screen'>
			<div class='w-full flex flex-wrap'>
				<div class='w-full md:w-1/2 flex flex-col'>
					<div class='flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32'>
						<p class='text-center text-3xl'>Register</p>
						<form class='flex flex-col pt-3 md:pt-8' onSubmit={registerHandler}>
							<div class='flex flex-col pt-4'>
								<label for='email' class='text-lg'>
									Email
								</label>
								<input
									type='email'
									placeholder='your@email.com'
									class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline'
									value={email}
									onChange={(e) => {
										setEmail(e.target.value);
									}}
								/>
							</div>
							<div class='flex flex-col pt-4'>
								<label for='name' class='text-lg'>
									First Name
								</label>
								<input
									type='text'
									placeholder='John Smith'
									class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline'
									value={FirstName}
									onChange={(e) => {
										setFirstName(e.target.value);
									}}
								/>
							</div>
							<div class='flex flex-col pt-4'>
								<label for='name' class='text-lg'>
									Last Name
								</label>
								<input
									type='text'
									placeholder='John Smith'
									class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline'
									value={LastName}
									onChange={(e) => {
										setLastName(e.target.value);
									}}
								/>
							</div>

							<div class='flex flex-col pt-4'>
								<label for='password' class='text-lg'>
									Password
								</label>
								<input
									type='password'
									placeholder='Password'
									class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline'
									value={password}
									onChange={(e) => {
										setPassword(e.target.value);
									}}
								/>
							</div>

							<div class='flex flex-col pt-4'>
								<label for='confirm-password' class='text-lg'>
									Confirm Password
								</label>
								<input
									type='password'
									placeholder='Password'
									class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline'
									value={ConfirmPassword}
									onChange={(e) => {
										setConfirmPassword(e.target.value);
									}}
								/>
							</div>

							<input
								type='submit'
								value='Register'
								class='bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8'
							/>
						</form>
						<div class='text-center pt-12 pb-12'>
							<Link to='/login'>
								<p>
									Already have an account?{' '}
									<a href='login.html' class='underline font-semibold'>
										Log in here.
									</a>
								</p>
							</Link>
						</div>
					</div>
				</div>

				<div class='w-1/2 shadow-2xl'>
					<img
						class='object-cover w-full h-screen hidden md:block'
						src='https://source.unsplash.com/IXUM4cJynP0'
						alt='Background'
					/>
				</div>
			</div>
		</body>
	);
}

export default withRouter(Register);
