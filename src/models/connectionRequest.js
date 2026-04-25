const mongoose = require("mongoose");
const { Schema } = mongoose;

const connectionRequestSchema = new Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["interested", "ignored", "accepted", "rejected"],
            message: "{VALUE} is not a valid status"
        },
    }
}, { timestamps: true });

// compound index
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

connectionRequestSchema.pre('save', async function () {
    if (this.fromUserId.equals(this.toUserId)) {
        throw new Error("You cannot send a connection request to yourself");
    }
});

const connectRequestModel = mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = connectRequestModel;