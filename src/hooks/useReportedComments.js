import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useReportedComments = (page, limit = 10) => {
	const axiosSecure = useAxiosSecure();

	const {
		data = {},
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["reported-comments", page],
		queryFn: async () => {
			const res = await axiosSecure.get(`/reported-comments?page=${page}&limit=${limit}`);
			return res.data;
		},
		keepPreviousData: true,
	});

	return {
		comments: data.comments || [],
		total: data.total || 0,
		isLoading,
		refetch,
	};
};

export default useReportedComments;
