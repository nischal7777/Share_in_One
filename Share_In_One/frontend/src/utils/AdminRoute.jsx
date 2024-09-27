import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => {
	const [status, setStatus] = useState(400);
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState({});

	const authHandler = async () => {
		await fetch('http://localhost:5000/api/user/logout', {
			headers: { 'Content-Type': 'application/json' },
			method: 'POST',
			credentials: 'include',
		});
		const response = await fetch(`http://localhost:5000/api/user`, {
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
		});
		const status = await response.status;
		const body = await response.json();
		setStatus(status);
		setLoading(false);
		setUser(body);
	};

	useEffect(() => {
		authHandler();
		return () => {
			setLoading(true);
			setStatus(400);
			setUser({});
		};
	}, []);

	return (
		<>
			<Route
				{...rest}
				render={(props) => {
					if (status === 200 && loading === false) {
						return <Component {...props} user={user} />;
					} else if (loading === true) {
						return (
							<>
								<h1>Loading</h1>
							</>
						);
					} else {
						return (
							<Redirect
								to={{
									pathname: '/login',
									state: {
										from: props.location,
									},
								}}
							/>
						);
					}
				}}
			/>
		</>
	);
};
