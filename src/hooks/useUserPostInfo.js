import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUserPostInfo = (email) => {
	const axiosSecure = useAxiosSecure();

	const {
		data = {},
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["userPostInfo", email],
		enabled: !!email,
		queryFn: async () => {
			const res = await axiosSecure.get(`/users/posts-info?email=${email}`);
			return res.data;
		},
	});

	return {
		postCount: data.count || 0,
		isGoldMember: data.isMember || false,
		isLoading,
		refetchPostInfo: refetch,
	};
};

export default useUserPostInfo;
