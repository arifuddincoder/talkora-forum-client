import React, { useState } from "react";
import { FaReply, FaEllipsisH } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import useComments from "../../../hooks/useComments";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import dayjs from "dayjs";

const PostComments = ({ postId, postTitle, refetchPost }) => {
	const { user } = useAuth();
	const [commentText, setCommentText] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { comments, isCommentLoading, refetch } = useComments(postId);

	const handleCommentSubmit = async () => {
		if (!user) return toast.error("Please login to comment.");
		if (!commentText.trim()) return toast.error("Comment cannot be empty.");

		const newComment = {
			postId,
			postTitle: postTitle,
			userName: user.displayName,
			userEmail: user.email,
			userImage: user.photoURL,
			text: commentText.trim(),
		};

		setIsSubmitting(true);
		try {
			await axios.post(`${import.meta.env.VITE_API_URL}/comments`, newComment);
			toast.success("Comment added!");
			setCommentText("");
			refetch();
			refetchPost && refetchPost();
		} catch (err) {
			console.error("Comment submit failed", err);
			toast.error("Failed to submit comment");
		} finally {
			setIsSubmitting(false);
		}
	};

	if (isCommentLoading) return <LoadingSpinner />;

	return (
		<div className="mt-10">
			{user && (
				<div className="flex gap-3 items-start mb-6">
					<img src={user.photoURL} alt="user" className="w-10 h-10 rounded-full" />
					<div className="flex-1 bg-white border border-[#C5D0E6] rounded-xl p-4">
						<textarea
							placeholder="Say something nice..."
							className="w-full p-3 rounded border border-[#C5D0E6] focus:outline-none focus:ring-2 focus:ring-orange-400"
							rows={3}
							value={commentText}
							onChange={(e) => setCommentText(e.target.value)}
						></textarea>
						<button
							onClick={handleCommentSubmit}
							disabled={isSubmitting}
							className="mt-3 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isSubmitting ? "Commenting..." : "Comment"}
						</button>
					</div>
				</div>
			)}

			<div className="space-y-6">
				{comments.map((comment) => (
					<div key={comment._id}>
						<div className="flex gap-3">
							<img src={comment.userImage || "/default-avatar.png"} alt="user" className="w-10 h-10 rounded-full" />
							<div className="flex-1 bg-white border border-[#C5D0E6] rounded-xl p-4">
								<div className="flex flex-col md:flex-row justify-between mb-1 text-sm text-gray-600">
									<span className="font-semibold text-gray-800">{comment.userName}</span>
									<span>
										{comment.created_at ? dayjs(comment.created_at).format("MMMM D, YYYY h:mm A") : "Just now"}
									</span>
								</div>
								<p className="text-gray-700 text-sm mb-2">{comment.text}</p>
								<div className="flex gap-4 text-gray-400 text-sm">
									<FaReply className="cursor-pointer hover:text-orange-500" />
									<FaEllipsisH className="cursor-pointer" />
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default PostComments;
