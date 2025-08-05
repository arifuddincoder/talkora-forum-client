import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useComments = (postId) => {
	const axiosPublic = useAxiosPublic();

	const {
		data: comments = [],
		isLoading: isCommentLoading,
		refetch,
	} = useQuery({
		enabled: !!postId,
		queryKey: ["comments", postId],
		queryFn: async () => {
			const res = await axiosPublic.get(`/comments?postId=${postId}`);
			return res.data;
		},
	});

	return { comments, isCommentLoading, refetch };
};

export default useComments;
