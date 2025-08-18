//* src/pages/user/Profile.jsx

import { Navigate, useNavigate } from "react-router";
import { toast } from "react-toastify";

import { logout } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
	const { user, setUser, isAuthenticated, setIsAuthenticated } = useAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			const response = await logout();
			toast.success(response?.data?.message || "Logout successfully");

			setIsAuthenticated(false);
			setUser(null);

			navigate("/login", { replace: true });
		} catch (error) {
			const message =
				error?.response?.data?.message ||
				error?.message ||
				"Logout failed. Please try again.";
			toast.error(message);
		}
	};

	// If user is not authenticated, redirect to login
	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-base-200 to-base-100">
			{/* Navbar */}
			<nav className="bg-base-100 shadow-lg sticky top-0 z-10">
				<div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex-1">
						<h1 className="text-xl font-bold text-primary">MERN Auth</h1>
					</div>

					<div className="navbar-end pr-6">
						<button
							onClick={handleLogout}
							className="btn btn-outline btn-error rounded-lg px-6 font-semibold hover:bg-error hover:text-white transition"
						>
							Logout
						</button>
					</div>
				</div>
			</nav>

			{/* Profile Section */}
			<div className="max-w-3xl mx-auto mt-5 p-6">
				<div className="flex flex-col items-center mb-6">
					<h2 className="text-3xl font-bold mb-10 text-center">
						User Information
					</h2>

					<div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
						{user?.profilePicture ? (
							<img
								src={user.profilePicture}
								alt="Profile"
								className="w-full h-full object-cover"
							/>
						) : (
							<span className="text-gray-500 text-2xl">
								{user?.name?.slice(0, 2) || "User"}
							</span>
						)}
					</div>
					<h2 className="text-3xl font-bold mt-4">{user?.name || "User"}</h2>
					<p className="text-sm text-gray-500">
						@{user?.email?.split("@")[0] || "user"}
					</p>
				</div>

				<div className="space-y-5">
					<div className="flex justify-between items-center p-4 rounded-lg border">
						<div>
							<p className="text-sm text-gray-500">Email</p>
							<p className="font-medium">{user?.email || "N/A"}</p>
						</div>
					</div>

					<div className="flex justify-between items-center p-4 border rounded-lg">
						<div>
							<p className="text-sm text-gray-500">Role</p>
							<p className="font-medium capitalize">{user?.role || "user"}</p>
						</div>
					</div>

					<div className="flex justify-between items-center p-4 border rounded-lg">
						<div>
							<p className="text-sm text-gray-500">Account Status</p>

							<p
								className={`font-medium ${
									user?.verified ? "text-green-600" : "text-red-600"
								}`}
							>
								{user?.verified ? "Verified" : "Not Verified"}
							</p>
						</div>

						{!user?.verified && (
							<button className="btn btn-sm btn-primary text-white">
								Verify now via email OTP
							</button>
						)}
					</div>

					<div className="flex justify-between items-center p-4 border rounded-lg">
						<div>
							<p className="text-sm text-gray-500">Joined On</p>
							<p className="font-medium">
								{(user?.createdAt &&
									new Date(user.createdAt).toLocaleDateString("en-US", {
										year: "numeric",
										month: "long",
										day: "numeric",
									})) ||
									"N/A"}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
