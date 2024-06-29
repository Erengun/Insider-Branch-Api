const logger = require("../utils/logger");

module.exports = (err, req, res, next) => {
    let _error = {
        message: err.message ?? "Somethings went wrong",
        status: err.status ?? 500
    };

    logger.error(err.message);
    res.status(_error.status).json(_error);
}