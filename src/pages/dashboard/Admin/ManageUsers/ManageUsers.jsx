import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner";
import { FaUserShield, FaUserTimes } from "react-icons/fa";

const ManageUsers = () => {
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(0);
	const limit = 10;

	const axiosSecure = useAxiosSecure();
	const queryClient = useQueryClient();
	const { user: currentUser } = useAuth();

	useEffect(() => {
		document.title = "Manage Users | Talkora Admin";
	}, []);

	const { data, isLoading } = useQuery({
		queryKey: ["users", search, page],
		queryFn: async () => {
			const res = await axiosSecure.get(`/users?search=${search}&page=${page}&limit=${limit}`);
			return res.data;
		},
		keepPreviousData: true,
	});

	const { mutate: toggleAdmin } = useMutation({
		mutationFn: async (targetUser) => {
			const newRole = targetUser.role === "admin" ? "user" : "admin";
			const res = await axiosSecure.patch(`/users/role/${targetUser._id}`, { role: newRole });
			return res.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["users"]);
		},
	});

	const totalPages = data ? Math.ceil(data.total / limit) : 0;

	return (
		<div className="space-y-6 bg-white p-4 lg:p-6 rounded-md">
			<div className="flex  gap-2 flex-col lg:flex-row lg:justify-between mb-4">
				<h2 className="text-2xl font-bold mb-4">Manage Users</h2>
				<input
					type="text"
					placeholder="Search by name or email..."
					className="input input-bordered w-full max-w-sm"
					value={search}
					onChange={(e) => {
						setSearch(e.target.value);
						setPage(0);
					}}
				/>
			</div>

			{isLoading ? (
				<LoadingSpinner />
			) : (
				<div className="overflow-x-auto">
					<table className="table table-zebra w-full">
						<thead className="bg-base-200 text-base">
							<tr>
								<th>#</th>
								<th>Name</th>
								<th>Email</th>
								<th>Role</th>
								<th>Subscription</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{data?.users?.map((user, index) => (
								<tr key={user._id}>
									<td>{page * limit + index + 1}</td>
									<td>{user.name}</td>
									<td>{user.email}</td>
									<td className="capitalize">
										{user.role === "admin" ? (
											<span className="badge badge-success">Admin</span>
										) : (
											<span className="badge badge-outline">User</span>
										)}
									</td>
									<td className="capitalize">
										{user.badge === "gold" ? (
											<span className="badge badge-warning">Gold</span>
										) : (
											<span className="badge">Bronze</span>
										)}
									</td>
									<td>
										{user.email !== currentUser?.email && (
											<button
												onClick={() => toggleAdmin(user)}
												className={`btn btn-sm text-white ${user.role === "admin" ? "btn-error" : "btn-primary"}`}
											>
												{user.role === "admin" ? (
													<>
														<FaUserTimes className="mr-1" />
														<span className="hidden md:flex">Revoke Admin</span>
													</>
												) : (
													<>
														<FaUserShield className="mr-1" />
														<span className="hidden md:flex">Make Admin</span>
													</>
												)}
											</button>
										)}
									</td>
								</tr>
							))}
							{data?.users?.length === 0 && (
								<tr>
									<td colSpan="6" className="text-center text-gray-500">
										No users found.
									</td>
								</tr>
							)}
						</tbody>
					</table>

					<div className="mt-4 flex justify-center items-center gap-1 flex-wrap">
						<button
							className="btn btn-sm"
							disabled={page === 0}
							onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
						>
							Previous
						</button>

						{[...Array(totalPages).keys()].map((pageNum) => {
							if (pageNum === 0 || pageNum === totalPages - 1 || Math.abs(pageNum - page) <= 1) {
								return (
									<button
										key={pageNum}
										onClick={() => setPage(pageNum)}
										className={`btn btn-sm ${pageNum === page ? "btn-active btn-primary text-white" : "btn-ghost"}`}
									>
										{pageNum + 1}
									</button>
								);
							} else if ((pageNum === 1 && page > 2) || (pageNum === totalPages - 2 && page < totalPages - 3)) {
								return (
									<span key={pageNum} className="px-2 text-gray-500 select-none">
										...
									</span>
								);
							}
							return null;
						})}

						<button
							className="btn btn-sm"
							disabled={page + 1 >= totalPages}
							onClick={() => setPage((prev) => prev + 1)}
						>
							Next
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default ManageUsers;
