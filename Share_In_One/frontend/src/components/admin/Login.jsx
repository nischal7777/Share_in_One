import React from 'react';
import { withRouter } from 'react-router-dom';
import Logo from '../../images/logo.jpg';

const Login = ({ history }) => {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const loginHandler = async (e) => {
		e.preventDefault();
		const resp = await fetch('http://localhost:5000/api/admin/login', {
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
			history.push('/admin');
		} else {
			alert('Login Failed');
		}
	};
	return (
		<>
			<div class='flex items-center justify-center min-h-screen bg-gray-100'>
				<div class='px-8 py-6 mt-4 text-left bg-white shadow-lg'>
					<div class='flex justify-center'>
						<img src={Logo} alt='logo' width={60} height={60} />
					</div>
					<h3 class='text-2xl font-bold text-center'>Login as admin</h3>
					<form onSubmit={loginHandler}>
						<div class='mt-4'>
							<div>
								<label class='block' for='email'>
									Email
								</label>
								<input
									type='text'
									placeholder='Email'
									value={email}
									onChange={(e) => {
										setEmail(e.target.value);
									}}
									class='w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'></input>
								<span class='invisible text-xs tracking-wide text-red-600'>
									Email field is required{' '}
								</span>
							</div>
							<div class='mt-4'>
								<label class='block'>Password</label>
								<input
									type='password'
									placeholder='Password'
									value={password}
									onChange={(e) => {
										setPassword(e.target.value);
									}}
									class='w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'
								/>
							</div>
							<div class='flex items-baseline justify-between'>
								<button class='px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900'>
									Login
								</button>
								<p href='#' class='text-sm text-blue-600 hover:underline'>
									Forgot password?
								</p>
							</div>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default withRouter(Login);
