import React, { useEffect, useState } from "react";
import {
	FaThumbsUp,
	FaThumbsDown,
	FaCommentDots,
	FaFacebook,
	FaTwitter,
	FaLinkedin,
	FaWhatsapp,
	FaTelegram,
	FaEnvelope,
	FaRegCalendarAlt,
} from "react-icons/fa";
import {
	FacebookShareButton,
	TwitterShareButton,
	LinkedinShareButton,
	WhatsappShareButton,
	TelegramShareButton,
	EmailShareButton,
} from "react-share";
import useSinglePost from "../../hooks/useSinglePost";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import Container from "../../components/Shared/Container";
import PostComments from "./Sections/PostComments";
import useAuth from "../../hooks/useAuth";
import { Link, useParams } from "react-router";
import toast from "react-hot-toast";
import { axiosSecure } from "../../hooks/useAxiosSecure";
import dayjs from "dayjs";

const PostDetailsPage = () => {
	const { id } = useParams();
	const { post, isLoading, refetch } = useSinglePost(id);
	const { user } = useAuth();
	const [voting, setVoting] = useState(false);

	const {
		title,
		description,
		tags = [],
		upvote = 0,
		downvote = 0,
		created_at,
		authorName,
		authorImage,
		commentCount,
	} = post || {};

	useEffect(() => {
		if (post?.title) {
			document.title = `${post.title} | Talkora Forum`;
		}
	}, [post?.title]);

	const shareUrl = `${window.location.origin}/post-details/${id}`;

	if (isLoading) return <LoadingSpinner />;

	const handleVote = async (type) => {
		if (!user) return toast.error("Please login to vote.");
		setVoting(true);
		try {
			const res = await axiosSecure.patch(`/posts/${id}/vote`, { type });
			if (res.data.modifiedCount > 0 || res.data.upsertedCount > 0 || res.data.acknowledged) {
				toast.success("Vote updated!");
				refetch();
			} else {
				toast.error("Vote not updated");
			}
		} catch (err) {
			console.error(err);
			toast.error("Something went wrong");
		} finally {
			setVoting(false);
		}
	};

	return (
		<div className="pt-5 pb-10">
			<Container>
				<div className="flex gap-5 flex-col lg:flex-row">
					<div className="lg:w-9/12 bg-white p-6 rounded-2xl">
						<h1 className="text-2xl font-bold text-[#3F4354] mb-2">{title}</h1>

						<div className="flex gap-2 mb-4 flex-wrap">
							{tags.map((tag) => (
								<span key={tag} className="bg-orange-100 text-orange-600 text-xs font-medium px-2 py-1 rounded-full">
									{tag}
								</span>
							))}
						</div>

						<div className="text-gray-700 leading-relaxed space-y-3 mb-6">
							{description?.split("\n").map((para, idx) => (
								<p key={idx}>{para}</p>
							))}
						</div>

						<div className="flex items-center gap-6 mt-4 text-gray-600 text-sm flex-wrap">
							<div
								onClick={() => handleVote("upvote")}
								className={`flex items-center gap-1 ${
									voting ? "text-gray-400 cursor-not-allowed" : "hover:text-blue-600 cursor-pointer"
								}`}
							>
								<FaThumbsUp className="text-base" />
								<span className="font-medium">{voting ? "Voting..." : `${upvote} Upvotes`}</span>
							</div>

							<div
								onClick={() => handleVote("downvote")}
								className={`flex items-center gap-1 ${
									voting ? "text-gray-400 cursor-not-allowed" : "hover:text-red-500 cursor-pointer"
								}`}
							>
								<FaThumbsDown className="text-base" />
								<span className="font-medium">{voting ? "Voting..." : `${downvote} Downvotes`}</span>
							</div>

							<div className="flex items-center gap-1 hover:text-orange-500 cursor-pointer">
								<FaCommentDots className="text-base" />
								<span className="font-medium">{commentCount || 0} Comments</span>
							</div>
						</div>
						{!user && (
							<div className="p-4 bg-orange-100 text-orange-800 font-semibold rounded-md text-center mt-6 lg:mt-10">
								Please{" "}
								<Link to="/login" className="underline">
									join us
								</Link>{" "}
								to comment.
							</div>
						)}
						<PostComments postId={id} postTitle={title} refetchPost={refetch} />
					</div>

					<div className="lg:w-3/12 space-y-5">
						<div className="bg-white rounded-xl p-5 text-center">
							<img
								src={authorImage || "https://i.ibb.co/ZYW3VTp/brown-brim.png"}
								alt="Author"
								className="w-16 h-16 mx-auto rounded-full object-cover mb-3"
							/>
							<h4 className="font-semibold text-gray-800">{authorName}</h4>
							<p className="text-gray-500">Talkora User</p>
						</div>

						<div className="bg-white rounded-2xl p-5 flex items-center gap-3 mt-3">
							<FaRegCalendarAlt className="text-xl text-gray-500" />
							<p className="text-gray-700">Posted on {dayjs(created_at).format("MMMM D, YYYY h:mm A")}</p>
						</div>

						<div className="bg-white rounded-2xl p-5">
							{user ? (
								<>
									<h4 className="font-medium text-gray-700 mb-3">Share on</h4>
									<div className="flex gap-4 text-2xl text-gray-600">
										<FacebookShareButton url={shareUrl}>
											<FaFacebook className="hover:text-blue-600 cursor-pointer" />
										</FacebookShareButton>
										<TwitterShareButton url={shareUrl}>
											<FaTwitter className="hover:text-sky-500 cursor-pointer" />
										</TwitterShareButton>
										<LinkedinShareButton url={shareUrl}>
											<FaLinkedin className="hover:text-blue-700 cursor-pointer" />
										</LinkedinShareButton>
										<WhatsappShareButton url={shareUrl}>
											<FaWhatsapp className="hover:text-green-500 cursor-pointer" />
										</WhatsappShareButton>
										<TelegramShareButton url={shareUrl}>
											<FaTelegram className="hover:text-sky-600 cursor-pointer" />
										</TelegramShareButton>
										<EmailShareButton url={shareUrl}>
											<FaEnvelope className="hover:text-rose-500 cursor-pointer" />
										</EmailShareButton>
									</div>
								</>
							) : (
								<p className="text-gray-500 italic">Please log in to share this post.</p>
							)}
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default PostDetailsPage;
