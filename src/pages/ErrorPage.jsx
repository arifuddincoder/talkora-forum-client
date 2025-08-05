import React, { useEffect } from "react";
import { Link, useRouteError } from "react-router";
import notFoundImg from "../assets/not-found.png";
const ErrorPage = () => {
	const error = useRouteError();
	useEffect(() => {
		document.title = "Not Found | Talkora";
	}, []);
	return (
		<div className="py-24 text-center px-3">
			<div>
				<img src={notFoundImg} alt="Not Found" className="mx-auto rounded-md" />
			</div>
			<h1 className="mt-4 mb-8 text-7xl font-thin text-gray-900">{error?.status || 404}</h1>
			<p className="text-xl font-bold text-gray-900 md:text-2xl mb-8">
				{error?.error?.message || "Something Went Wrong!"}
			</p>
			<Link to="/">
				<button className="transition text-xl font-bold  px-8 py-3 border border-[#FF4401] hover:bg-[#FF4401] bg-[#FF4401]/80 text-white  rounded-full cursor-pointer">
					Go To Homepage
				</button>
			</Link>
		</div>
	);
};

export default ErrorPage;
