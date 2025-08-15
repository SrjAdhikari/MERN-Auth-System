//* src/routes/ProtectedRoute.jsx

import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

/**
 * Guards private routes.
 * If user is not authenticated, send the user to login.
 */
const ProtectedRoute = () => {
	const { isAuthenticated } = useAuth();

	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	return <Outlet />;
};

export default ProtectedRoute;
