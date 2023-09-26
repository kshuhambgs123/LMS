require("dotenv").config();
const users = require('../models/user_authentication');

// Middleware for authentication
const jwt = require('jsonwebtoken');
const secretKey = process.env.secretKey; // secret key

function authenticateToken(req, res, next) {
    // Get the token from the request headers
    const token = req.header('Authorization');

    // Check if the token is missing
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - Token missing' });
    }

    // Verify the token
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden - Invalid token' });
        }
        // Token is valid, and user information is available in 'user'
        req.user = user;
        next();
    });
};

module.exports={
    authenticateToken
}
