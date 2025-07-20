const express = require("express");
const router = express.Router();

const { userAuth } = require("../middleware/userAuth");
const { sendConnectionRequest, reviewConnectionRequest } = require("../controllers/request");

router.post('/request/connection/:status/:toUserId', userAuth, sendConnectionRequest);

router.post('/request/review/:status/:toRequestId', userAuth, reviewConnectionRequest);

module.exports = router;