const { validateProfileValidation, validateChangePassword } = require('../utils/validation');
const saltRounds = 10;
const bcrypt = require('bcrypt');

const viewProfile =  async (req, res) => {
    try {
        let  user = req.user;
        let userObj = user.toObject();
        delete userObj.password;
        delete userObj.createdAt;
        delete userObj.updatedAt;

        res.send({message: "Got data successfully", data: userObj});
    } catch (error) {
        res.send(error.message);
    }
}

const editProfile = async (req, res) => {
    try {
        const { isValid, errors } = validateProfileValidation(req.body);

        if (!isValid) {
            return res.status(400).json({ message: "Validation failed", errors });
        }

        const user = req.user;

        Object.keys(req.body).forEach((key) => (user[key] = req.body[key]));

        await user.save()
        let userObj = user.toObject();
        delete userObj.password;
        delete userObj.createdAt;
        delete userObj.updatedAt;
        delete userObj._v;

        res.send({ message: `${user.firstName}, Your Profile Updated Successfully`, data: userObj });
    } catch (error) {
        res.send(error.message);
    }
}

const changePassword = async (req, res) => {
    try {
        const {isValid, errors} = validateChangePassword(req.body);
        if (!isValid) {
            res.status(400).send({ message: "Valadation Errors", errors });
        }
        const user = req.user;

        const { newPassword, oldPassword } = req.body;

        const matchPassword = await bcrypt.compare(oldPassword, user.password);

        if (!matchPassword) {
            return res.status(400).send({ message: "Old password is incorrect" });
        }

        user.password = await bcrypt.hash(newPassword, saltRounds);
        await user.save();
        res.send({message: "Password changed successfully"})
    } catch (error) {
        res.send({ message: error.message, data: null });
    }
}

module.exports = {viewProfile, editProfile, changePassword};