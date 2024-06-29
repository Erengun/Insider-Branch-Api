const express = require('express');
const { login, register } = require('../controllers/userController');
const asyncMiddleware = require('../middleware/asyncMiddleware');

const router = express.Router();

// Authentication route
router.post('/login', asyncMiddleware(login));
router.post('/register', asyncMiddleware(register));

module.exports = router;
