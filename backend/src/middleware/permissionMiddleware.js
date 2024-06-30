/**
 * Middleware function to check user permissions.
 * Throws an error if the user is not authorized or does not have the required role.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @throws {Object} - Throws an error object with a message and status if the user is not authorized.
 */
const { Role } = require("@prisma/client");

module.exports = (req, res, next) => {
	if (!req.user) {
		throw {
			message: "Not authorized",
			status: 403
		}
	}
	// Check for owner role and restrict access to certain routes
	if (['POST', 'PUT'].includes(req.method)) {
		if (req.user.role !== Role.OWNER) {
			// Stop execution if the user is not an owner
			throw {
				message: 'Not authorized. Only owners can perform this action.',
				status: 403
			}
		}
	}
	next();
};