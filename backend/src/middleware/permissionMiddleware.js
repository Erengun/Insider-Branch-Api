const { Role } = require("@prisma/client");
const logger = require("../utils/logger");

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