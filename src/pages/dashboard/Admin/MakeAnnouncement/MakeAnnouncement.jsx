import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";

const MakeAnnouncement = () => {
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();
	const queryClient = useQueryClient();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const [page, setPage] = useState(0);
	const limit = 10;

	useEffect(() => {
		document.title = "Make Announcement | Talkora Admin";
	}, []);

	const { data, isLoading } = useQuery({
		queryKey: ["announcements", page],
		queryFn: async () => {
			const res = await axiosSecure.get(`/announcements?page=${page}&limit=${limit}`);
			return res.data;
		},
		keepPreviousData: true,
	});

	const { mutate: deleteAnnouncement } = useMutation({
		mutationFn: async (id) => {
			const res = await axiosSecure.delete(`/announcements/${id}`);
			return res.data;
		},
		onSuccess: () => {
			toast.success("Deleted successfully");
			queryClient.invalidateQueries(["announcements"]);
		},
	});

	const onSubmit = async (data) => {
		const announcement = {
			authorName: user?.displayName,
			authorImage: user?.photoURL,
			authorEmail: user?.email,
			title: data.title,
			description: data.description,
			created_at: new Date().toDateString(),
		};

		try {
			const res = await axiosSecure.post("/announcements", announcement);
			if (res.data.insertedId) {
				toast.success("Announcement added");
				reset();
				queryClient.invalidateQueries(["announcements"]);
			}
		} catch {
			toast.error("Failed to add announcement");
		}
	};

	const totalPages = data ? Math.ceil(data.total / limit) : 0;

	return (
		<div className="flex flex-col lg:flex-row gap-6">
			<div className="bg-white shadow rounded p-6 lg:w-3/10">
				<h2 className="text-lg font-bold mb-4">Create Announcement</h2>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<div>
						<input
							type="text"
							placeholder="Title"
							{...register("title", { required: "Title is required" })}
							className="input input-bordered w-full"
						/>
						{errors.title && <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>}
					</div>

					<div>
						<textarea
							placeholder="Description"
							{...register("description", { required: "Description is required" })}
							className="textarea textarea-bordered w-full"
						/>
						{errors.description && <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>}
					</div>

					<button type="submit" className="btn bg-orange-500 text-white w-full hover:bg-orange-600">
						Post Announcement
					</button>
				</form>
			</div>

			<div className="bg-white shadow rounded p-6 lg:w-7/10">
				<h2 className="text-lg font-bold mb-4">All Announcements</h2>

				{isLoading ? (
					<LoadingSpinner />
				) : (
					<>
						<div className="overflow-x-auto">
							<table className="table table-zebra w-full">
								<thead className="bg-base-200">
									<tr>
										<th className="hidden md:flex">Author</th>
										<th>Title</th>
										<th>Description</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{data?.announcements?.map((item) => (
										<tr key={item._id}>
											<td className="hidden md:flex items-center gap-2">
												<img src={item.authorImage} className="w-8 h-8 rounded-full" />
												<span>{item.authorName}</span>
											</td>
											<td>{item.title}</td>
											<td>{item.description}</td>
											<td>
												<button
													onClick={() => {
														Swal.fire({
															title: "Are you sure?",
															text: "You won't be able to revert this!",
															icon: "warning",
															showCancelButton: true,
															confirmButtonColor: "#d33",
															cancelButtonColor: "#3085d6",
															confirmButtonText: "Yes, delete it!",
														}).then((result) => {
															if (result.isConfirmed) {
																deleteAnnouncement(item._id);
																Swal.fire({
																	showConfirmButton: false,
																	timer: 1500,
																	icon: "success",
																	title: "Your announcement has been deleted.",
																});
															}
														});
													}}
													className="btn btn-xs btn-error"
												>
													<FaTrash color="white" />
												</button>
											</td>
										</tr>
									))}
									{data?.announcements?.length === 0 && (
										<tr>
											<td colSpan="4" className="text-center text-gray-500">
												No announcements yet.
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>

						<div className="mt-4 flex justify-center items-center gap-1 flex-wrap">
							<button className="btn btn-sm" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
								Prev
							</button>

							{[...Array(totalPages).keys()].map((pg) => {
								if (pg === 0 || pg === totalPages - 1 || Math.abs(pg - page) <= 1) {
									return (
										<button
											key={pg}
											className={`btn btn-sm ${page === pg ? "btn-active btn-primary text-white" : "btn-ghost"}`}
											onClick={() => setPage(pg)}
										>
											{pg + 1}
										</button>
									);
								} else if ((pg === 1 && page > 2) || (pg === totalPages - 2 && page < totalPages - 3)) {
									return (
										<span key={pg} className="px-2 text-gray-500 select-none">
											...
										</span>
									);
								}
								return null;
							})}

							<button className="btn btn-sm" disabled={page + 1 >= totalPages} onClick={() => setPage((p) => p + 1)}>
								Next
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default MakeAnnouncement;
