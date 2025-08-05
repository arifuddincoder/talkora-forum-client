import React from "react";
import { FaTags } from "react-icons/fa";
import useTagCounts from "../../../../hooks/useTagCounts";

const TagsSection = ({ setSearchTag }) => {
	const { tags, isLoading } = useTagCounts();

	if (isLoading) return <p className="text-center text-gray-400">Loading tags...</p>;

	return (
		<div className="bg-white rounded-xl p-6 space-y-4">
			<h3 className="text-lg font-semibold mb-2 text-gray-700">Filter by Tags</h3>
			{tags.map((tag) => (
				<div
					key={tag._id}
					onClick={() => setSearchTag(tag.name)}
					className="flex justify-between items-center font-medium text-sm text-[#3F4354] py-2 px-3 hover:bg-[#F4F6F8] rounded-lg cursor-pointer transition"
				>
					<div className="flex items-center gap-2">
						<FaTags className="text-gray-400" />
						<span className="capitalize">{tag.name}</span>
					</div>
					<span className="text-gray-900 font-semibold">{tag.count}</span>
				</div>
			))}
		</div>
	);
};

export default TagsSection;
