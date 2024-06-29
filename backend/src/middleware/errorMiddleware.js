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