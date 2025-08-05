import { useMemo } from "react";
import axios from "axios";

const axiosPublic = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true,
});

const useAxiosPublic = () => {
	const instance = useMemo(() => axiosPublic, []);
	return instance;
};

export default useAxiosPublic;
