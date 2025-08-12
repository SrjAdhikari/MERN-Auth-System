//* src/services/auth.service.js

import crypto from "crypto";
import User from "../models/user.model.js";
import { AppError } from "../middlewares/error.middleware.js";
import sendOTPCode from "../utils/sendOTP.js";
import { APP_ORIGIN } from "../constants/env.js";
import sendResetLink from "../utils/sendResetLink.js";

//* ===========================
//* ✅ REGISTER USER SERVICE
//* ===========================
export const registerUserService = async ({ name, email, password }) => {
	// 1. Validate user input
	if (!name || !email || !password) {
		throw new AppError(400, "All fields are required");
	}

	// 2. Check if a verified account already exists for this email
	const existingUser = await User.findOne({
		email,
		verified: true,
	});

	if (existingUser) {
		throw new AppError(400, "User already exists");
	}

	// 3. Limit repeated unverified registration attempts
	const attempts = await User.find({
		email,
		verified: false,
	});

	if (attempts.length >= 3) {
		throw new AppError(
			400,
			"You have exceeded the maximum number of registration attempts (3). Please try again after an hour."
		);
	}

	// 4. Create new user
	const user = await User.create({
		name,
		email,
		password,
	});

	// 5. Generate an OTP + expiry, then save user
	const otp = user.generateOTPCode();
	await user.save();

	// 6. Send verification code to user
	await sendOTPCode(otp, name, email);
};

//* ===========================
//* ✅ VERIFY OTP SERVICE
//* ===========================
export const verifyOTPService = async ({ email, verificationCode: otp }) => {
	// 1. Validate user input
	if (!email || !otp) {
		throw new AppError(400, "Email and OTP code are required");
	}

	// 2. Grab all unverified entries for this email, sorted by creation date
	const userAllEntries = await User.find({
		email,
		verified: false,
	}).sort({ createdAt: -1 });

	if (!userAllEntries.length) {
		throw new AppError(404, "User not found");
	}

	// 3. Use the most recent entry as the user
	const user = userAllEntries[0];

	// 4. Delete all other unverified entries for this email
	if (userAllEntries.length > 1) {
		await User.deleteMany({
			_id: { $ne: user._id },
			email,
			verified: false,
		});
	}

	// 5. Validate OTP code
	if (user.verificationCode !== Number(otp)) {
		throw new AppError(400, "Invalid OTP code");
	}

	// 6. Validate OTP code expiry
	const now = Date.now();
	const otpExpiry = new Date(user.verificationCodeExpiry).getTime();

	if (now > otpExpiry) {
		throw new AppError(400, "OTP code has expired");
	}

	// 7. Mark user as verified and delete verification code and expiry
	user.verified = true;
	user.verificationCode = undefined;
	user.verificationCodeExpiry = undefined;

	// 8. Save user
	await user.save();

	// 9. return user because controller will issue token via sendToken(user, ...)
	return user;
};

//* ===========================
//* ✅ LOGIN USER SERVICE
//* ===========================
export const loginUserService = async ({ email, password }) => {
	// 1. Validate user input
	if (!email || !password) {
		throw new AppError(400, "Email and password are required");
	}

	// 2. Check if a verified account exists for this email
	const user = await User.findOne({ email, verified: true }).select(
		"+password"
	);

	if (!user) {
		throw new AppError(404, "Invalid credentials");
	}

	// 3. Check if password is correct for this user
	const isPasswordCorrect = await user.comparePassword(password);
	if (!isPasswordCorrect) {
		throw new AppError(400, "Invalid credentials");
	}

	// 4. return user because controller will set token via sendToken(user, ...)
	return user;
};

//* ===========================
//* ✅ FORGOT PASSWORD SERVICE
//* ===========================
export const forgotPasswordService = async ({ email }) => {
	// 1. Validate user input
	if (!email) {
		throw new AppError(400, "Email is required");
	}

	// 2. Check if a verified account exists for this email
	const user = await User.findOne({ email, verified: true });

	// 3. If user exists, generate reset password token
	if (user) {
		try {
			const resetPasswordToken = await user.generateResetPasswordToken();
			console.log(`🔑 Reset password token: ${resetPasswordToken}`);
			await user.save({ validateBeforeSave: false });

			// 4. Create reset password link
			const resetPasswordUrl = `${APP_ORIGIN}/password/reset/${resetPasswordToken}`;

			// 5. Send reset password link to user
			sendResetLink(resetPasswordUrl, user.name, email);
		} catch (error) {
			// 6. Clean token fields if email fails to send
			user.resetPasswordToken = undefined;
			user.resetPasswordTokenExpiry = undefined;
			await user.save({ validateBeforeSave: false });

			console.error(
				"Forgot password email failed to send: ",
				error?.message || error
			);
		}
	} else {
		throw new AppError(404, "User not found");
	}
};

//* ===========================
//* ✅ RESET PASSWORD SERVICE
//* ===========================
export const resetPasswordService = async ({
	token,
	password,
	confirmPassword,
}) => {
	// 1. Validate user input
	if (!token) {
		throw new AppError(400, "Reset token is required");
	}

	if (!password || !confirmPassword) {
		throw new AppError(400, "Password and confirm password are required");
	}

	// 2. Check if password and confirm password match
	if (password !== confirmPassword) {
		throw new AppError(400, "Passwords do not match");
	}

	// 3. Hash the incoming token to compare with stored hash
	const resetPasswordToken = crypto
		.createHash("sha256")
		.update(token)
		.digest("hex");

	// 4. Check if a user exists with this token & hasn't expired
	const user = await User.findOne({
		resetPasswordToken,
		resetPasswordTokenExpiry: { $gt: Date.now() },
	});

	if (!user) {
		throw new AppError(400, "Reset password token is invalid or expired.");
	}

	// 5. Update password and clear reset fields
	user.password = password;
	user.resetPasswordToken = undefined;
	user.resetPasswordTokenExpiry = undefined;

	// 6. Save user
	await user.save();

	// 7. return user because controller will issue token via sendToken(user, ...)
	return user;
};
