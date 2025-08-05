import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePublicAnnouncements = () => {
	const axiosPublic = useAxiosPublic();

	const { data: announcements = [], isLoading: announcementsLoading } = useQuery({
		queryKey: ["public-announcements"],
		queryFn: async () => {
			const res = await axiosPublic.get("/public-announcements");
			return res.data;
		},
	});

	return { announcements, announcementsLoading };
};

export default usePublicAnnouncements;
