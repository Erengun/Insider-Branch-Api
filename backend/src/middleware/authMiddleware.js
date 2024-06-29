exports.verifyToken = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
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
    // TODO: Fetch user from db
    req.user = user;
    next();
};