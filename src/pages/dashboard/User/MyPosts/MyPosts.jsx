import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaComments } from "react-icons/fa";
const MyPosts = () => {
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const [page, setPage] = useState(0);
	const limit = 10;

	useEffect(() => {
		document.title = "My Posts | Talkora Forum";
	}, []);

	const { data, isLoading } = useQuery({
		queryKey: ["myPosts", user?.email, page],
		enabled: !!user?.email,
		queryFn: async () => {
			const res = await axiosSecure.get(`/user-posts?authorEmail=${user.email}&page=${page}&limit=${limit}`);
			return res.data;
		},
		keepPreviousData: true,
	});

	const { mutate: deletePost } = useMutation({
		mutationFn: async (id) => {
			const res = await axiosSecure.delete(`/posts/${id}`);
			return res.data;
		},
		onSuccess: () => {
			toast.success("Post deleted");
			queryClient.invalidateQueries(["myPosts"]);
		},
	});

	const handleDelete = (id) => {
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
				deletePost(id);
			}
		});
	};

	if (isLoading) {
		return <p className="text-center mt-10">Loading your posts...</p>;
	}

	const posts = Array.isArray(data?.posts) ? data.posts : [];
	const totalPages = Math.ceil((data?.total || 0) / limit);

	return (
		<div className="p-6 bg-white rounded-md">
			<h2 className="text-2xl font-bold mb-4">My Posts</h2>
			<div className="overflow-x-auto">
				<table className="table w-full table-zebra">
					<thead className="bg-base-200">
						<tr>
							<th>Sl.</th>
							<th>Title</th>
							<th className="hidden xl:table-cell">Upvotes</th>
							<th className="hidden xl:table-cell">Downvotes</th>
							<th>Total Votes</th>
							<th>Comments</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{posts.map((post, index) => (
							<tr key={post._id}>
								<td>{index + page * limit + 1}</td>
								<td>
									<Link target="_blank" to={`/post-details/${post._id}`}>
										{post.title}
									</Link>
								</td>
								<td className="hidden xl:table-cell">{post.upvote || 0}</td>
								<td className="hidden xl:table-cell">{post.downvote || 0}</td>
								<td>{(post.upvote || 0) - (post.downvote || 0)}</td>
								<td>
									<button
										onClick={() => navigate(`/dashboard/comments/${post._id}`)}
										className="btn btn-xs btn-primary text-white"
									>
										{post.commentCount || 0}{" "}
										<span className="md:hidden">
											<FaComments />
										</span>
										<span className="hidden md:flex">Comments</span>
									</button>
								</td>
								<td>
									<button onClick={() => handleDelete(post._id)} className="btn btn-xs text-white btn-error">
										Delete
									</button>
								</td>
							</tr>
						))}
						{posts.length === 0 && (
							<tr>
								<td colSpan="6" className="text-center text-gray-500">
									No posts found.
								</td>
							</tr>
						)}
					</tbody>
				</table>

				<div className="mt-4 flex justify-center items-center gap-1 flex-wrap">
					<button className="btn btn-sm" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
						Previous
					</button>

					{[...Array(totalPages).keys()].map((pg) => {
						if (pg === 0 || pg === totalPages - 1 || Math.abs(pg - page) <= 1) {
							return (
								<button
									key={pg}
									className={`btn btn-sm ${page === pg ? "btn-primary text-white" : "btn-ghost"}`}
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
			</div>
		</div>
	);
};

export default MyPosts;
