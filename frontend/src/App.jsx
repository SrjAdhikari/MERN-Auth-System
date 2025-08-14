//* src/App.jsx

import { Routes, Route } from "react-router";
import { useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { getUser } from "./api/authApi";

// Route guards
import AuthRoute from "./routes/AuthRoute";
import ProtectedRoute from "./routes/ProtectedRoute";

// Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import VerifyOtp from "./pages/auth/VerifyOtp";
import Profile from "./pages/user/Profile";
import NotFound from "./pages/error/NotFound";

const App = () => {
	const { setIsAuthenticated, setUser } = useAuth();

	// On app mount we restore the session by calling /users/me.
	// This is to prevent the user from being redirected to the login page when they refresh the page
	useEffect(() => {
		const fetchUser = async () => {
			try {
				// 🍪 Sends cookie with axios (withCredentials) and receives user if valid
				const response = await getUser();
				setUser(response?.data?.user);
				setIsAuthenticated(true);
			} catch (error) {
				setIsAuthenticated(false);
				setUser(null);
			}
		};

		fetchUser();
	}, []);

	return (
		<Routes>
			{/* Public-only routes (blocked if already authenticated) */}
			<Route element={<AuthRoute />}>
				<Route index element={<Login />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/password/forgot" element={<ForgotPassword />} />
				<Route path="/password/reset/:token" element={<ResetPassword />} />
				<Route path="/otp/verification/:email" element={<VerifyOtp />} />
			</Route>

			{/* Protected routes (must be authenticated) */}
			<Route element={<ProtectedRoute />}>
				<Route path="/profile" element={<Profile />} />
			</Route>

			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default App;
