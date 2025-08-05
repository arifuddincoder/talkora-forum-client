import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useSecureComments = (postId) => {
	const axiosSecure = useAxiosSecure();

	const {
		data: comments = [],
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["secure-comments", postId],
		enabled: !!postId,
		queryFn: async () => {
			const res = await axiosSecure.get(`/secure-comments/${postId}`);
			return res.data;
		},
	});

	return { comments, isLoading, refetch };
};

export default useSecureComments;
