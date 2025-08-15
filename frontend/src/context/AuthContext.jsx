//* src/context/AuthContext.jsx

import { createContext, useContext, useMemo, useState } from "react";

// Create the context
export const AuthContext = createContext(null);

// Create the provider component that holds global auth state
export const AuthContextProvider = ({ children }) => {
	// user: { id, name, email, verified } | null
	const [user, setUser] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	// Memoize the value so consumers don't re-render unnecessarily
	const value = useMemo(() => {
		return {
			user,
			isAuthenticated,
			setUser,
			setIsAuthenticated,
		};
	}, [user, isAuthenticated]);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Create a custom hook to access the auth context
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within a <AuthContextProvider>");
	}

	return context;
};
