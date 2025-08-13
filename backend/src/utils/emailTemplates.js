//* src/utils/emailTemplates.js

export const getVerifyEmailTemplate = (verificationCode, name) => {
	return `
  <!doctype html>
  <html lang="en-US">
    <head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
    <title>Reset Password Email Template</title>
    <meta name="description" content="Reset Password Email Template.">
    <style type="text/css">a:hover{text-decoration:underline!important}</style>
    </head>

    <body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #f4f4f4;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <tr>
        <td style="padding: 40px 20px; text-align: center;">
          <h1 style="color: #333333; font-size: 24px; margin: 0 0 20px;">Verify Your Account</h1>
          <p style="color: #666666; font-size: 16px; line-height: 1.5; margin: 0 0 20px;">
            Hello, ${name},
          </p>
          <p style="color: #666666; font-size: 16px; line-height: 1.5; margin: 0 0 20px;">
            Thank you for signing up! Please use the following verification code to complete your registration:
          </p>
          <div style="background-color: #f0f0f0; display: inline-block; padding: 15px 30px; border-radius: 5px; margin: 20px 0;">
            <span style="color: #333333; font-size: 24px; font-weight: bold; letter-spacing: 2px;">${verificationCode}</span>
          </div>
          <p style="color: #666666; font-size: 16px; line-height: 1.5; margin: 0 0 20px;">
            This code is valid for the next 5 minutes. If you didn't request this code, please ignore this email.
          </p>
        </td>
      </tr>
      <tr>
        <td style="background-color: #f4f4f4; text-align: center; padding: 20px; color: #999999; font-size: 12px;">
          <p style="margin: 0;">
            This is an automated email. Please do not reply to this email.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};

export const getPasswordResetTemplate = (resetUrl, name) => {
	return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; }
      a { color: #007bff; text-decoration: none; }
      .footer { font-size: 12px; color: #777; margin-top: 20px; }
    </style>
  </head>

  <body>
    <div class="container">
      <h1>Password Reset Request</h1>
      <p>Hello ${name},</p>
      <p>You requested a password reset for your account. Please click the link below to reset your password:</p>
      <p><a href="${resetUrl}">Reset Password</a></p>
      <p><strong>Note:</strong> This link will expire in 10 minutes. If you didn't request this, please ignore this email or contact support.</p>
      <div class="footer">
        <p>Best regards,<br>Auth System Team</p>
      </div>
    </div>
  </body>
</html>`;
};
