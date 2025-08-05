import React from "react";
import { Link } from "react-router";
import dayjs from "dayjs";

const PostCard = ({ author, time, title, id, tags = [], comments = 0, votes = 0, authorImage }) => {
	return (
		<div className="bg-white p-5 rounded-2xl transition border border-gray-100 shadow-sm hover:shadow-md">
			<Link to={`/post-details/${id}`}>
				<h3 className="text-lg font-semibold text-[#3F4354] mb-2.5 hover:text-[#FF6934]">{title}</h3>
			</Link>
			<div className="flex flex-wrap gap-2 mb-8">
				{tags.map((tag) => (
					<span key={tag} className="text-xs bg-[#F4F6F8] px-2 py-1 rounded text-[#858EAD]">
						{tag}
					</span>
				))}
			</div>
			<div className="flex justify-between sm:items-center flex-col sm:flex-row gap-5">
				<div className="flex items-center gap-3">
					<img src={authorImage} alt="Author" className="w-10 h-10 rounded-full object-cover" />
					<div>
						<h4 className="font-semibold text-[#3F4354]">{author}</h4>
						<p className="text-sm text-[#97989D]">{dayjs(time).format("MMMM D, YYYY h:mm A")}</p>
					</div>
				</div>

				<div className="text-sm text-[#97989D] flex gap-10">
					<p>
						{comments} {comments === 1 ? "Comment" : "Comments"}
					</p>
					<p>
						{votes} {votes === 1 ? "Vote" : "Votes"}
					</p>
				</div>
			</div>
		</div>
	);
};

export default PostCard;
