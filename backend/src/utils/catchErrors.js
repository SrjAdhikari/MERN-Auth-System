//* src/utils/catchErrors.js

/**
 * Wraps async route handlers/controllers so that
 * any error is automatically passed to Express's `next()` function.
 * Without this, you'd have to write try/catch in every controller.
 *
 * Usage:
 *   router.get("/user/:id", catchErrors(async (req, res) => {
 *     const user = await User.findById(req.params.id);
 *     res.json(user);
 *   }));
 *
 * @param {Function} controller - An async Express route handler (req, res, next)
 * @returns {Function} A new function that handles errors automatically
 */
const catchErrors = (controller) => {
	return (req, res, next) => {
		// Wrap the controller in Promise.resolve so async errors are caught
		Promise.resolve(controller(req, res, next)).catch(next);
	};
};

export default catchErrors;
