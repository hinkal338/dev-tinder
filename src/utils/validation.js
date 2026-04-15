const validator = require('validator');

const validateSignUpData = (user) => {
    const { firstName, lastName, emailId, password } = user;

    if (!firstName || !lastName) {
        throw new Error("Not a valid name");
    }
    if(!validator.isEmail(emailId)) {
        throw new Error("Not a valid email address");
    }
    if(!validator.isStrongPassword(password)) {
        throw new Error("Please enter strong password");
    }

};

module.exports = validateSignUpData;