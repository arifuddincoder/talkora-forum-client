import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useSecureComments from "../../../../hooks/useSecureComments";

const feedbackOptions = ["Offensive language", "Spam or misleading", "Not relevant to the post"];

const CommentPage = () => {
	const { id } = useParams();
	const { comments, isLoading: isCommentLoading, refetch } = useSecureComments(id);
	const axiosSecure = useAxiosSecure();

	const [selectedFeedback, setSelectedFeedback] = useState({});
	const [reported, setReported] = useState({});
	const [modalComment, setModalComment] = useState(null);
	const [postTitle, setPostTitle] = useState("");

	useEffect(() => {
		document.title = "Comments | Talkora Forum";
	}, []);

	useEffect(() => {
		if (comments.length > 0) {
			setPostTitle(comments[0].postTitle);
		} else {
			setPostTitle("Post title not available");
		}
	}, [comments]);

	const handleFeedbackChange = (commentId, value) => {
		setSelectedFeedback((prev) => ({ ...prev, [commentId]: value }));
	};

	const handleReport = async (commentId) => {
		const feedback = selectedFeedback[commentId];
		try {
			const res = await axiosSecure.patch(`/report-comment/${commentId}`, { feedback });
			if (res.data.modifiedCount > 0) {
				toast.success("Comment reported successfully!");
				setReported((prev) => ({ ...prev, [commentId]: true }));
				refetch();
			}
		} catch (error) {
			toast.error("Failed to report. Try again.");
		}
	};

	const openModal = (text) => setModalComment(text);
	const closeModal = () => setModalComment(null);

	if (isCommentLoading) return <p className="text-center">Loading comments...</p>;

	return (
		<div className="p-4 md:p-6 bg-white rounded-md">
			{comments.length > 0 && (
				<>
					<h2 className="text-xl lg:text-2xl font-bold mb-2">
						All Comments on: <span className="text-orange-600">{postTitle}</span>
					</h2>
				</>
			)}

			{comments.length === 0 ? (
				<p className="text-center text-gray-500 mt-10">No comments found on this post.</p>
			) : (
				<div className="overflow-x-auto pt-3">
					<table className="table table-zebra w-full">
						<thead className="bg-base-200">
							<tr>
								<th>Email</th>
								<th>Comment</th>
								<th>Feedback</th>
								<th>Report</th>
							</tr>
						</thead>
						<tbody>
							{comments.map((comment) => {
								const isLong = comment.text.length > 20;
								const shortText = isLong ? `${comment.text.slice(0, 20)}...` : comment.text;

								return (
									<tr key={comment._id}>
										<td className="whitespace-nowrap">{comment.userEmail}</td>
										<td>
											{shortText}
											{isLong && (
												<button
													onClick={() => openModal(comment.text)}
													className="sm:ml-1 text-blue-500 underline text-sm block sm:inline-block ml-0"
												>
													Read More
												</button>
											)}
										</td>
										<td>
											<select
												className="select select-sm select-bordered w-full max-w-xs"
												defaultValue={comment.reported ? comment.feedback || "" : selectedFeedback[comment._id] || ""}
												onChange={(e) => handleFeedbackChange(comment._id, e.target.value)}
											>
												<option value="">Select Feedback</option>
												{feedbackOptions.map((option) => (
													<option key={option} value={option}>
														{option}
													</option>
												))}
											</select>
										</td>
										<td>
											<button
												disabled={!selectedFeedback[comment._id] || selectedFeedback[comment._id] === comment.feedback}
												onClick={() => handleReport(comment._id)}
												className="btn btn-sm btn-error text-white"
											>
												Report
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			)}

			{modalComment && (
				<dialog open className="modal modal-bottom sm:modal-middle">
					<div className="modal-box">
						<h3 className="font-bold text-lg">Full Comment</h3>
						<p className="py-4">{modalComment}</p>
						<div className="modal-action">
							<button onClick={closeModal} className="btn">
								Close
							</button>
						</div>
					</div>
				</dialog>
			)}
		</div>
	);
};

export default CommentPage;
