import React, { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { FaFire, FaRocket, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Logo from "../../components/Shared/Logo/Logo";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useSocialLogin from "../../hooks/useSocialLogin";

const Login = () => {
	const { signIn, loading, user } = useAuth();
	const { handleGoogleSignIn } = useSocialLogin();
	const navigate = useNavigate();
	const location = useLocation();
	const from = location?.state?.from?.pathname || "/";
	useEffect(() => {
		document.title = "Login | Talkora Forum";
	}, []);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	if (user) return <Navigate to={from} replace />;
	if (loading) return <LoadingSpinner />;

	const onSubmit = async ({ email, password }) => {
		try {
			await signIn(email, password);

			await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, { email }, { withCredentials: true });

			const lastLoginTime = new Date().toISOString();
			await axios.patch(
				`${import.meta.env.VITE_API_URL}/users/${email}`,
				{ last_login_time: lastLoginTime },
				{ withCredentials: true }
			);

			navigate(from, { replace: true });
			toast.success("Welcome back! Logged in successfully.");
		} catch (err) {
			toast.error("Login Failed");
		}
	};
	return (
		<div className="">
			<div className="min-h-screen w-full  flex flex-col md:flex-row overflow-hidden">
				<div className="flex flex-col md:gap-8 md:w-1/2 bg-[#F7F7F7] p-5 sm:p-10">
					<Link to="/">
						<Logo IsHiddenLogoTextOnSm={false} />
					</Link>
					<div className="flex flex-col xl:justify-center lg:min-h-[70vh] max-w-[570px] lg:p-20 xl:mx-auto py-5">
						<h2 className="text-2xl font-bold text-gray-800 mb-3">Access Your Talkora Account!</h2>

						<div className="space-y-4">
							<div className="flex items-start gap-4 bg-white rounded-lg p-4 shadow-sm border">
								<FaFire className="text-2xl text-orange-500" />
								<p className="text-md text-gray-600">Enter your email and password to access your account.</p>
							</div>
							<div className="flex items-start gap-4 bg-white rounded-lg p-4 shadow-sm border">
								<FaRocket className="text-2xl text-yellow-500" />
								<p className="text-md text-gray-600">Your dashboard, messages, and posts await on the other side!</p>
							</div>
						</div>
					</div>
				</div>

				<div className="p-4 sm:p-10 bg-white md:w-1/2 flex items-center justify-center">
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full lg:max-w-[450px]">
						<div>
							<label className="label">
								<span className="label-text font-medium">Email</span>
							</label>
							<input
								type="email"
								{...register("email", { required: true })}
								placeholder="Enter email address"
								className="input input-bordered w-full bg-gray-50"
							/>
							{errors.email && <span className="text-sm text-red-500">Email is required</span>}
						</div>

						<div>
							<label className="label">
								<span className="label-text font-medium">Password</span>
							</label>
							<input
								type="password"
								{...register("password", { required: true })}
								placeholder="Password"
								className="input input-bordered w-full bg-gray-50"
								autoComplete="autocomplete"
							/>
							{errors.password && <span className="text-sm text-red-500">Password is required</span>}
						</div>

						<button type="submit" className="btn bg-orange-500 text-white hover:bg-orange-600 w-full">
							Sign in
						</button>

						<p className="text-sm text-center text-gray-600">
							Don’t have an account yet?{" "}
							<Link to="/register">
								<span className="text-orange-500 font-medium hover:underline cursor-pointer">Sign Up.</span>
							</Link>
						</p>

						<div className="flex items-center justify-center gap-2">
							<div className="border-t w-full" />
							<p className="text-gray-400 text-sm">or</p>
							<div className="border-t w-full" />
						</div>

						<button
							type="button"
							className="btn btn-outline w-full flex items-center gap-3 justify-center"
							onClick={handleGoogleSignIn}
						>
							<FaGoogle className="text-lg" />
							SignIn With Google
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
