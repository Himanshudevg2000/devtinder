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

        res.send({ data: {}, message: "user created successfully" });
    } catch (error) {
        res.send({ data: null, message: error.message });
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
        res.send({ data: token, message: "Login successFull" });
    } catch (error) {
        res.send({ data: null, message: error.message });
    }
}

const logout = (req, res) => {
    res.cookie("token", '', { expiresIn: Date(Date.now()) });
    res.send({ message: "Logout successfull", data: null });
}


module.exports = { signup, login, logout };