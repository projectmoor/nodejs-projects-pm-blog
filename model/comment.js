// database - comment collection and validation function

// import mongoose package
const mongoose = require('mongoose');
// import validation package Joi
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const commentSchema = new mongoose.Schema({
    pid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: [true, 'Post referene error']
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please log in to comment']
    },
    publishDate: {
        type: Date,
        // `Date.now()` returns the current unix timestamp as a number
        default: Date.now
    },
    content: {
        type: String,
        required: [true, 'Please enter content (minimum 2 characters allowed)'],
        minlength: 2
    }
});

const Comment = mongoose.model('Comment', commentSchema);

// set up validation
const validateComment = comment => {
    // set up validation rule
    const schema = Joi.object({
        pid: Joi.objectId().required().error(new Error("Post ID error")),
        uid: Joi.objectId().required().error(new Error("User ID error")),
        publishDate: Joi.date().error(new Error("Publish date error")),
        content: Joi.string().required().min(2).error(new Error("Please enter content (minimum 2 characters required)"))
    });
    return schema.validateAsync(comment);
}

module.exports = {
    Comment,
    validateComment
}