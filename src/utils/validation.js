const validator = require('validator');

const validateSignUpData = (user) => {
    const { firstName, lastName, emailId, password } = user;

    if (!firstName || !lastName) {
        throw new Error("Not a valid name");
    }
    if (!validator.isEmail(emailId)) {
        throw new Error("Not a valid email address");
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error("Please enter strong password");
    }

};

const validateProfileEditData = (user) => {
    const ALLOWED_EDIT_FIELDS = ["firstName", "lastName", "age", "gender", "about", "skills", "photoURL"];

    const isEditAllowed = Object.keys(user).every((field) => ALLOWED_EDIT_FIELDS.includes(field));
    return isEditAllowed;
};

const validatePasswordChangeData = async (req) => {
    const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            throw new Error("Please enter passwords");
        }
        if(oldPassword === newPassword) {
            throw new Error("New password cannot be same as old password");
        }
        const isOldPasswordValid = await req.user.validatePassword(oldPassword)
        if(!isOldPasswordValid) {
            throw new Error("Please enter valid old password");
        }
        if (!validator.isStrongPassword(newPassword)) {
            throw new Error("Please enter strong new password");
        }
};

module.exports = { validateSignUpData, validateProfileEditData, validatePasswordChangeData };