import React, { useEffect } from "react";
import useUserProfile from "../../../../hooks/useUserProfile";
import useRecentPosts from "../../../../hooks/useRecentPosts";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner";
import { Link } from "react-router";
import dayjs from "dayjs";
import goldBadge from "../../../../assets/gold-badge.png";
import bronzeBadge from "../../../../assets/bronze-badge.png";

const MyProfile = () => {
	const { profile, isLoading: profileLoading } = useUserProfile();
	const { posts, isLoading: postsLoading } = useRecentPosts();

	useEffect(() => {
		document.title = "My Profile | Talkora Forum";
	}, []);

	if (profileLoading || postsLoading) return <LoadingSpinner />;
	return (
		<div className="max-w-4xl mx-auto p-0 lg:p-6 pb-2">
			<div className="bg-white p-4 lg:p-10 shadow rounded-lg flex flex-col sm:flex-row gap-6 justify-between">
				<div className="flex items-center gap-4 flex-col md:flex-row text-center md:text-left">
					<div>
						<img
							src={profile?.image}
							alt="User"
							className="w-32 h-32 rounded-full object-cover border-4 border-orange-400"
						/>
					</div>
					<div>
						<h2 className="text-2xl font-bold">{profile?.name}</h2>
						<p className="text-gray-600">{profile?.email}</p>
						<p className="text-sm text-gray-400">Joined: {dayjs(profile?.created_at).format("MMMM D, YYYY")}</p>
						<p className="text-sm text-gray-400 mb-2">
							Last login: {dayjs(profile?.last_login_time).format("MMMM D, YYYY h:mm A")}
						</p>
						{profile?.badge === "bronze" && (
							<p className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-white text-sm font-semibold shadow">
								🥉 Bronze Member
							</p>
						)}

						{profile?.badge === "gold" && (
							<p className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 text-white text-sm font-semibold shadow">
								🥇 Gold Member
							</p>
						)}
					</div>
				</div>
				<div className="flex justify-center md:justify-start">
					{profile?.badge === "gold" && (
						<div className="w-50 h-50">
							<img src={goldBadge} alt="Gold Badge" className="object-cover" />
						</div>
					)}

					{profile?.badge === "bronze" && (
						<div className="w-50 h-50">
							<img src={bronzeBadge} alt="Bronze Badge" className="object-cover" />
						</div>
					)}
				</div>
			</div>

			<div className="mt-8">
				{posts.length > 0 && <h3 className="text-xl font-semibold mb-4">My Recent Posts</h3>}
				<div className="grid md:grid-cols-3 gap-4">
					{posts.map((post) => (
						<div key={post._id} className="bg-white p-4 md:p-6 rounded-md shadow">
							<Link target="_blank" to={`/post-details/${post._id}`}>
								<h4 className="text-lg font-bold">{post.title}</h4>
							</Link>
							<p className="text-gray-600 line-clamp-3">{post.description}</p>
							<p className="text-sm text-gray-400 mt-2">Votes: {(post.upvote || 0) - (post.downvote || 0)}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default MyProfile;
