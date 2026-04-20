const express = require('express');
const requestRouter = express.Router();
const { userAuth } = require('../middlewares/auth');

requestRouter.post('/sendConnectionRequest', userAuth, (req, res) => {
    try {
        const user = req.user;
        res.send("Connection request sent successfully !!");
    } catch {
        res.status(400).send("Something went wrong");
    }

});

module.exports = requestRouter;