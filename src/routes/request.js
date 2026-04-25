const express = require('express');
const requestRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');

requestRouter.post('/request/send/:status/:userId', userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.userId;
        const status = req.params.status;

        const ALLOWED_STATUSES = ["interested", "ignored"];
        if (!ALLOWED_STATUSES.includes(status)) {
            return res.status(400).send("Invalid status for sending connection request");
        }

        const toUser = await User.findById(toUserId);

        if (!toUser) {
            return res.status(404).send("User not found");
        }

        const exisitingConnection = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        });

        if (exisitingConnection) {
            return res.status(400).send("Connection request already exists");
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });

        const data = await connectionRequest.save();
        res.json({
        message:
          req.user.firstName + " --> " + toUser.firstName + ": " + status,
        data,
      });
    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }

});

module.exports = requestRouter;