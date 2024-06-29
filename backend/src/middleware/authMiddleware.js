
const cognitoExpress = require('cognito-express')
const client = require('../db-client');

module.exports = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '') ?? '';
        const user = await new Promise((res, rej) => {
            cognitoExpress.validate(token, (err, response) => {
                if (err) {
                    return rej({
                        message: "Invalid token",
                        status: 401
                    })
                }
                res(response);
            });
        })
        const dbUser = await client.user.findFirst({
            where: {
                email: user.email
            }
        })
    
        req.user = dbUser;
        next();
      } catch (error) {
        console.error("I AM HERE");
        next(error);
      }
    
};