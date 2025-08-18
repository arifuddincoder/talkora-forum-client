import { createBrowserRouter } from "react-router";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import PostDetailsPage from "../pages/PostDetailsPage/PostDetailsPage";
import RootLayout from "../layouts/RootLayout";
import AdminRoute from "./AdminRoute";
import AdminProfile from "../pages/dashboard/Admin/AdminProfile/AdminProfile";
import MyProfile from "../pages/dashboard/User/MyProfile/MyProfile";
import MakeAnnouncement from "../pages/dashboard/Admin/MakeAnnouncement/MakeAnnouncement";
import ManageUsers from "../pages/dashboard/Admin/ManageUsers/ManageUsers";
import AddPost from "../pages/dashboard/User/AddPost/AddPost";
import MyPosts from "../pages/dashboard/User/MyPosts/MyPosts";
import MembershipPage from "../pages/Membership/MembershipPage";
import CommentPage from "../pages/dashboard/User/CommentPage/CommentPage";
import ReportedComments from "../pages/dashboard/Admin/ReportedComments/ReportedComments";
import Contact from "../pages/general/Contact";
import About from "../pages/general/About";
import UserPosts from "../pages/UserPosts/UserPosts";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: "/post-details/:id",
				Component: PostDetailsPage,
			},
			{
				path: "/contact",
				Component: Contact,
			},
			{
				path: "/about",
				Component: About,
			},
			{
				path: "/membership",
				element: (
					<PrivateRoute>
						<MembershipPage />
					</PrivateRoute>
				),
			},
			{
				path: "/users/:email/posts",
				element: (
					<PrivateRoute>
						<UserPosts />
					</PrivateRoute>
				),
			},
		],
	},
	{ path: "/login", element: <Login /> },
	{ path: "/register", element: <Register /> },
	{
		path: "/dashboard",
		element: (
			<PrivateRoute>
				<DashboardLayout />
			</PrivateRoute>
		),
		children: [
			{
				path: "profile",
				element: (
					<PrivateRoute>
						<MyProfile />
					</PrivateRoute>
				),
			},
			{
				path: "add-post",
				element: (
					<PrivateRoute>
						<AddPost />
					</PrivateRoute>
				),
			},
			{
				path: "my-posts",
				element: (
					<PrivateRoute>
						<MyPosts />
					</PrivateRoute>
				),
			},
			{
				path: "comments/:id",
				element: <CommentPage />,
			},

			{
				path: "admin-profile",
				element: (
					<AdminRoute>
						<AdminProfile />
					</AdminRoute>
				),
			},
			{
				path: "manage-users",
				element: (
					<AdminRoute>
						<ManageUsers />
					</AdminRoute>
				),
			},
			{
				path: "make-announcement",
				element: (
					<AdminRoute>
						<MakeAnnouncement />
					</AdminRoute>
				),
			},
			{
				path: "reported-comments",
				element: (
					<AdminRoute>
						<ReportedComments />
					</AdminRoute>
				),
			},
		],
	},
]);
