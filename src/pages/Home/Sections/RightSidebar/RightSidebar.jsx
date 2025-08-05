import React from "react";
import TagsSection from "./TagsSection";
import AnnouncementSection from "./AnnouncementSection";

const RightSidebar = ({ setSearchTag }) => {
	return (
		<div className="flex flex-col gap-6">
			<TagsSection setSearchTag={setSearchTag}></TagsSection>
			<AnnouncementSection></AnnouncementSection>
		</div>
	);
};

export default RightSidebar;
