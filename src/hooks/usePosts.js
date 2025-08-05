import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const usePosts = ({ page, sortBy, search }) => {
	const axiosSecure = useAxiosSecure();
	const { data = {}, isLoading } = useQuery({
		queryKey: ["posts", page, sortBy, search],
		queryFn: async () => {
			const res = await axiosSecure.get(`/posts?page=${page}&limit=5&sort=${sortBy}&search=${search}`);
			return res.data;
		},
		keepPreviousData: true,
	});
	return { posts: data.posts || [], total: data.total || 0, isLoading };
};

export default usePosts;
