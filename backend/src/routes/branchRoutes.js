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

// List all branches (Everyone)
router.get('/', asyncMiddleware(listBranches));

// Update branch details
router.put('/:id', asyncMiddleware(editBranchDetails));

// Delete branch
router.delete('/:id', asyncMiddleware(removeBranch));

// View branch details
//router.get('/:id', asyncMiddleware(viewBranchDetails));

// Edit branch details (Owners only)
//router.put('/:id', asyncMiddleware(editBranchDetails));

module.exports = router;
