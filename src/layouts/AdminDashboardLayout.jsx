import { FaBars, FaTimes } from "react-icons/fa";

import { NavLink, Outlet, useNavigation } from "react-router";
import Logo from "../components/Shared/Logo/Logo";
import LoadingSpinner from "../components/Shared/LoadingSpinner";

const AdminDashboardLayout = ({ user }) => {
	const navigation = useNavigation();
	const isLoading = navigation.state === "loading";
	if (isLoading) return <LoadingSpinner />;

	return (
		<div className="drawer lg:drawer-open">
			<input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

			<div className="drawer-content flex flex-col bg-gray-100 min-h-screen">
				<div className="w-full bg-white shadow-md px-4 py-3 flex items-center justify-between z-50">
					<div className="flex gap-1 items-center">
						<label htmlFor="dashboard-drawer" className="btn btn-ghost lg:hidden text-xl">
							<FaBars />
						</label>
						<h2 className="text-xl font-semibold hidden sm:block">Admin Dashboard</h2>
					</div>
					<div className="text-xl font-semibold truncate max-w-[160px] text-right">{user?.displayName}</div>
				</div>

				<div className="mt-4 p-6">
					<Outlet />
				</div>
			</div>

			<div className="drawer-side z-50">
				<label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

				<ul className="menu p-4 w-60 min-h-full bg-gray-700 text-white space-y-3 relative dashboard-menu">
					<li className="absolute -right-3 -top-2 z-50">
						<div className="lg:hidden flex justify-end mb-4">
							<label
								htmlFor="dashboard-drawer"
								className="cursor-pointer bg-orange-400 hover:bg-orange-500 border-0 p-3"
							>
								<FaTimes className="text-xl text-white" />
							</label>
						</div>
					</li>

					<li className="my-5">
						<NavLink to="/" className="rounded text-xl flex items-end gap-2 hover:bg-transparent">
							<Logo IsHiddenLogoTextOnSm={false} />
						</NavLink>
					</li>

					<li>
						<NavLink to="/dashboard/admin-profile">Admin Profile</NavLink>
					</li>
					<li>
						<NavLink to="/dashboard/manage-users">Manage Users</NavLink>
					</li>
					<li>
						<NavLink to="/dashboard/reported-comments">Reported Comments</NavLink>
					</li>
					<li>
						<NavLink to="/dashboard/make-announcement">Make Announcement</NavLink>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default AdminDashboardLayout;
