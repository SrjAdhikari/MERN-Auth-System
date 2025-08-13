//* src/utils/sendToken.js

import { COOKIE_EXPIRES_IN } from "../constants/env.js";

// ✅ Constants
const cookieExpiryTime = COOKIE_EXPIRES_IN;
const cookieExpiryDate = new Date(
	Date.now() + cookieExpiryTime * 24 * 60 * 60 * 1000
);

// ✅ Function to Send token to user
const sendToken = (user, statusCode, message, res) => {
	// 1. Generate token
	const token = user.generateToken();

	// 2. Send token in cookie
	res.cookie("token", token, {
		expires: cookieExpiryDate,
		httpOnly: true,
	});

	// 3. Send response
	return res.status(statusCode).json({
		success: true,
		message,
		token,
		user: {
			_id: user._id,
			name: user.name,
			email: user.email,
			verified: user.verified,
			createdAt: user.createdAt,
		},
	});
};

export default sendToken;
