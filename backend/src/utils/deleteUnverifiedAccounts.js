//* src/utils/deleteUnverifiedAccounts.js

import cron from "node-cron";
import User from "../models/user.model.js";

// ✅ Function to delete unverified accounts older than 30 minutes
const deleteUnverifiedAccounts = () => {
	// Time interval that the cron job will run
	const intervalMinutes = 30;

	// Cron job schedule to run every 30 minutes
	const schedule = `*/${intervalMinutes} * * * *`;

	// Register the cron job
	cron.schedule(schedule, async () => {
		try {
			// Calculate the cut-off time
			const cutOffTime = new Date(Date.now() - intervalMinutes * 60 * 1000);

			// Delete unverified accounts older than the cut-off time
			const { deletedCount } = await User.deleteMany({
				verified: false,
				createdAt: { $lt: cutOffTime },
			});

			// Log the number of deleted accounts if any were deleted
			if (deletedCount && deletedCount > 0) {
				console.log(
					`🧹 Deleted ${deletedCount} unverified account(s) older than ${intervalMinutes}m`
				);
			}
		} catch (error) {
			// Log any errors that occur during the cron job
			console.error(
				"❌ Unverified cleanup job failed:",
				error?.message || error
			);
		}
	});
};

export default deleteUnverifiedAccounts;
