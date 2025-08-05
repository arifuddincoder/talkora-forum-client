import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useSinglePost = (postId) => {
	const axiosPublic = useAxiosPublic();

	const {
		data: post = {},
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["post", postId],
		queryFn: async () => {
			const res = await axiosPublic.get(`/posts/${postId}`);
			return res.data;
		},
		enabled: !!postId,
	});

	return { post, isLoading, refetch };
};

export default useSinglePost;
