import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import Container from "../../components/Shared/Container";
import PostCard from "../Home/PostCard/PostCard";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
// যদি এন্ডপয়েন্ট প্রোটেক্টেড হয়, এইটা ব্যবহার করো:
// import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import AnnouncementSection from "../Home/Sections/RightSidebar/AnnouncementSection";

const LIMIT = 5;

const OfficialAnnouncements = () => {
	return (
		<div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
			<h3 className="text-lg font-semibold text-gray-800 mb-2">Official Announcements</h3>
			<p className="text-sm text-gray-600">
				New announcements appear on the home page. Stay tuned for updates and community news.
			</p>
			{/* চাইলে একদম খালি রাখতে পারো—উপরের ব্লকটি কমেন্ট করে দাও */}
		</div>
	);
};

const UserPosts = () => {
	const { email } = useParams(); // route: /users/:email/posts
	const axiosPublic = useAxiosPublic(); // public API; secure দরকার হলে useAxiosSecure()
	const [page, setPage] = useState(0);
	const [sortBy, setSortBy] = useState("newest"); // 'newest' | 'popular'

	useEffect(() => {
		document.title = `Posts by ${email || "User"} – Talkora`;
	}, [email]);

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["userPosts", email, page, sortBy],
		enabled: !!email,
		queryFn: async () => {
			const res = await axiosPublic.get("/user-posts", {
				params: { authorEmail: email, page, limit: LIMIT, sortBy },
			});
			return res.data || { posts: [], total: 0 };
		},
		keepPreviousData: true,
	});

	const posts = Array.isArray(data?.posts) ? data.posts : [];
	const total = data?.total || 0;
	const totalPages = Math.ceil(total / LIMIT);

	return (
		<Container>
			<div className="flex flex-col lg:flex-row gap-10 lg:gap-6 pt-6 pb-10">
				{/* Left: List */}
				<div className="lg:w-7/10">
					<div className="mb-4 flex justify-between items-center gap-2 flex-wrap">
						{/* হোম স্টাইল ফলো করে বাম পাশে বাটন রাখা হলো, তবে এখানে ফিল্টার/সার্চ নেই */}
						<button
							className="btn bg-gray-200 text-gray-700 hover:bg-gray-300"
							onClick={() => {
								// এখানে কোনো ট্যাগ সার্চ নেই—শুধু পেজ রিসেট করে দিচ্ছি
								setPage(0);
							}}
						>
							All Posts
						</button>

						<select
							value={sortBy}
							onChange={(e) => {
								setPage(0);
								setSortBy(e.target.value);
							}}
							className="select select-md border-none focus:outline-none"
						>
							<option value="newest">Sort by: Newest</option>
							<option value="popular">Sort by: Popularity</option>
						</select>
					</div>

					<section>
						{isLoading ? (
							<LoadingSpinner />
						) : isError ? (
							<div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
								{error?.response?.data?.message || "Something went wrong."}
							</div>
						) : (
							<div className="space-y-6">
								{posts.map((post) => (
									<PostCard
										key={post._id}
										id={post._id}
										title={post.title}
										tags={post.tags}
										author={post.authorName}
										authorImage={post.authorImage}
										votes={(post.upvote || 0) - (post.downvote || 0)}
										comments={post.commentCount || 0}
										time={post.created_at}
									/>
								))}
								{posts.length === 0 && <p className="text-center text-gray-500">No posts found.</p>}
							</div>
						)}
					</section>

					{totalPages > 1 && (
						<div className="flex justify-center pt-6">
							<div className="join">
								<button className="join-item btn" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
									<FaChevronLeft />
								</button>

								{Array.from({ length: totalPages }).map((_, pg) => {
									if (pg === 0 || pg === totalPages - 1 || Math.abs(pg - page) <= 1) {
										return (
											<button
												key={pg}
												className={`join-item btn ${pg === page ? "btn-active bg-orange-500 text-white" : ""}`}
												onClick={() => setPage(pg)}
											>
												{pg + 1}
											</button>
										);
									} else if ((pg === 1 && page > 2) || (pg === totalPages - 2 && page < totalPages - 3)) {
										return (
											<span key={pg} className="join-item btn btn-disabled">
												...
											</span>
										);
									}
									return null;
								})}

								<button
									className="join-item btn"
									disabled={page + 1 >= totalPages}
									onClick={() => setPage((p) => p + 1)}
								>
									<FaChevronRight />
								</button>
							</div>
						</div>
					)}
				</div>

				{/* Right: Sidebar (no filters/search) */}
				<div className="lg:w-3/10">
					<AnnouncementSection />
					{/* একদম খালি রাখতে চাইলে উপরের কম্পোনেন্টটা মুছে ফেলো বা কমেন্ট করো */}
				</div>
			</div>
		</Container>
	);
};

export default UserPosts;
