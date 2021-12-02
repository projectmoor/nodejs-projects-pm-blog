// database - user collection & add user validation


// import mongoose package
const mongoose = require('mongoose');
// import validation package Joi
const Joi = require('joi');

// set up user schema (rule for user collection)
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        // ensure unique email for each user
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // admin - admin right
    // member - normal member right
    role: {
        type: String,
        required: true
    },
    // 1 - account actived
    // 0 - account inactived
    state: {
        type: Number,
        default: 1,
        required: true
    }
});

// set up user collection
const User = mongoose.model('User', userSchema);

// create first admin user
const { encryptStr } = require('../route/admin/helper');
async function createUser() {
    let encrypted = await encryptStr('123456');
    const user = await User.create({
        username: 'admin',
        email: 'admin@pm-blog.com',
        password: encrypted,
        role: 'Admin',
        state: 1
    });
}
createUser();

// set up validation
const validateUser = user => {
    // set up validation rule
    const schema = Joi.object({
        username: Joi.string().min(3).max(12).required().error(new Error("Username doesn't meet requirement")),
        password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required().error(new Error("Password doesn't meet requirement")),
        email: Joi.string().email().required().error(new Error("Email doesn't meet requirement")),
        role: Joi.string().valid('Admin', 'Member').required().error(new Error("Account role doesn't meet requirement")),
        state: Joi.number().valid(0, 1).required().error(new Error("Account state doesn't meet requirement"))
    });
    return schema.validateAsync(user);
}

// 将用户集合做为模块成员进行导出
module.exports = {
    User,
    validateUser
}