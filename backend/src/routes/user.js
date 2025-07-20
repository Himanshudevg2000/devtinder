const express = require("express");
const { userAuth } = require("../middleware/userAuth");
const { recievedRequests, userConnections, feed } = require("../controllers/user");
const router = express.Router();

router.get('/user/requests/recieved', userAuth, recievedRequests);

router.get('/user/connections', userAuth, userConnections);

router.get('/feed', userAuth, feed)

module.exports = router;