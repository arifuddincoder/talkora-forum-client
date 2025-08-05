import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();
	const email = user?.email?.toLowerCase();

	const { data: role = "user", isLoading } = useQuery({
		queryKey: ["user-role", email],
		enabled: !!email,
		queryFn: async () => {
			const res = await axiosSecure.get(`/users/role/${email}`);
			return res.data.role || "user";
		},
		retry: 3,
		select: (role) => role || "user",
		onError: (err) => {
			if (err?.response?.status === 404) {
				console.warn("User not found. Using default role 'user'.");
			}
		},
	});

	return { role, isLoading };
};

export default useUserRole;
