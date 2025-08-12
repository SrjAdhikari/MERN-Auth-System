//* src/middlewares/error.middleware.js

//* ===========================
//* ✅ ERROR CLASS
//* ===========================

export class AppError extends Error {
	constructor(statusCode, message) {
		super(message);
		this.statusCode = statusCode;
	}
}

//* ===========================
//* ✅ ERROR MIDDLEWARE
//* ===========================

const errorMiddleware = (err, req, res, next) => {
	try {
		// 1. Set Default error response values
		err.statusCode = err.statusCode || 500;
		err.message = err.message || "Internal Server Error";

		// 2. Handle Mongoose invalid ObjectId / cast errors
		if (err.name === "CastError") {
			const message = `Resource not found. Invalid: ${err.path}`;
			err = new AppError(404, message);
		}

		// 3. Handle Mongoose validation errors
		if (err.name === "ValidationError") {
			// Extract all validation error messages and combine them into one string
			const message = Object.values(err.errors)
				.map((val) => val.message)
				.join(", ");

			err = new AppError(400, message);
		}

		// 4. Handle Mongoose duplicate key errors
		if (err.code === 11000) {
			const message = `Duplicate ${Object.keys(err.keyValue)} entered.`;
			err = new AppError(400, message);
		}

		// 5. Handle JsonWebToken errors
		if (err.name === "JsonWebTokenError") {
			const message = "Invalid token. Please try again.";
			err = new AppError(401, message);
		}

		// 6. Handle JsonWebToken expired errors
		if (err.name === "TokenExpiredError") {
			const message = "Your token has expired. Please try again.";
			err = new AppError(401, message);
		}

		// Error logging for development
		console.error(`[${new Date().toISOString()}]`, {
			name: err.name,
			message: err.message,
			statusCode: err.statusCode,
			stack: err.stack,
			path: err.path,
		});

		// 7. Send error response
		return res.status(err.statusCode).json({
			success: false,
			message: err.message,
		});
	} catch (error) {
		next(error);
	}
};

export default errorMiddleware;
