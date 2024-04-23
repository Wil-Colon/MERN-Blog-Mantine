const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = function (req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if no token
    if (!token) {
        return res
            .status(401)
            .json({ errors: [{ msg: 'No token, authorization denied' }] });
    }

    // // Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWTSECRET);

        req.user = decoded.user;
        next();
    } catch (err) {
        return res
            .status(401)
            .json({ errors: [{ msg: 'Token is not valid' }] });
    }
};
