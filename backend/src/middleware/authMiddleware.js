
/**
 * Middleware function to authenticate requests using Cognito tokens.
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The next middleware function.
 * @returns {Promise<void>} - A Promise that resolves when the middleware is complete.
 */
const CognitoExpress = require('cognito-express')
const client = require('../db-client');

const cognitoExpress = new CognitoExpress({
    region: process.env.COGNITO_REGION,
    cognitoUserPoolId: process.env.COGNITO_USER_POOL_ID,
    tokenUse: "access",
    tokenExpiration: 3600000
})

module.exports = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '') ?? '';
        const user = await new Promise(async (resolve, reject) => {
            await cognitoExpress.validate(token, (err, response) => {
                if (err) {
                    return reject({
                        message: "Invalid token",
                        status: 401
                    })
                }
                resolve(response);
            });
        })
        const dbUser = await client.user.findFirst({
            where: {
                id: user.username
            }
        })
        if (!dbUser) {
            throw {
                message: "User not found",
                status: 403
            }
        }

        req.user = dbUser;
        next();
    } catch (error) {
        next(error);
    }
};