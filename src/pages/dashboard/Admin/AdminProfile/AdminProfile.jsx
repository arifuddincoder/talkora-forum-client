import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { FaUserAlt, FaComments, FaFileAlt } from "react-icons/fa";
import AdminStatsPieChart from "./AdminStatsPieChart";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner";
const AdminProfile = () => {
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();

	useEffect(() => {
		document.title = "Admin Profile | Talkora Forum Dashboard";
	}, []);

	const { data: stats = {}, isLoading } = useQuery({
		queryKey: ["admin-overview"],
		queryFn: async () => {
			const res = await axiosSecure.get("/admin/overview");
			return res.data;
		},
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();
	const onSubmit = async (data) => {
		try {
			const res = await axiosSecure.post("/tags", { name: data.name.toLowerCase() });
			if (res.data.insertedId) {
				toast.success("Tag added successfully");
				reset();
			}
		} catch (err) {
			if (err.response?.status === 409) {
				toast.error("Tag already exists");
			} else {
				toast.error("Failed to add tag");
			}
		}
	};

	if (isLoading) return <LoadingSpinner />;

	return (
		<div className="space-y-10 pb-10">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white p-6 shadow rounded">
				<div className="flex items-center gap-6 flex-col md:flex-row text-center md:text-left">
					<img src={user?.photoURL} alt="admin" className="w-24 h-24 rounded-full object-cover" />
					<div>
						<h2 className="text-xl font-bold">{user?.displayName}</h2>
						<p className="text-gray-600">{user?.email}</p>
					</div>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
					<div className="bg-[#ff8042]/10 text-[#d36a36] p-4 rounded shadow text-center">
						<FaFileAlt className="text-3xl mx-auto mb-2" />
						<h4 className="text-xl font-semibold">{stats.posts}</h4>
						<p className="text-sm">Total Posts</p>
					</div>

					<div className="bg-[#00c49f]/10 text-[#058f76] p-4 rounded shadow text-center">
						<FaComments className="text-3xl mx-auto mb-2" />
						<h4 className="text-xl font-semibold">{stats.comments}</h4>
						<p className="text-sm">Total Comments</p>
					</div>

					<div className="bg-[#0088fe]/10 text-[#0088fe] p-4 rounded shadow text-center">
						<FaUserAlt className="text-3xl mx-auto mb-2" />
						<h4 className="text-xl font-semibold">{stats.users}</h4>
						<p className="text-sm">Total Users</p>
					</div>
				</div>
			</div>

			<div className="flex flex-col gap-6">
				<div className="w-full">
					<AdminStatsPieChart stats={stats} />
				</div>
				<div className="bg-white shadow rounded p-6">
					<h3 className="text-lg font-bold mb-4">Add New Tag</h3>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<div className="form-control w-full">
							<input
								type="text"
								placeholder="Enter tag name (e.g. javascript)"
								{...register("name", { required: "Tag name is required" })}
								className="input input-bordered w-full"
							/>
							{errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
						</div>
						<button type="submit" className="btn  text-white btn-primary w-full">
							Add Tag
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AdminProfile;
