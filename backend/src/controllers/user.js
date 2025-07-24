const ConnectionReqModel = require("../models/connectionReq");
const User = require("../models/user");

const recievedRequests = async (req, res) => {
    try {
        const user = req.user;

        const allRequests = await ConnectionReqModel.find({
            toUserId: user._id,
            status: "interested"
        }).populate('fromUserId', ['firstName', 'lastName', 'age', 'gender', 'skills', 'about']);

        res.send({ message: "All connections recieved", data: allRequests });
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}

const userConnections = async (req, res) => {
    try {
        const user = req.user;

        const allRequests = await ConnectionReqModel.find({
            $or: [
                { toUserId: user._id, status: "accepted" },
                { fromUserId: user._id, status: "accepted" }
            ]
        })
            .populate('fromUserId', ['firstName', 'lastName', 'age', 'gender', 'skills', 'about', 'photoUrl'])
            .populate('toUserId', ['firstName', 'lastName', 'age', 'gender', 'skills', 'about', 'photoUrl']);

        const data = allRequests.map(row => {
            if (row.fromUserId._id.toString() === user._id.toString()) {
                return row.toUserId;
            }
            else {
                return row.fromUserId;
            }
        }
        );

        res.send({ message: "All connections recieved", data: data });
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}

const feed = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1) * limit;

        const user = req.user;

        const connectedIds = await ConnectionReqModel.find({
            $or: [
                { fromUserId: user._id },
                { toUserId: user._id }
            ]
        });

        const uniqueIds = new Set();

        connectedIds.forEach(res => {
            uniqueIds.add(res.fromUserId.toString());
            uniqueIds.add(res.toUserId.toString());
        });

        const getFeedUsers = await User.find({
            $and: [
                { _id: { $nin: Array.from(uniqueIds) } },
                { _id: { $ne: user._id } }]
        }).select('firstName lastName age gender skills about photoUrl')
            .skip(skip)
            .limit(limit);


        res.send({ message: "Get Feed Data", data: getFeedUsers });

    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

module.exports = { recievedRequests, userConnections, feed }