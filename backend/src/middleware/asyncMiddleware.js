/**
 * Wraps an asynchronous middleware function with error handling.
 *
 * @param {function} fn - The asynchronous middleware function to be wrapped.
 * @returns {function} - The wrapped middleware function.
 */
module.exports = fn => (req, res, next) =>
    Promise
      .resolve(fn(req, res, next))
      .catch(next)