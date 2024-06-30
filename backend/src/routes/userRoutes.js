/**
 * Express router for user routes.
 * @module userRoutes
 */

const express = require('express');
const { login, register } = require('../controllers/userController');
const asyncMiddleware = require('../middleware/asyncMiddleware');

const router = express.Router();

/**
 * Route for user login.
 * @name POST /login
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
router.post('/login', asyncMiddleware(login));

/**
 * Route for user registration.
 * @name POST /register
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
router.post('/register', asyncMiddleware(register));

module.exports = router;
