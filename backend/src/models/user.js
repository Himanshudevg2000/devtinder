const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const JWTKEY = "dev-tinder-project";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        minLength: 6,
        required: true
    },
    age: {
        type: Number,
        minLength: 18
    },
    gender: {
        type: String,
        validate: function (err, value) {
            if (!['male', 'female', 'others'].includes(value)) {
                throw new Error(err);
            }
        }
    },
    about: {
        type: String
    },
    photoUrl: {
        type: String,
        default: null
    },
    skills: {
        type: [String]
    }
}, { timestamps: true });

userSchema.methods.getJWT = async function () {
    const user = this;

    const token = await jwt.sign({ _id: user._id }, JWTKEY, { expiresIn: "7D" });

    return token;

}

const User = mongoose.model("User", userSchema);

module.exports = User;