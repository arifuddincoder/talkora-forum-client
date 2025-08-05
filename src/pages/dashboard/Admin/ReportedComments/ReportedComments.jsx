import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash, FaCheck } from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useReportedComments from "../../../../hooks/useReportedComments";

const ReportedComments = () => {
	const [page, setPage] = useState(0);
	const limit = 10;

	const axiosSecure = useAxiosSecure();
	const { comments, total, isLoading, refetch } = useReportedComments(page, limit);
	const totalPages = Math.ceil(total / limit);

	useEffect(() => {
		document.title = "Reported Comments | Talkora Admin";
	}, []);

	const handleDelete = async (id) => {
		try {
			const res = await axiosSecure.delete(`/comments/${id}`);
			if (res.data.deletedCount > 0) {
				toast.success("Comment deleted");
				refetch();
			}
		} catch {
			toast.error("Failed to delete");
		}
	};

	const handleIgnore = async (id) => {
		try {
			const res = await axiosSecure.patch(`/ignore-report/${id}`);
			if (res.data.modifiedCount > 0) {
				toast.success("Report ignored");
				refetch();
			}
		} catch {
			toast.error("Failed to ignore");
		}
	};

	if (isLoading) return <p className="text-center mt-10">Loading reported comments...</p>;

	return (
		<div className="p-4 md:p-6 bg-white rounded-md">
			<h2 className="text-2xl font-bold mb-4">Reported Comments</h2>

			<div className="overflow-x-auto">
				<table className="table table-zebra w-full">
					<thead className="bg-base-200">
						<tr>
							<th>#</th>
							<th>Commenter Email</th>
							<th>Comment</th>
							<th>Feedback</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{comments.map((c, i) => (
							<tr key={c._id}>
								<td>{page * limit + i + 1}</td>
								<td>{c.userEmail}</td>
								<td>{c.text.length > 40 ? <span title={c.text}>{c.text.slice(0, 40)}...</span> : c.text}</td>
								<td>{c.feedback}</td>
								<td className="flex gap-2">
									<button
										onClick={() => handleDelete(c._id)}
										className="btn btn-xs btn-error tooltip"
										data-tip="Delete"
									>
										<FaTrash color="white" />
									</button>
									<button
										onClick={() => handleIgnore(c._id)}
										className="btn btn-xs btn-success tooltip"
										data-tip="Ignore"
									>
										<FaCheck color="white" />
									</button>
								</td>
							</tr>
						))}
						{comments.length === 0 && (
							<tr>
								<td colSpan="5" className="text-center text-gray-500 py-6">
									No reported comments.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			<div className="mt-4 flex justify-center items-center gap-1 flex-wrap">
				<button className="btn btn-sm" disabled={page === 0} onClick={() => setPage((prev) => Math.max(prev - 1, 0))}>
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

				<button className="btn btn-sm" disabled={page + 1 >= totalPages} onClick={() => setPage((prev) => prev + 1)}>
					Next
				</button>
			</div>
		</div>
	);
};

export default ReportedComments;
