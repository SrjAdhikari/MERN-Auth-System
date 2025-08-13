//* src/utils/sendResetLink.js

import { getPasswordResetTemplate } from "./emailTemplates.js";
import sendMail from "./sendMail.js";

const sendResetLink = async (resetURL, name, email) => {
	// HTML message to send
	const message = getPasswordResetTemplate(resetURL, name);

	// Send the email
	await sendMail({ email, subject: "Password Reset Request", message });
};

export default sendResetLink;
