# MERN Authentication System - Backend

<div align="center">  
  <div>
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
    <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
    <img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white" alt="Mongoose" />
    <img src="https://img.shields.io/badge/jsonwebtoken-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="jsonwebtoken" />
    <img src="https://img.shields.io/badge/bcrypt-003087?style=for-the-badge&logo=security&logoColor=white" alt="bcrypt" />
    <img src="https://img.shields.io/badge/Nodemailer-31B032?style=for-the-badge&logo=nodemailer&logoColor=white" alt="Nodemailer" />
  </div>
</div>

---

A secure and production-ready backend for a MERN Authentication System built with Node.js, Express, and MongoDB. It provides robust authentication features with a focus on scalability, maintainability, and security.

---

### 🚀 Features

- **User Registration with OTP**: Register users and verify emails via one-time passwords (OTPs).
- **Secure Login with JWT**: Authenticate users with JWT access tokens stored in HttpOnly cookies.
- **Password Reset Flow**: Request and reset passwords using secure email links.
- **Protected Routes**: Restrict access to authenticated users only.
- **Cron Job Cleanup**: Automatically delete unverified accounts older than 30 minutes.
- **Secure Middleware**: Rate limiting, security headers, and centralized error handling.
- **Nodemailer Integration**: Send emails for OTPs and password resets with customizable HTML templates.
- **Scalable Architecture**: Modular structure for easy extension.

---

### 🛠️ Tech Stack

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework for RESTful APIs
- **MongoDB + Mongoose**: NoSQL database and ODM
- **jsonwebtoken**: JWT generation and verification
- **Nodemailer**: Email sending for OTP and password reset
- **cookie-parser**: Secure cookie handling (HttpOnly, Secure, SameSite)
- **bcrypt**: Password hashing
- **dotenv**: Environment variable management
- **helmet**: Security headers
- **cors**: Cross-origin resource sharing
- **morgan**: Request logging
- **compression**: Response compression
- **node-cron**: Scheduled tasks

---

### 📂 Folder Structure

```
src/
├── config/                   # Database and service configurations
│   └── db.js                 # MongoDB connection setup
├── constants/                # Environment variables and constants
│   └── env.js
├── controllers/              # Request handlers for API routes
│   ├── auth.controller.js
│   └── user.controller.js
├── middlewares/              # Custom middleware for auth, errors, and rate limiting
│   ├── auth.middleware.js
│   ├── error.middleware.js
│   └── rateLimit.middleware.js
├── models/                   # Mongoose schemas
│   └── user.model.js
├── routes/                   # API route definitions
│   ├── auth.route.js
│   └── user.route.js
├── services/                 # Business logic (e.g., email sending, token generation)
│   └── auth.service.js
├── utils/                    # Utility functions for common tasks
│   ├── catchErrors.js
│   ├── deleteUnverifiedAccounts.js
│   ├── emailTemplates.js
│   ├── sendMail.js
│   ├── sendOTP.js
│   ├── sendResetLink.js
│   └── sendToken.js
└── app.js
```

---

### 🔐 Environment Variables

Create a `.env` file in the root of the backend folder:

```env
# Server port (default: 4000)
PORT=4000

# Environment mode (development/production)
NODE_ENV=development

# Frontend URL for CORS
APP_ORIGIN=http://localhost:5173

# MongoDB connection string
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/db_name?retryWrites=true&w=majority

# JWT secret (use a strong, unique key, e.g., generated via `crypto.randomBytes(32).toString('hex')`)
JWT_ACCESS_SECRET=your-strong-secret-key
JWT_EXPIRES_IN=7d

# Cookie expiration (in days)
COOKIE_EXPIRES_IN=7d

# SMTP settings for Nodemailer
SMTP_HOST=smtp.gmail.com
SMTP_SERVICE=gmail
SMTP_PORT=465
SMTP_EMAIL=your_email@gmail.com
SMTP_PASSWORD=your-app-password

```

### 📮 API Endpoints

1. **Auth Routes (`/api/v1/auth`)**

- `POST /register` → Register a new user and send OTP
  - Body: `{ "name": "string", "email": "string", "password": "string" }`
  - Response: `{ "success": true, "message": "OTP has been sent to your email address. Please verify your account." }`
- `POST /verify-otp` → Verify email OTP
  - Body: `{ "email": "string", "otp": "string" }`
  - Response: `{ "success": true, "message": "Account verified successfully" }`
- `POST /login` → Login user and return JWT
  - Body: `{ "email": "string", "password": "string" }`
  - Response: `{ "success": true, "message": "Login successful" }` (sets HttpOnly cookie)
- `POST /logout` → Logout and invalidate token
  - Response: `{ "success": true, "message": "Logout successful" }`
- `POST /password/forgot` → Request password reset link
  - Body: `{ "email": "string" }`
  - Response: `{ "success": true, "message": "A password reset link has been sent to your email address. Please verify your account." }`
- `PUT /password/reset/:token` → Reset password
  - Body: `{ "password": "string" }`
  - Response: `{ "success": true, "message": "Password reset successfully" }`

2. **User Routes (`/api/v1/users`)**

- `GET /me` → Get current user’s profile
  - Headers: `Cookie: token=<jwt-token>`
  - Response: `{ "success": true, "user": { "email": "string", "name": "string", etc. } }`

---

### 🛡️ Security Best Practices

- **HttpOnly Cookies**: JWTs stored in HttpOnly, Secure, and SameSite=Strict cookies to prevent XSS and CSRF.
- **Password Hashing**: Passwords hashed with bcrypt (salt factor: 10).
- **Rate Limiting**: Applied via `rateLimit.middleware.js` to prevent brute-force attacks.
- **Security Headers**: `helmet` middleware for secure HTTP headers (e.g., XSS protection).
- **CORS**: Restricted to `APP_ORIGIN` with credential support.
- **Error Handling**: Centralized middleware for consistent error responses.

---
