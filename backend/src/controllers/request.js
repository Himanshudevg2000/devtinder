const ConnectionRequest = require('../models/connectionReq');
const User = require("../models/user");

const sendConnectionRequest = async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const { toUserId, status } = req.params;

        const allowedStatus = ['interested', 'ignored'];

        if (!allowedStatus.includes(status)) {
            return res.status(400).send({ message: `${status} - not allowed`, data: null });
        }

        const checkToUserExist = await User.findById(toUserId);

        if (!checkToUserExist) {
            res.status(400).send({ message: "User does not exist", data: null });
        }

        const checkAlreadyExist = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { toUserId: fromUserId, fromUserId: toUserId }
            ]
        });

        if (checkAlreadyExist) {
            return res.status(400).send({ message: "Request already exists", data: null });
        }

        const connection = new ConnectionRequest({
            fromUserId, toUserId, status
        });
        const data = await connection.save();

        res.send({ message: "Connection sent successfully", data: data })
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

const reviewConnectionRequest = async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const { toRequestId, status } = req.params;

        const allowedStatus = ['accepted', 'rejected'];

        if (!allowedStatus.includes(status)) {
            return res.status(400).send({ message: `${status} - not allowed`, data: null });
        }

        const checkAlreadyExist = await ConnectionRequest.findOne({
            _id: toRequestId,
            status: "interested",
            toUserId: fromUserId
        });

        if (!checkAlreadyExist) {
            return res.status(400).send({ message: "Connection Request not found", data: null });
        }

        checkAlreadyExist.status = status;
        const data = await checkAlreadyExist.save();

        res.send({ message: `Request - ${status}`, data: data })
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

module.exports = {sendConnectionRequest, reviewConnectionRequest};