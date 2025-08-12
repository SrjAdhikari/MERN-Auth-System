//* src/controller/auth.controller.js

import {
	forgotPasswordService,
	loginUserService,
	registerUserService,
	resetPasswordService,
	verifyOTPService,
} from "../services/auth.service.js";
import catchErrors from "../utils/catchErrors.js";
import sendToken from "../utils/sendToken.js";

//* ===========================
//* ✅ REGISTER CONTROLLER
//* POST /api/v1/auth/register
//* ===========================

export const register = catchErrors(async (req, res) => {
	// Call the register service
	await registerUserService(req.body);

	// Send response to user
	return res.status(200).json({
		success: true,
		message: `OTP has been sent to your email address. Please verify your account.`,
	});
});

//* ===========================
//* ✅ VERIFY OTP CONTROLLER
//* POST /api/v1/auth/verify-otp
//* ===========================

export const verifyOtp = catchErrors(async (req, res) => {
	// Call the verifyOTP service
	const user = await verifyOTPService(req.body);

	// Send token to user
	sendToken(user, 200, "Account verified successfully", res);
});

//* ===========================
//* ✅ LOGIN CONTROLLER
//* POST /api/v1/auth/login
//* ===========================

export const login = catchErrors(async (req, res) => {
	// Call the login service
	const user = await loginUserService(req.body);

	// Send token to user
	sendToken(user, 200, "Login successful", res);
});

//* ===========================
//* ✅ LOGOUT CONTROLLER
//* GET /api/v1/auth/logout
//* ===========================

export const logout = catchErrors(async (req, res) => {
	// 1. Clear the cookie named "token"
	res.cookie("token", "", {
		expires: new Date(Date.now()),
		httpOnly: true,
	});

	// 2. Send response to user
	return res.status(200).json({
		success: true,
		message: "Logout successful",
	});
});

//* ===========================
//* ✅ FORGOT PASSWORD CONTROLLER
//* POST /api/v1/auth/password/forgot
//* ===========================

export const forgotPassword = catchErrors(async (req, res) => {
	// Call the forgot password service
	await forgotPasswordService(req.body);

	return res.status(200).json({
		success: true,
		message:
			"A password reset link has been sent to your email address. Please verify your account.",
	});
});

//* ===========================
//* ✅ RESET PASSWORD CONTROLLER
//* POST api/v1/auth/password/reset/:token
//* ===========================

export const resetPassword = catchErrors(async (req, res) => {
	// Call the reset password service
	const user = await resetPasswordService({
		token: req.params?.token,
		password: req.body?.password,
		confirmPassword: req.body?.confirmPassword,
	});

	// Send token to user
	sendToken(user, 200, "Password reset successfully", res);
});
