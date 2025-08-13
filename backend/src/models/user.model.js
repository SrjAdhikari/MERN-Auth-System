//* src/models/user.model.js

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { JWT_ACCESS_SECRET, JWT_EXPIRES_IN } from "../constants/env.js";

const { Schema } = mongoose;
const userSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Name is required"],
			trim: true,
			minlength: [2, "Name must be at least 2 characters"],
			maxlength: [50, "Name must be at most 50 characters"],
		},

		email: {
			type: String,
			required: [true, "Email is required"],
			trim: true,
			lowercase: true,
			match: [
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
				"Please provide a valid email",
			],
		},

		password: {
			type: String,
			required: [true, "Password is required"],
			minLength: [8, "Password must be at least 8 characters"],
			select: false,
		},

		verified: {
			type: Boolean,
			default: false,
			index: true,
		},

		verificationCode: {
			type: Number,
		},

		verificationCodeExpiry: {
			type: Date,
		},

		resetPasswordToken: {
			type: String,
		},

		resetPasswordTokenExpiry: {
			type: Date,
		},
	},
	{ timestamps: true }
);

// ✅ Encrypt password before saving to database
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		return next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);

	next();
});

// ✅ Compare incoming password with hashed password
userSchema.methods.comparePassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

// ✅ Generate a 5-digit verification code
userSchema.methods.generateOTPCode = function () {
	const firstDigit = Math.floor(Math.random() * 9) + 1;
	const remainingDigits = Math.floor(Math.random() * 10000)
		.toString()
		.padStart(4, "0");
	const verificationCode = Number(`${firstDigit}${remainingDigits}`);

	this.verificationCode = verificationCode;
	this.verificationCodeExpiry = Date.now() + 5 * 60 * 1000;

	return verificationCode;
};

// ✅ Generate a signed JWT access token with { userId }
userSchema.methods.generateToken = function () {
	const token = jwt.sign({ userId: this._id }, JWT_ACCESS_SECRET, {
		expiresIn: JWT_EXPIRES_IN,
	});

	return token;
};

// ✅ Generate a password reset token
userSchema.methods.generateResetPasswordToken = function () {
	// Generate a 20-byte random string (40 hex characters)
	const resetToken = crypto.randomBytes(20).toString("hex");

	// Hash the reset token
	const hasedResetToken = crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex");

	// Store the hashed reset token in the database
	this.resetPasswordToken = hasedResetToken;
	this.resetPasswordTokenExpiry = Date.now() + 15 * 60 * 1000;

	return resetToken;
};

const User = mongoose.model("user", userSchema);

export default User;
