//* src/routes/auth.route.js

import { Router } from "express";
import {
	forgotPassword,
	login,
	logout,
	register,
	resetPassword,
	verifyOtp,
} from "../controllers/auth.controller.js";

// Auth guard to protect routes that require a logged-in user
import authenticate from "../middlewares/auth.middleware.js";

//* ==========================================
//* 🔐 AUTH ROUTER - HANDLES AUTH ENDPOINTS
//* ✅ BASE ROUTE : /api/v1/auth
//* ==========================================

// Create a new instance of the Express Router
const authRouter = Router();

// ✅ Register a new user
authRouter.post("/register", register);

// ✅ Verify the OTP sent during registration
authRouter.post("/verify-otp", verifyOtp);

// ✅ Log a user in
authRouter.post("/login", login);

// ✅ Log the user out
authRouter.post("/logout", authenticate, logout);

// ✅ Send forgot password link via email
authRouter.post("/password/forgot", forgotPassword);

// ✅ Reset password using token
authRouter.put("/password/reset/:token", resetPassword);

export default authRouter;
