//* src/constants/env.js

import { config } from "dotenv";

// Load variables from `.env` (default path). If you keep secrets elsewhere, pass { path: "..." }.
config();

// Function to fetch an env variable.
const getEnv = (key) => {
	const value = process.env[key];
	if (!value) {
		throw new Error(`Missing environment variable: ${key}`);
	}

	return value;
};

// ---- Basic environment ----
export const NODE_ENV = getEnv("NODE_ENV");
export const PORT = getEnv("PORT");

// ---- Origins ----
export const APP_ORIGIN = getEnv("APP_ORIGIN");

// ---- Database ----
export const MONGO_URI = getEnv("MONGO_URI");

// ---- JWT & Cookies ----
export const JWT_ACCESS_SECRET = getEnv("JWT_ACCESS_SECRET");
export const JWT_REFRESH_SECRET = getEnv("JWT_REFRESH_SECRET");
export const JWT_EXPIRES_IN = getEnv("JWT_EXPIRES_IN");
export const COOKIE_EXPIRES_IN = getEnv("COOKIE_EXPIRES_IN");

// ---- SMTP ----
export const SMTP_HOST = getEnv("SMTP_HOST");
export const SMTP_SERVICE = getEnv("SMTP_SERVICE");
export const SMTP_PORT = getEnv("SMTP_PORT");
export const SMTP_EMAIL = getEnv("SMTP_EMAIL");
export const SMTP_PASSWORD = getEnv("SMTP_PASSWORD");
