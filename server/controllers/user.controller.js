const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class UserController {

    static async login(req, res, next) {
        const { username, password } = req.body;        
    
        if (!username || !password) {
            return next({
                name: "InvalidUsernamePassword",
                msg: { message: "Username and Password are required!" },
            });
        }
    
        try {
            const result = await User.findOne({ where: { username } });
            
            if (result) {
                if (bcrypt.compareSync(password, result.password)) {
                    const token = jwt.sign({ id: result.id, username: result.username }, process.env.SECRET_KEY);
                    return res.status(200).json({ access_token: token, username: result.username });
                } else {
                    return next({
                        name: "WrongUsernamePassword",
                        msg: { message: "Invalid Username / Password!" },
                    });
                }
            } else {
                return next({
                    name: "Unregistered",
                    msg: { message: "Invalid Username / Password!" },
                });
            }
        } catch (err) {
            console.error("Error during login:", err);
            return next({
                name: "InternalServerError",
                msg: "Internal Server Error",
            });
        }
    }
    
    static async register(req, res, next) {
        const { username,  password } = req.body;
    
        if (!username || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
    
        const newUser = {
            username,
            password,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    
        try {
            const data = await User.create(newUser);
            return res.status(201).json({ id: data.id, username: data.username });
        } catch (err) {
            console.error('Error creating User:', err);
            return next({
                name: "InvalidRegister",
                msg: { message: "Invalid Username / Password" },
            });
        }
    }
}

module.exports = UserController;
