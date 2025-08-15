//* src/routes/AuthRoute.jsx

import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

/**
 * Blocks auth pages (login/register/verify/forgot/reset)
 * when the user is already authenticated.
 */
const AuthRoute = () => {
	const { isAuthenticated } = useAuth();
	if (isAuthenticated) {
		return <Navigate to="/profile" replace />;
	}

	return <Outlet />;
};

export default AuthRoute;
