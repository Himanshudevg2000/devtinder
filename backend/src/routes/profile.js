const express = require("express");
const router = express.Router();
const { userAuth } = require("../middleware/userAuth");
const { viewProfile, editProfile, changePassword } = require("../controllers/profile");

router.get('/profile/view', userAuth, viewProfile);

router.patch('/profile/edit', userAuth, editProfile);

router.patch('/profile/change-password', userAuth, changePassword);

module.exports = router;