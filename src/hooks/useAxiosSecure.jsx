import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const axiosSecure = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true,
});

const useAxiosSecure = () => {
	const navigate = useNavigate();
	const { logOut } = useAuth();

	useEffect(() => {
		const interceptor = axiosSecure.interceptors.response.use(
			(res) => res,
			async (error) => {
				const status = error.response?.status;

				if (status === 401 || status === 403) {
					try {
						await logOut();
						navigate("/login");
					} catch (logoutError) {
						console.error("Logout failed:", logoutError);
					}
				}

				return Promise.reject(error);
			}
		);

		return () => {
			axiosSecure.interceptors.response.eject(interceptor);
		};
	}, [logOut, navigate]);

	return axiosSecure;
};

export default useAxiosSecure;
