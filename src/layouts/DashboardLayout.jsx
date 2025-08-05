import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import AdminDashboardLayout from "./AdminDashboardLayout";
import UserDashboardLayout from "./UserDashboardLayout";

const DashboardLayout = () => {
	const { user, loading: authLoading } = useAuth();
	const { role, isLoading: roleLoading } = useUserRole();

	if (authLoading || roleLoading) return <LoadingSpinner />;

	if (role === "admin") {
		return <AdminDashboardLayout user={user} />;
	}

	return <UserDashboardLayout user={user} />;
};

export default DashboardLayout;
