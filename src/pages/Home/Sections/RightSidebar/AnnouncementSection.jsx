import React from "react";
import usePublicAnnouncements from "../../../../hooks/usePublicAnnouncements";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner";
import dayjs from "dayjs";

const AnnouncementSection = () => {
	const { announcements, isLoading } = usePublicAnnouncements();

	if (isLoading) return <LoadingSpinner />;
	if (!announcements || announcements.length === 0) return null;

	return (
		<div className="bg-white rounded-xl p-5 space-y-4">
			<h2 className="text-lg font-semibold text-gray-800 mb-3">Official Announcements</h2>
			{announcements.map((a) => (
				<div key={a._id} className="bg-[#F4F6F8] border border-[#eceff2] p-4 rounded-md hover:shadow-sm transition">
					<h4 className="font-semibold text-gray-800">{a.title}</h4>
					<p className="text-xs text-gray-500 mt-1">{dayjs(a.created_at).format("MMMM D, YYYY h:mm A")}</p>
				</div>
			))}
		</div>
	);
};

export default AnnouncementSection;
