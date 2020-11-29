/* This file contains the Post schema. */
"use strict";

// TODO: Insights
//  1) We should only have a profile picture for users to avoid redundancy and obtain it through queries.

const mongoose = require('mongoose');

// Import schemas for any sub-documents.
const ReviewSchema = mongoose.model('Review').schema;

const PostSchema = new mongoose.Schema({

    // The username of this post's creator.
    userName: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },

    // TODO: Refer to insight (1) for why "profilePic" is missing.

    // The title of this post.
    title: {
        type: String,
        required: true,
        trim: true
    },

    // The description of this post.
    description: {
        type: String,
        required: true,
        trim: true
    },

    // The date this post was created.
    datePosted: {
        type: Date,
        required: true
    },

    // The ingredients for the recipe in this post.
    ingredients: {
        type: [String],
        required: true
    },

    // The steps for making the recipe in this post.
    steps: {
        type: [String],
        required: true
    },

    // The reviews on this post.
    reviews: [{
        type: ReviewSchema,
        required: true
    }],

    // The number of likes this post has.
    likes: {
        type: Number,
        required: true,
        default: 0
    },

    // The number of dislikes this post has.
    dislikes: {
        type: Number,
        required: true,
        default: 0
    },

    // The _id of the user who created this post.
    creator: {
        type: mongoose.Schema.Types.ObjectID,
        required: true,
        ref: 'User'
    }

});

const Post = mongoose.model('Post', PostSchema);
module.exports = { Post };
