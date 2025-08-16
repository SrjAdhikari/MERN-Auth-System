//* src/api/authApi.js

import axiosClient from "../config/axiosClient";

// ---- Auth actions ----
export const login = (email, password) => {
	return axiosClient.post("/auth/login", { email, password });
};

export const signup = (name, email, password) => {
	return axiosClient.post("/auth/register", { name, email, password });
};

// ---- Logout ----
export const logout = () => {
	return axiosClient.post("/auth/logout");
};

// ---- Verification / OTP ----
export const verifyOtp = (email, verificationCode) => {
	return axiosClient.post("/auth/verify-otp", {
		email,
		verificationCode,
	});
};

// ---- Password reset flow ----
export const forgotPassword = (email) => {
	return axiosClient.post("/auth/password/forgot", { email });
};

export const resetPassword = (token, password, confirmPassword) => {
	return axiosClient.put(`/auth/password/reset/${token}`, {
		password,
		confirmPassword,
	});
};

// ---- Session ----
export const getUser = () => {
	return axiosClient.get("/users/me");
};
