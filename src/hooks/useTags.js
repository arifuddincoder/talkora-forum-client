import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useTags = () => {
	const axiosSecure = useAxiosSecure();

	const { data: tags = [], isLoading } = useQuery({
		queryKey: ["tags"],
		queryFn: async () => {
			const res = await axiosSecure.get("/tags");
			return res.data;
		},
	});

	return { tags, isLoading };
};

export default useTags;
