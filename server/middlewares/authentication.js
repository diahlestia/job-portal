const { User } = require("../models");
const jwt = require('jsonwebtoken');

const Authentication = async (req, res, next) => {
    try {
        const decoded = jwt.verify(req.headers.access_token, process.env.SECRET_KEY);
        
        const user = await User.findOne({ where: { username: decoded.username } });
        
        if (user) {
            req.currentUser = {
                id: user.id,
                username: user.username,
            };
            return next();
        } else {
            // User not found
            return next({
                name: 'UsernameNotFound',
                msg: { "Authentication": "Username not found" }
            });
        }
    } catch (error) {
        
        if (error.name === 'JsonWebTokenError') {
            return next({
                name: 'JwtNotProvided',
                msg: { message: 'Invalid or missing JWT token' }
            });
        }
        return next({
            name: 'AuthenticationError',
            msg: { message: error.message }
        });
    }
};

module.exports = Authentication;
