import React from 'react';
import Navbar from './Navbar';

function Users() {
	const [users, setUsers] = React.useState([]);
	React.useEffect(() => {
		(async () => {
			const resp = await fetch('http://localhost:5000/api/user/all', {
				method: 'GET',
				headers: {
					'content-type': 'application/json',
				},
			});
			const allUsers = await resp.json();
			setUsers(allUsers);
		})();
	}, []);
	return (
		<div>
			<Navbar>
				{console.log(users)}
				{/* <section class='antialiased bg-gray-100 text-gray-600 h-screen px-4'> */}
				<div class='flex flex-row justify-center h-full'>
					<div class='w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200'>
						<header class='px-5 py-4 border-b border-gray-100'>
							<h2 class='font-semibold text-gray-800'>Users</h2>
						</header>
						<div class='p-3'>
							<div class='overflow-x-auto'>
								<table class='table-auto w-full'>
									<thead class='text-xs font-semibold uppercase text-gray-400 bg-gray-50'>
										<tr>
											<th class='p-2 whitespace-nowrap'>
												<div class='font-semibold text-left'>Firstname</div>
											</th>
											<th class='p-2 whitespace-nowrap'>
												<div class='font-semibold text-left'>Lastname</div>
											</th>
											<th class='p-2 whitespace-nowrap'>
												<div class='font-semibold text-left'>Email</div>
											</th>
											<th class='p-2 whitespace-nowrap'>
												<div class='font-semibold text-center'>
													Admin Status
												</div>
											</th>
										</tr>
									</thead>
									<tbody class='text-sm divide-y divide-gray-100'>
										{users.map((user) => (
											<tr>
												<td class='p-2 whitespace-nowrap'>
													<div class='flex items-center'>
														<div class='font-medium text-gray-800'>
															{user.firstname}
														</div>
													</div>
												</td>
												<td class='p-2 whitespace-nowrap'>
													<div class='text-left'>{user.lastname}</div>
												</td>
												<td class='p-2 whitespace-nowrap'>
													<div class='text-left font-medium text-green-500'>
														{user.email}
													</div>
												</td>
												<td class='p-2 whitespace-nowrap'>
													<div class='text-left font-medium text-black'>
														{user.isAdmin}
													</div>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				{/* </section> */}
			</Navbar>
		</div>
	);
}

export default Users;
