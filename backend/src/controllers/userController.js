const express = require('express');
const client = require('../db-client');
const logger = require("../utils/logger");
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

async function login(req, res) {
    const { email, password } = req.body;

    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Email: email,
        Password: password,
    });

    const userPool = new AmazonCognitoIdentity.CognitoUserPool({
        UserPoolId: process.env.COGNITO_USER_POOL_ID,
        ClientId: process.env.COGNITO_CLIENT_ID,
    });

    const userData = {
        Email: email,
        Pool: userPool,
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    return new Promise((res, rej) => {
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: (result) => {
                res.json({ accessToken: result.getAccessToken().getJwtToken() });
                res();
            },
            onFailure: (err) => {
                rej({
                    message: err.message,
                    status: 401
                })
            },
        });
    })
}

async function register(req, res) {
    const { email, password } = req.body;

    const attributeList = [];

    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'email', Value: email }));

    const userPool = new AmazonCognitoIdentity.CognitoUserPool({
        UserPoolId: config.USER_POOL_ID,
        ClientId: config.CLIENT_ID,
    });

    return new Promise((res, rej) => {
        userPool.signUp(email, password, attributeList, null, (err, result) => {
            if (err) {
                return rej({
                    message: err.message,
                    status: 400
                })
            }
            if (result) {
                res.status(200).json({ message: 'User registered successfully', status: 200 });
                return res();
            }

            rej({
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