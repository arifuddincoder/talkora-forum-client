import React from "react";
import { Outlet, useNavigation } from "react-router";
import Navbar from "../components/Shared/Navbar/Navbar";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import Footer from "../components/Shared/Footer/Footer";

const RootLayout = () => {
	const { loading } = useAuth();
	const navigation = useNavigation();
	const isLoading = navigation.state === "loading";
	if (loading || isLoading) {
		return <LoadingSpinner />;
	}
	return (
		<>
			<Navbar></Navbar>
			<div className="min-h-[95vh] bg-[#F7F7F7]">
				<Outlet />
			</div>
			<Footer />
		</>
	);
};

export default RootLayout;
