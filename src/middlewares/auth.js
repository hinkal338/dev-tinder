const User = require("../models/user");
const jwt = require('jsonwebtoken');

const authAdmin = (req, res, next) => {
    console.log("Auth admin called");
    const token = "admin";
    const isAuthorizedAdmin = token === "admin";
    if (!isAuthorizedAdmin) {
        res.status(401).send("Unauthorized Admin !!");
    } else {
        next();
    }
}

const authUser = (req, res, next) => {
    console.log("Auth user called");
    const token = "user";
    const isAuthorizedUser = token === "user";
    if (!isAuthorizedUser) {
        res.status(401).send("Unauthorized User !!");
    } else {
        next();
    }
};

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            throw new Error("Invalid credentials");
        }
        const decoded = jwt.verify(token, "DevTinder@1234");
        const { _id } = decoded;
        const user = await User.findById(_id);
        if (!user) {
            throw new Error("User not found");
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
}

module.exports = { authAdmin, authUser, userAuth };