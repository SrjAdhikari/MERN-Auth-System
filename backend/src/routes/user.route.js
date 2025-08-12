//* src/routes/user.route.js

import { Router } from "express";
import { getUser } from "../controllers/user.controller.js";
import authenticate from "../middlewares/auth.middleware.js";

//* ==========================================
//* 🔐 USER ROUTER - HANDLES USER ENDPOINTS
//* ✅ BASE ROUTE : /api/v1/users
//* ==========================================

// Create a new instance of the Express Router
const userRouter = Router();

// ✅ Get the currently authenticated user
userRouter.get("/me", authenticate, getUser);

export default userRouter;
