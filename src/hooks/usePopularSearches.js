import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePopularSearches = () => {
	const axiosPublic = useAxiosPublic();

	const { data: searches = [], isLoading: searchIsLoading } = useQuery({
		queryKey: ["popular-searches"],
		queryFn: async () => {
			const res = await axiosPublic.get("/popular-searches");
			return res.data;
		},
	});

	return { searches, searchIsLoading };
};

export default usePopularSearches;
