import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';

export const PublicRoute = ({ component: Component, ...rest }) => {
	const [status, setStatus] = useState(400);
	const [loading, setLoading] = useState(true);

	const authHandler = async () => {
		const response = await fetch(`http://localhost:5000/api/user`, {
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
		});
		const status = await response.status;
		setStatus(status);
		setLoading(false);
	};

	useEffect(() => {
		authHandler();
		return () => {
			setLoading(true);
			setStatus(400);
		};
	}, []);

	return (
		<>
			<Route
				{...rest}
				render={(props) => {
					if (status === 200 && loading === false) {
						return (
							<Redirect
								to={{
									pathname: '/dashboard',
									state: {
										from: props.location,
									},
								}}
							/>
						);
					} else if (loading === true) {
						return (
							<>
								<h1>Loading</h1>
							</>
						);
					} else {
						return <Component {...props} />;
					}
				}}
			/>
		</>
	);
};
