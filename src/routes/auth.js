const express = require('express');
const validateSignUpData = require('../utils/validation');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const authRouter = express.Router();

authRouter.post('/signup', async (req, res) => {
    try {
        // Validate user data
        validateSignUpData(req.body);

        // encrypt the user password
        const { firstName, lastNane, emailId, password } = req.body;
        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastNane,
            emailId,
            password: encryptedPassword
        });
        await user.save();
        res.send("User created successfully !!");
    } catch (err) {
        res.status(400).send("Error saving the user: " + err.message);
    }
});

authRouter.post('/login', async (req, res) => {
    const { emailId, password } = req.body;
    try {
        if (!emailId) {
            throw new Error("Please enter an email address");
        }
        if (!password) {
            throw new Error("Please enter a password");
        }
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("Please enter valid credentials");
        }
        const isValidPassword = await user.validatePassword(password);
        if (isValidPassword) {
            const token = await user.getJWT();
            res.cookie("token", token, { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
            res.send("Login successful");
        } else {
            throw new Error("Please enter valid credentials");
        }
    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});

module.exports = authRouter;