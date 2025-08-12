//* src/controller/user.controller.js

import catchErrors from "../utils/catchErrors.js";

//* ===========================
//* ✅ GET USER CONTROLLER
//* GET /api/v1/users/me
//* ===========================

export const getUser = catchErrors(async (req, res, next) => {
	// 1. Get user from request and check if it exists
	const user = req.user;
	if (!user) {
		return next(new AppError(404, "User not found"));
	}

	// 2. Send response if user exists
	res.status(200).json({
		success: true,
		user,
	});
});
