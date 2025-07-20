const mongoose = require("mongoose");

const ConnectionReqSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        requried: true,
        enum: {
            values: ['ignored', 'accepted', 'interested'],
            message: '${VALUE} is incorrect status type'
        }
    }
}, {timestamps: true});

ConnectionReqSchema.pre('save', async function(next) {
    const connectionRequest = this;

    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send request to yourself");
    }
    next();
})

const ConnectionReqModel = mongoose.model("ConnectionRequest", ConnectionReqSchema);

module.exports = ConnectionReqModel;