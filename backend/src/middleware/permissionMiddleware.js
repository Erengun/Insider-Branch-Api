const { Role } = require("@prisma/client");

module.exports = (req, res, next) => {
	if (!req.user) {
		res.status(403);
		throw new Error('Not authorized');
	}
	// Check for owner role and restrict access to certain routes
	if (['POST', 'PUT'].includes(req.method)) {
			if (req.user.role !== Role.OWNER) {
				res.status(403).send('Not authorized. Only owners can perform this action.');
				return; // Stop execution if the user is not an owner
			}
	}
	next();
};