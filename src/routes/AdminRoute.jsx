import React from "react";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import { Navigate, useLocation } from "react-router";

const AdminRoute = ({ children }) => {
	const { user, loading } = useAuth();
	const { role, isLoading: roleLoading } = useUserRole();
	const location = useLocation();

	if (loading || roleLoading) return <LoadingSpinner />;
	if (user && role === "admin") return children;

	return <Navigate to="/dashboard" state={{ from: location }} replace />;
};

export default AdminRoute;
