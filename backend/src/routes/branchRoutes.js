const express = require('express');
const { listBranches, editBranchDetails, removeBranch, addBranch } = require('../controllers/branchController');
const authMiddleware = require('../middleware/authMiddleware');
const asyncMiddleware = require('../middleware/asyncMiddleware');

const router = express.Router();

// Guard route
//router.use(authMiddleware);

// List all branches (Everyone)
router.get('/', asyncMiddleware(listBranches));

// Add new branch
router.post('/', asyncMiddleware(addBranch));

// Update branch details
router.put('/:id', asyncMiddleware(editBranchDetails));

// Delete branch
router.delete('/:id', asyncMiddleware(removeBranch));

// View branch details
//router.get('/:id', asyncMiddleware(viewBranchDetails));

// Edit branch details (Owners only)
//router.put('/:id', asyncMiddleware(editBranchDetails));

module.exports = router;
