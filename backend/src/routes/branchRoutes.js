const express = require('express');
const { list } = require('../controllers/branchController');
/* const authMiddleware = require('../middleware/authMiddleware');
 */
const router = express.Router();

// Guard route
/* router.use(authMiddleware); */

// List all branches
router.get('/', list);

// View branch details
// router.get('/:id', viewBranchDetails);

// Edit branch details (Owners only)
// router.put('/:id', editBranchDetails);

module.exports = router;
