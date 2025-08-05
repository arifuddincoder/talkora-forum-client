import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useRecentPosts = () => {
	const axiosSecure = useAxiosSecure();

	const { data: posts = [], isLoading } = useQuery({
		queryKey: ["recent-posts"],
		queryFn: async () => {
			const res = await axiosSecure.get("/posts/my-recent");
			return res.data;
		},
	});

	return { posts, isLoading };
};

export default useRecentPosts;
