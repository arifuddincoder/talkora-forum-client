import React from "react";
import Container from "../Container";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import Logo from "../Logo/Logo";
import { HiBell } from "react-icons/hi";
import useUserRole from "../../../hooks/useUserRole";
import usePublicAnnouncements from "../../../hooks/usePublicAnnouncements";
import LoadingSpinner from "../LoadingSpinner";

const Navbar = () => {
	const { user, logOut } = useAuth();
	const { role, isLoading: roleLoading } = useUserRole();

	const { announcements, announcementsLoading } = usePublicAnnouncements();
	if (!role && roleLoading) {
		return (
			<div className="flex justify-center items-center h-32">
				<span className="loading loading-spinner loading-md text-primary"></span>
				<p className="ml-2 text-gray-600 font-medium">Loading...</p>
			</div>
		);
	}

	const dashboardPath = role === "admin" ? "/dashboard/admin-profile" : "/dashboard/profile";
	const navItems = (
		<>
			<li>
				<NavLink to="/" className="hover:text-black">
					Home
				</NavLink>
			</li>
			<li>
				<NavLink to="/membership" className="hover:text-black">
					Membership
				</NavLink>
			</li>
			{user ? (
				<></>
			) : (
				<>
					<li>
						<NavLink className="hover:text-black flex sm:hidden" to="/login">
							Join Us
						</NavLink>
					</li>
				</>
			)}
		</>
	);
	return (
		<div className="sticky top-0 z-50 bg-white shadow">
			<Container>
				<div className="navbar items-center flex justify-between">
					<div className="navbar-start sm:w-[40%] w-full gap-2">
						<div className="dropdown">
							<div tabIndex={0} role="button" className="btn btn-secondary bg-[#FF4401] px-2 py-2 lg:hidden">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									{" "}
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />{" "}
								</svg>
							</div>
							<ul
								tabIndex={0}
								className="menu text-base dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
							>
								{navItems}
							</ul>
						</div>
						<Link to="/">
							<Logo />
						</Link>
					</div>
					<div className="header-desktop-nav navbar-center hidden lg:flex">
						<ul className="menu-horizontal text-lg font-semibold flex flex-wrap w-fit gap-10 text-[#192351]">
							{navItems}
						</ul>
					</div>
					<div className="navbar-end gap-2 flex">
						<div className="relative">
							<button className="bg-[#eceeef] p-2 rounded-md relative w-10 h-10">
								<HiBell size={25} fill="#858EAD" />
								{!announcementsLoading && announcements.length > 0 && (
									<span className="absolute top-0.5 right-0.5 bg-red-500 text-white text-[10px] font-semibold px-1.5 py-[1px] rounded-full">
										{announcements.length}
									</span>
								)}
							</button>
						</div>
						{user ? (
							<>
								<div className="dropdown dropdown-end">
									<label
										tabIndex={0}
										className="avatar border-1 border-[#EA942C] p-1 cursor-pointer w-10 h-10 rounded-md"
									>
										<div className="rounded-md bg-[#EA942C]">
											<img src={user?.photoURL} alt="User Avatar" className="object-cover object-center" />
										</div>
									</label>

									<ul
										tabIndex={0}
										className="dropdown-content z-[100] menu p-4 shadow bg-base-100 rounded-box w-52 mt-3 text-base"
									>
										<li className="pointer-events-none text-gray-600 font-semibold">{user?.displayName}</li>
										<div className="divider my-1" />
										<li className="mb-2">
											<Link to={dashboardPath} className="p-0 hover:text-[#EA942C] hover:bg-transparent">
												Dashboard
											</Link>
										</li>
										<li>
											<button className="p-0 hover:text-[#EA942C] hover:bg-transparent" onClick={logOut}>
												Logout
											</button>
										</li>
									</ul>
								</div>
							</>
						) : (
							<>
								<Link
									to="/login"
									className="bg-[#FF6934] hover:bg-orange-600 text-white font-semibold px-3 sm:px-6 py-2 rounded-md transition duration-200 hidden sm:flex"
								>
									Join Us
								</Link>
							</>
						)}
					</div>
				</div>
			</Container>
		</div>
	);
};

export default Navbar;
