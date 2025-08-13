//* src/utils/sendOTP.js

import { getVerifyEmailTemplate } from "./emailTemplates.js";
import sendMail from "./sendMail.js";

const sendOTPCode = async (verificationCode, name, email) => {
	// HTML message to send
	const message = getVerifyEmailTemplate(verificationCode, name);

	// Send the email
	await sendMail({ email, subject: "Verify Your Account", message });
};

export default sendOTPCode;
