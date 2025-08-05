import toast from "react-hot-toast";
import useAuth from "./useAuth";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";

const useSocialLogin = () => {
	const { signInWithGoogle } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const from = location?.state?.from?.pathname || "/";

	const handleGoogleSignIn = async () => {
		try {
			const result = await signInWithGoogle();
			const user = result.user;

			const userInfo = {
				name: user.displayName,
				email: user.email,
				image: user.photoURL,
				role: "user",
				badge: "bronze",
				created_at: new Date().toISOString(),
				last_login_time: new Date().toISOString(),
			};

			const res = await axios.post(`${import.meta.env.VITE_API_URL}/users`, userInfo, {
				withCredentials: true,
			});

			if (res.data.existing) {
				await axios.patch(
					`${import.meta.env.VITE_API_URL}/users/${user.email}`,
					{ last_login_time: new Date().toISOString() },
					{ withCredentials: true }
				);
				toast.success("Welcome back! Logged in successfully.");
			} else {
				toast.success("Registration successful via Google!");
			}

			await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, { email: user.email }, { withCredentials: true });

			navigate(from, { replace: true });
		} catch (err) {
			console.error("Google SignIn Error:", err);
			toast.error(err?.message || "Google login failed");
		}
	};

	return {
		handleGoogleSignIn,
	};
};

export default useSocialLogin;
