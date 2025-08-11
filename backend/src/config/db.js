//* src/config/db.js

import mongoose from "mongoose";
import { MONGO_URI } from "../constants/env.js";

// ✅ Function to connect to the database.
const connectToDB = async () => {
	try {
		console.log("🔄️ Connecting to database...");
		await mongoose.connect(MONGO_URI);
	} catch (error) {
		console.log(`❌ Failed to connect to the database: ${error}`);
		process.exit(1);
	}
};

export default connectToDB;
