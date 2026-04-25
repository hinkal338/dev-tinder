const express = require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const userRouter = express.Router();

const USER_SAFE_DATA = 'firstName lastName age gender about skills photoURL';

// Get all the pending connection requests for the logged in user
userRouter.get('/user/requests/received', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({ toUserId: loggedInUser._id, status: 'interested' }).populate('fromUserId', USER_SAFE_DATA);
        if (connectionRequest.length === 0) {
            return res.status(404).send("No connection request found");
        }
        res.status(200).json({
            message: "Connection requests retrieved successfully",
            data: connectionRequest
        });

    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});

// Get all the connections for the logged in user
userRouter.get('/user/connections', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connections = await ConnectionRequest.find({
            $or: [{ fromUserId: loggedInUser._id, status: 'accepted' }, { toUserId: loggedInUser._id, status: 'accepted' }]
        }).populate('fromUserId', USER_SAFE_DATA).populate('toUserId', USER_SAFE_DATA);
        if (connections.length === 0) {
            return res.status(404).send("No connections found");
        }

        const data = connections.map(connection => {
            if (connection.fromUserId._id.equals(loggedInUser._id)) {
                return connection.toUserId;
            } else {
                return connection.fromUserId;
            }
        });
        res.status(200).json({
            message: "Connections retrieved successfully",
            data
        });
    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});

module.exports = userRouter;