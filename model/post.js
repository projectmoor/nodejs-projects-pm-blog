// database - post collection & post validation

// import mongoose package
const mongoose = require('mongoose');
// import validation package Joi
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const postSchema = new mongoose.Schema({
    category: {
        type: String,
        default: 'Other'
    },
    title: {
        type: String,
        required: [true, 'Please enter title'],
        minlength: 2,
        maxlength: 100
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please submit authur']
    },
    publishDate: {
        type: Date,
        // `Date.now()` returns the current unix timestamp as a number
        default: Date.now
    },
    cover: {
        type: String,
        default: null
    },
    content: {
        type: String
    }
});

const Post = mongoose.model('Post', postSchema);

// set up validation
const validatePost = post => {
    // set up validation rule
    const schema = Joi.object({
        category: Joi.string().error(new Error("Category doesn't meet requirement")),
        title: Joi.string().min(2).max(100).required().error(new Error("Title doesn't meet requirement")),
        author: Joi.objectId().required().error(new Error("Author doesn't meet requirement")),
        publishDate: Joi.date().error(new Error("Publish date doesn't meet requirement")),
        cover: Joi.string().error(new Error("Cover role doesn't meet requirement")),
        content: Joi.string().error(new Error("Post content doesn't meet requirement"))
    });
    return schema.validateAsync(post);
}

module.exports = {
    Post,
    validatePost
}