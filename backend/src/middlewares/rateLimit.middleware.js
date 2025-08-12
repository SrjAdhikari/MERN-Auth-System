//* src/middlewares/rateLimit.middleware.js

import rateLimit from "express-rate-limit";

/**
 * Global limiter: applies to every request.
 *
 * Options:
 * - windowMs: time window for counting requests (e.g., 1 minute)
 * - max: max requests per IP per window
 * - standardHeaders: include rate limit info in the `RateLimit-*` headers
 * - legacyHeaders: include rate limit info in the `X-RateLimit-*` headers
 */

const globalRateLimiter = rateLimit({
	windowMs: 60 * 1000,
	max: 120,
	standardHeaders: true,
	legacyHeaders: false,
	message: {
		success: false,
		message: "Too many requests. Please slow down and try again shortly.",
	},
});

export default globalRateLimiter;
