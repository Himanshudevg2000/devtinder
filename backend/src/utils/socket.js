const socket = require('socket.io');
const crypto = require("crypto");

const getRoomId = (userId, targetUserId) => {
    return crypto
        .createHash('sha256')
        .update([userId, targetUserId].sort().join("_"))
        .digest('hex');
}

const initializeSocket = (server) => {

    const io = socket(server, {
        cors: {
            origin: "http://localhost:5173",
        },
    });

    io.on("connection", (socket) => {
        // Handle Events

        socket.on('joinChat', ({ firstName, userId, targetUserId }) => {
            const roomId = getRoomId(userId, targetUserId);
            console.log(firstName + ' Joining roomId: ', roomId);
            socket.join(roomId);
        });

        socket.on('sendMessage', ({ firstName, userId, targetUserId, text }) => {
            const roomId = getRoomId(userId, targetUserId);
            console.log(firstName + " " + text);
            io.to(roomId).emit("messageReceived", { firstName, text });
        });

        socket.on('disconnect', () => { });
    })
}

module.exports = initializeSocket;