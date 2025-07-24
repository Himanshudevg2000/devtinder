const { userSignUpValidation } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const signup = async (req, res) => {
    try {
        userSignUpValidation(req.body);

        const { firstName, lastName, emailId, password } = req.body;

        const passwordHash = await bcrypt.hash(password, saltRounds);

        const user = new User({ firstName, lastName, emailId, password: passwordHash });

        await user.save();

        const token = await user.getJWT();

        res.cookie('token', token);

        const data = user.toObject();

        delete data.password;
        delete data.createdAt;
        delete data.updatedAt;

        res.send({ data: data, message: "user created successfully" });
    } catch (error) {
        res.status(400).send({ data: null, message: error.message });
    }
}

const login = async (req, res) => {
    try {

        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId: emailId });

        if (!user) {
            throw new Error("No User found");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) throw new Error("Password not valid");

        const token = await user.getJWT();

        res.cookie("token", token);

        const userObj = user.toObject();

        delete userObj.password;
        delete userObj.createdAt;
        delete userObj.updatedAt;

        res.send({ data: userObj, message: "Login successFull" });

    } catch (error) {
        res.status(400).send({ data: null, message: error.message });
    }
}

const logout = (req, res) => {
    // res.cookie("token", '', { expiresIn: Date(Date.now()) });
    res.clearCookie("token", {
        httpOnly: true,
    });
    res.send({ message: "Logout successfull", data: null });
}


module.exports = { signup, login, logout };