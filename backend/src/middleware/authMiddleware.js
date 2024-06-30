
const CognitoExpress = require('cognito-express')
const client = require('../db-client');
const logger = require("../utils/logger");

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