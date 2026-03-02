const AppError = require('../utils/AppError');

/**
 * Creates a middleware that validates required query/body parameters.
 *
 * @param {string[]} requiredParams - List of required parameter names
 * @param {string} source - "query" or "body" (where to look for params)
 * @returns {Function} Express middleware
 */
function validate(requiredParams, source = 'query') {
    return (req, res, next) => {
        const data = source === 'body' ? req.body : req.query;
        const missing = [];

        for (const param of requiredParams) {
            if (data[param] === undefined || data[param] === null || data[param] === '') {
                missing.push(param);
            }
        }

        if (missing.length > 0) {
            return next(
                new AppError(
                    `Missing required parameter(s): ${missing.join(', ')}`,
                    400
                )
            );
        }

        next();
    };
}

module.exports = validate;
