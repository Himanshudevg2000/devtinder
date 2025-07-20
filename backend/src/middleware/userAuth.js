const jwt = require("jsonwebtoken");
const User = require("../models/user");

const JWTKEY = "dev-tinder-project";

const userAuth = async (req, res, next) => {
    try{

        const { token } = req.cookies;
        if(!token){
            throw new Error("Token is not valid");
        }
        const decodeCookies = await jwt.verify(token, JWTKEY);
        if (!decodeCookies) throw new Error("Incorrect token");
        
        const user = await User.findById(decodeCookies._id);
        req.user = user;
        if(!user){
            throw new Error("User not found");
        }
        next();
    }catch(error){
        res.status(400).send("ERROR: " + error.message);
    }
}

module.exports = { userAuth };