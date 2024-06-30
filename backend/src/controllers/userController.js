const client = require('../db-client');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const handleError = require('../utils/incognitoErrorHandler');

/**
 * Handles user login.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the login process is complete.
 */
async function login(req, res) {
    const { email, password } = req.body;

    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: email,
        Password: password,
    });

    const userPool = new AmazonCognitoIdentity.CognitoUserPool({
        UserPoolId: process.env.COGNITO_USER_POOL_ID,
        ClientId: process.env.COGNITO_CLIENT_ID,
    });

    const userData = {
        Username: email,
        Pool: userPool,
    };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    await new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: async (result) => {
                const cognitoId = result.getIdToken().payload["cognito:username"]
                const dbUser = await client.user.findFirst({
                    where: {
                        id: cognitoId
                    }
                })
                res.json({ accessToken: result.getAccessToken().getJwtToken(), role: dbUser.role });
                resolve();
            },
            onFailure: (err) => {
                reject({
                    message: err.message,
                    status: 401
                })
            },
        });
    })
}

/**
 * Confirms user registration.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the user registration is confirmed.
 */
async function confirmUser(req, res) {
    const { email, code } = req.body;

    const userPool = new AmazonCognitoIdentity.CognitoUserPool({
        UserPoolId: process.env.COGNITO_USER_POOL_ID,
        ClientId: process.env.COGNITO_CLIENT_ID,
    });

    const userData = {
        Username: email,
        Pool: userPool,
    };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    await new Promise((resolve, reject) => {
        cognitoUser.confirmRegistration(code, true, (err, result) => {
            if (err) {
                return reject(handleError(err));
            }
            if (result) {
                res.status(200).json({ message: 'User confirmed successfully', status: 200 });
                return resolve();
            }

            reject({
                message: "User couldn't confirm",
                status: 500
            })
        });
    })
}

/**
 * Registers a new user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the user registration is complete.
 */
async function register(req, res) {
    // TODO: get other user informations
    const { email, password, branchId, name, role } = req.body;

    const attributeList = [];

    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'email', Value: email }));

    const userPool = new AmazonCognitoIdentity.CognitoUserPool({
        UserPoolId: process.env.COGNITO_USER_POOL_ID,
        ClientId: process.env.COGNITO_CLIENT_ID,
    });

    await new Promise((resolve, reject) => {
        userPool.signUp(email, password, attributeList, null, (err, result) => {
            if (err) {
                return reject(handleError(err));
            }
            if (result) {
                confirmUser(req, res).catch((err) => {
                    reject(err);
                });
                res.status(200).json({ message: 'User registered successfully', status: 200 });
                return resolve();
            }

            reject({
                message: "User couldn't save",
                status: 500
            })
        });
    })
}

module.exports = {
    login,
    register
}
