/**
 * Express router for branch routes.
 * @module branchRoutes
 */

const express = require('express');
const { listBranches, editBranchDetails, removeBranch, addBranch } = require('../controllers/branchController');
const authMiddleware = require('../middleware/authMiddleware');
const asyncMiddleware = require('../middleware/asyncMiddleware');
const permissionMiddleware = require('../middleware/permissionMiddleware');

const router = express.Router();

// Guard route
router.use(authMiddleware);

// Permission middleware
router.use(permissionMiddleware);

/**
 * Route to list all branches.
 * @name GET /
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
router.get('/', asyncMiddleware(listBranches));

/**
 * Route to update branch details.
 * @name PUT /:id
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
router.put('/:id', asyncMiddleware(editBranchDetails));

/**
 * Route to delete a branch.
 * @name DELETE /:id
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
router.delete('/:id', asyncMiddleware(removeBranch));

module.exports = router;
