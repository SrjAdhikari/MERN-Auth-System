//* src/middlewares/auth.middleware.js

import jwt from "jsonwebtoken";
import catchErrors from "../utils/catchErrors.js";
import { AppError } from "./error.middleware.js";
import User from "../models/user.model.js";
import { JWT_ACCESS_SECRET } from "../constants/env.js";

//* ===========================
//* ✅ AUTHENTICATE MIDDLEWARE
//* ===========================

// ✅ Function to extract a token either from headers or cookies
const getTokenFromRequest = (req) => {
	// 1. Cookie strategy
	if (req.cookies && req.cookies?.token) {
		return req.cookies.token;
	}

	// 2. Header strategy
	const auth = req.headers?.authorization || "";
	if (auth.startsWith("Bearer ")) {
		return auth.slice("Bearer ".length).trim();
	}

	return null;
};

const authenticate = catchErrors(async (req, res, next) => {
	// 1. Get token from cookie or Authorization header
	const token = getTokenFromRequest(req);
	if (!token) {
		return next(new AppError(401, "Unauthorized"));
	}

	// 2. Verify and decode the JWT token
	let decoded;
	try {
		decoded = jwt.verify(token, JWT_ACCESS_SECRET);
	} catch (error) {
		if (error.name === "TokenExpiredError") {
			return next(new AppError(401, "Unauthorized"));
		}
		return next(new AppError(401, "Unauthorized"));
	}

	// 3. Get user from decoded token
	const userId = decoded?.userId;
	if (!userId) {
		return next(new AppError(401, "Unauthorized"));
	}

	// 4. Get user from database and exclude sensitive fields
	const user = await User.findById(userId).select(
		"-password -resetPasswordToken -resetPasswordTokenExpiry -verificationCode -verificationCodeExpiry"
	);

	if (!user) {
		return next(new AppError(401, "Unauthorized"));
	}

	// 5. Attach sanitized user to the request
	req.user = user;

	// 6. Call next middleware
	next();
});

export default authenticate;
