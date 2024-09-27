import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.jpg';

function Login({ history }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const loginHandler = async (e) => {
		e.preventDefault();
		const resp = await fetch('http://localhost:5000/api/user/login', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		});
		console.log(resp.json());
		if (resp.status === 200) {
			history.push('/dashboard');
		} else {
			console.log('login failed');
			alert('Login Failed');
		}
	};

	return (
		<div className='bg-white font-family-karla h-screen'>
			<div className='w-full flex flex-wrap'>
				<div className='w-full md:w-1/2 flex flex-col'>
					<div className='flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24'>
						<Link to='/'>
							<img src={logo} alt='' width={70} height={60} />
						</Link>
					</div>

					<div className='flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32'>
						<p className='text-center text-3xl'>Welcome.</p>
						<form
							className='flex flex-col pt-3 md:pt-8'
							onSubmit={loginHandler}>
							<div className='flex flex-col pt-4'>
								<label className='text-lg'>Email</label>
								<input
									type='email'
									placeholder='your@email.com'
									className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline'
									value={email}
									onChange={(e) => {
										setEmail(e.target.value);
									}}
								/>
							</div>

							<div className='flex flex-col pt-4'>
								<label className='text-lg'>Password</label>
								<input
									type='password'
									id='password'
									placeholder='Password'
									className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline'
									value={password}
									onChange={(e) => {
										setPassword(e.target.value);
									}}
								/>
							</div>

							<input
								type='submit'
								value='Log In'
								className='bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8'
							/>
						</form>
						<div className='text-center pt-12 pb-12'>
							<Link to='/register'>
								<p>
									Don't have an account?
									<span className='underline font-semibold'>
										Register here.
									</span>
								</p>
							</Link>
						</div>
					</div>
				</div>

				<div className='w-1/2 shadow-2xl'>
					<img
						className='object-cover w-full h-screen hidden md:block'
						src='https://source.unsplash.com/IXUM4cJynP0'
						alt=''
					/>
				</div>
			</div>
		</div>
	);
}

export default withRouter(Login);
