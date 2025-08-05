import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUserProfile = () => {
	const axiosSecure = useAxiosSecure();

	const { data: profile, isLoading } = useQuery({
		queryKey: ["user-profile"],
		queryFn: async () => {
			const res = await axiosSecure.get("/users/profile");
			return res.data;
		},
	});

	return { profile, isLoading };
};

export default useUserProfile;
