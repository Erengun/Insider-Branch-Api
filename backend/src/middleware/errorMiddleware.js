/**
 * Error handler middleware
 * @param {Error} err - The error object
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
const logger = require("../utils/logger");

/// Error handler middleware
module.exports = (err, req, res, next) => {
    let _error = {
        message: err.message  || "Something went wrong",
        status: err.status || 500
    };
    logger.error(`${_error.message}, Status: ${_error.status}`)
    res.status(_error.status).json(_error);
}