import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaFire, FaRocket, FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import Logo from "../../components/Shared/Logo/Logo";
import axios from "axios";
import useSocialLogin from "../../hooks/useSocialLogin";

const Register = () => {
	const [previewImage, setPreviewImage] = useState(null);
	const [isUploading, setIsUploading] = useState(false);
	const { createUser, updateUserProfile, loading, user } = useAuth();
	const { handleGoogleSignIn } = useSocialLogin();
	const navigate = useNavigate();
	const location = useLocation();
	const from = location?.state?.from?.pathname || "/";

	useEffect(() => {
		document.title = "Register | Talkora Forum";
	}, []);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	if (user) return <Navigate to={from} replace />;
	if (loading) return <LoadingSpinner />;

	const onSubmit = async ({ name, email, password, photo }) => {
		try {
			setIsUploading(true);

			const formData = new FormData();
			formData.append("image", photo[0]);

			const imgbbKey = import.meta.env.VITE_IMGBB_API_KEY;
			const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
				method: "POST",
				body: formData,
			});

			const imgData = await res.json();
			const photoURL = imgData?.data?.url || "";

			await createUser(email, password);
			await updateUserProfile(name, photoURL);

			const userInfo = {
				name,
				email,
				image: photoURL,
				role: "user",
				badge: "bronze",
				created_at: new Date().toISOString(),
				last_login_time: new Date().toISOString(),
			};

			await axios.post(`${import.meta.env.VITE_API_URL}/users`, userInfo, {
				withCredentials: true,
			});

			toast.success("Registration successful!");
			reset();
			setPreviewImage(null);
			navigate(from, { replace: true });
		} catch (err) {
			console.error(err);
			toast.error("Signup failed");
		} finally {
			setIsUploading(false);
		}
	};

	return (
		<div className="min-h-screen w-full flex flex-col md:flex-row overflow-hidden">
			<div className="flex flex-col md:gap-8 md:w-1/2 bg-[#F7F7F7] p-5 sm:p-10">
				<Link to="/">
					<Logo IsHiddenLogoTextOnSm={false} />
				</Link>
				<div className="flex flex-col xl:justify-center lg:min-h-[70vh] max-w-[570px] lg:p-20 xl:mx-auto py-5">
					<h2 className="text-2xl font-bold text-gray-800 mb-3">Create a Talkora Account</h2>
					<div className="space-y-4">
						<div className="flex items-start gap-4 bg-white rounded-lg p-4 shadow-sm border">
							<FaFire className="text-2xl text-orange-500" />
							<p className="text-md text-gray-600">Fill in your details to create your account.</p>
						</div>
						<div className="flex items-start gap-4 bg-white rounded-lg p-4 shadow-sm border">
							<FaRocket className="text-2xl text-yellow-500" />
							<p className="text-md text-gray-600">Join the conversation and connect with the community!</p>
						</div>
					</div>
				</div>
			</div>

			<div className="p-4 sm:p-10 bg-white md:w-1/2 flex items-center justify-center">
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full lg:max-w-[450px]">
					<div>
						<label className="label">
							<span className="label-text font-medium">Full Name</span>
						</label>
						<input
							type="text"
							{...register("name", { required: "Name is required" })}
							placeholder="Enter your full name"
							className="input input-bordered w-full bg-gray-50"
						/>
						{errors.name && <span className="text-sm text-red-500">{errors.name.message}</span>}
					</div>

					<div>
						<label className="label">
							<span className="label-text font-medium">Email</span>
						</label>
						<input
							type="email"
							{...register("email", {
								required: "Email Address is required",
								pattern: {
									value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
									message: "Please enter a valid email address",
								},
							})}
							placeholder="Enter email address"
							className="input input-bordered w-full bg-gray-50"
						/>
						{errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
					</div>

					<div>
						<label className="label">
							<span className="label-text font-medium">Upload Photo</span>
						</label>
						<input
							type="file"
							accept="image/*"
							{...register("photo", {
								required: true,
								onChange: (e) => {
									const file = e.target.files[0];
									if (file) {
										const url = URL.createObjectURL(file);
										setPreviewImage(url);
									}
								},
							})}
							className="file-input file-input-bordered w-full bg-gray-50"
						/>

						{previewImage && (
							<div className="mt-3">
								<p className="text-sm text-gray-500 mb-1">Preview:</p>
								<img src={previewImage} alt="Preview" className="w-20 h-20 rounded-full object-cover border shadow" />
							</div>
						)}
						{errors.photo && <span className="text-sm text-red-500">Photo is required</span>}
					</div>

					<div>
						<label className="label">
							<span className="label-text font-medium">Password</span>
						</label>
						<input
							type="password"
							{...register("password", {
								required: "Password is required",
								minLength: {
									value: 6,
									message: "Password must be at least 6 characters",
								},
								pattern: {
									value: /^(?=.*[A-Za-z])(?=.*\d).{6,}$/,
									message: "Password must contain at least one letter and one number",
								},
							})}
							placeholder="Create password"
							className="input input-bordered w-full bg-gray-50"
							autoComplete="autocomplete"
						/>
						{errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}
					</div>

					<button
						type="submit"
						disabled={isUploading}
						className="btn bg-orange-500 text-white hover:bg-orange-600 w-full"
					>
						{isUploading ? "Uploading..." : "Sign Up"}
					</button>

					<p className="text-sm text-center text-gray-600">
						Already have an account?{" "}
						<Link to="/login" className="text-orange-500 font-medium hover:underline">
							Login
						</Link>
					</p>

					<div className="flex items-center justify-center gap-2">
						<div className="border-t w-full" />
						<p className="text-gray-400 text-sm">or</p>
						<div className="border-t w-full" />
					</div>

					<button
						onClick={handleGoogleSignIn}
						type="button"
						className="btn btn-outline w-full flex items-center gap-3 justify-center"
					>
						<FaGoogle className="text-lg" />
						Sign Up With Google
					</button>
				</form>
			</div>
		</div>
	);
};

export default Register;
