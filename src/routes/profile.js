const express = require('express');
const profileRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const { validateProfileEditData, validatePasswordChangeData } = require('../utils/validation');
const bcrypt = require('bcrypt');

profileRouter.get('/profile/view', userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});

profileRouter.patch('/profile/edit', userAuth, async (req, res) => {
    try {
        if (!validateProfileEditData(req.body)) {
            throw new Error("Invalid edit data");
        }

        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key) => {
            loggedInUser[key] = req.body[key];
        });
        await loggedInUser.save();
        res.json({
            message: `${loggedInUser.firstName}, your profile has been updated successfully !!`,
            data: loggedInUser
        });

    } catch (err) {
        res.status(400).send("Error: " + err.message);
    };
});

profileRouter.patch('/profile/password', userAuth, async (req, res) => {
    try {
        await validatePasswordChangeData(req);
        const loggedInUser = req.user;
        const { newPassword } = req.body;
        const encryptedNewPassword = await bcrypt.hash(newPassword, 10);
        loggedInUser.password = encryptedNewPassword;
        await loggedInUser.save();
        res.json({
            message: `${loggedInUser.firstName}, your password has been changed successfully !!`
        });

    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});
module.exports = profileRouter;