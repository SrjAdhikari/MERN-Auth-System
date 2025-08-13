//* src/utils/sendMail.js

import nodemailer from "nodemailer";
import {
	SMTP_EMAIL,
	SMTP_HOST,
	SMTP_PASSWORD,
	SMTP_PORT,
	SMTP_SERVICE,
} from "../constants/env.js";

// ✅ Function to send email to user
const sendMail = async ({ email, subject, message }) => {
	// 1. Create a transporter
	const transporter = nodemailer.createTransport({
		host: SMTP_HOST,
		service: SMTP_SERVICE,
		port: SMTP_PORT,
		auth: {
			user: SMTP_EMAIL,
			pass: SMTP_PASSWORD,
		},
	});

	// Mail options to send email
	const mailOptions = {
		from: SMTP_EMAIL,
		to: email,
		subject,
		html: message,
	};

	// 2. Send email to user
	await transporter.sendMail(mailOptions);
};

export default sendMail;
