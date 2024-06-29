
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
        const user = await new Promise((resolve, reject) => {
            cognitoExpress.validate(token, (err, response) => {
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
                email: user.email
            }
        })
    
        req.user = dbUser;
        next();
      } catch (error) {
        next(error);
      }
};