//* src/app.js

import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";

import connectToDB from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";

import deleteUnverifiedAccounts from "./utils/deleteUnverifiedAccounts.js";

import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env.js";

import errorMiddleware from "./middlewares/error.middleware.js";
import globalRateLimiter from "./middlewares/rateLimit.middleware.js";

const app = express();
app.set("trust proxy", 1);

//* ==========================================
//* 🔌 Core Middleware
//* ==========================================

// ---- Security Middleware ----
app.use(helmet());
app.use(compression());

// ---- Logger Middleware ----
app.use(morgan("dev"));

// ---- CORS Middleware ----
// Allow requests from frontend origin and credentials
app.use(
	cors({
		origin: [APP_ORIGIN],
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);

// ---- Rate Limit Middleware ----
app.use(globalRateLimiter);

// ---- Body Parser ----
// Parse JSON and URL-encoded data from the request body
app.use(express.json({ limit: "1mb" }));
app.use(
	express.urlencoded({
		extended: true,
		limit: "1mb",
	})
);

// ---- Cookie Parser ----
// Read cookies from the request headers
app.use(cookieParser());

//* ==========================================
//* 🏠 Health & Home
//* ==========================================

// ---- Health Check ----
app.get("/health", (req, res) => {
	res.status(200).json({
		success: true,
		env: NODE_ENV,
		message: "Healthy 🏥",
	});
});

// ---- Home Route ----
app.get("/", (req, res) => {
	return res.status(200).json({
		success: true,
		message: "Welcome to the Auth System API",
	});
});

//* ==========================================
//* 📦 Request Logger
//* ==========================================
app.use((req, res, next) => {
	if (NODE_ENV === "development") {
		console.log(
			`Request Method: ${req.method}`,
			`URL: ${req.url}`,
			`Headers: ${JSON.stringify(req.headers)}`,
			`Body: ${JSON.stringify(req.body)}`
		);
	} else {
		console.log(`Request: ${req.method} ${req.url} - ip: ${req.ip}`);
	}
	next();
});

//* ==========================================
//* 🚦 API Routes
//* ==========================================

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

//* ==========================================
//* 🚨 404 + Error Handling
//* ==========================================

app.use((req, res, next) => {
	res.status(404).json({
		success: false,
		message: "Route not found",
	});
});

app.use(errorMiddleware);

//* ==========================================
//* 🚀 Server Initialization
//* ==========================================

const startServer = async () => {
	try {
		await connectToDB();
		console.log("✅ Database connected successfully");

		// Run background cleanup
		try {
			deleteUnverifiedAccounts();
		} catch (error) {
			console.error("Cleanup job failed at startup: ", error?.message || error);
		}

		app.listen(PORT, async () => {
			console.log(
				`🚀 Server is running on http://localhost:${PORT} in ${NODE_ENV} environment.`
			);
		});
	} catch (error) {
		console.error(`❌ Failed to start server: ${error}`);
		process.exit(1);
	}
};

startServer();
