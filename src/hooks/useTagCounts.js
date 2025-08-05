import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useTagCounts = () => {
	const axiosSecure = useAxiosSecure();

	const { data: tags = [], isLoading } = useQuery({
		queryKey: ["tagCounts"],
		queryFn: async () => {
			const res = await axiosSecure.get("/tags-with-counts");
			return res.data;
		},
	});

	return { tags, isLoading };
};

export default useTagCounts;
