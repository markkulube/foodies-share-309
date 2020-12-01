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
        required: [true, "Username is required."],
        minlength: 1,
        trim: true
    },

    // TODO: Refer to insight (1) for why "profilePic" is missing.
    profilePic: {
        type: String,
        required: true,
        trim: true
    },

    // The title of this post.
    title: {
        type: String,
        required: [true, "Title is required."],
        trim: true
    },

    // The food category of this post's recipe.
    category: {
        type: String,
        required: [true, "Category is required."],
    },

    // The description of this post.
    desc: {
        type: String,
        required: [true, "Description is required."],
        trim: true
    },

    // The date this post was created.
    datePosted: {
        type: Date,
        required: [true, "Date posted is required."]
    },

    // The ingredients for the recipe in this post.
    ingredients: {
        type: [String],
        required: [true, "Ingredients are required."]
    },

    // The steps for making the recipe in this post.
    steps: {
        type: [String],
        required: [true, "Steps are required."]
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
        type: String,
        required: true
    }

});

const Post = mongoose.model('Post', PostSchema);
module.exports = { Post };
