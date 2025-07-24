const validator = require('validator');

const userSignUpValidation = (req) => {
    const { firstName, lastName, emailId, password } = req;

    if (!firstName || !lastName) {
        throw new Error("Name is required");
    }

    else if (!validator.isEmail(emailId)) {
        throw new Error("Email is incorrect");
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error("Password is not strong");
    }
}

const validateProfileValidation = (req) => {
    const { age, gender, skills, photoUrl, about } = req;
    const errors = {};

    const allowedFields = ['age', 'gender', 'skills', 'photoUrl', 'about', "firstName", "lastName"];
    const extraFields = Object.keys(req).filter(key => !allowedFields.includes(key));

    if (extraFields.length > 0) {
        errors.extraFields = `Unexpected fields: ${extraFields.join(', ')}`;
    }

    // Validate age (optional)
    if (age !== undefined && !validator.isInt(String(age), { min: 0, max: 120 })) {
        errors.age = 'Age must be a number between 0 and 120';
    }

    // Validate gender (optional)
    if (gender !== undefined) {
        const validGenders = ['male', 'female', 'other'];
        if (!validGenders.includes(gender.toLowerCase())) {
            errors.gender = 'Gender must be one of: male, female, other';
        }
    }

    // Validate skills (optional)
    if (skills !== undefined) {
        if (!Array.isArray(skills)) {
            errors.skills = 'Skills must be an array';
        } else if (skills.some(skill => typeof skill !== 'string' || validator.isEmpty(skill.trim()))) {
            errors.skills = 'Each skill must be a non-empty string';
        }
    }

    // Validate profileUrl (optional)
    if (photoUrl !== undefined && !validator.isURL(photoUrl)) {
        errors.photoUrl = 'Profile URL must be a valid URL';
    }

    // Validate about (optional)
    if (about !== undefined && (typeof about !== 'string' || validator.isEmpty(about.trim()))) {
        errors.about = 'About must be a non-empty string';
    }

    return Object.keys(errors).length > 0
        ? { isValid: false, errors }
        : { isValid: true };
};

const validateChangePassword = (req) => {
    const errors = {};
    const allowedFields = ['oldPassword', "newPassword"];

    const extraFields = Object.keys(req).filter(key => !allowedFields.includes(key));

    if (extraFields.length > 0) {
        errors.extraFields = `Unexpected Fields: ${extraFields.join(', ')}`;
    }
    if (!validator.isStrongPassword(req.newPassword)) {
        throw new Error("Password is not strong");
    }

    return Object.keys(errors).length > 0 ? { isValid: false, errors } : { isValid: true };
}


module.exports = {
    userSignUpValidation,
    validateProfileValidation,
    validateChangePassword
};