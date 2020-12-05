/* This file contains the Post schema. */
"use strict";

const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({

    // The username of this review's creator.
    userName: {
        type: String,
        required: [true, "Username is required."],
        minlength: 1,
        trim: true
    },

    // The path to the static profile picture of this review's creator.
    profilePic: {
        type: String,
        required: true,
        trim: true
    },

    // The content of this review.
    content: {
        type: String,
        required: [true, "Content is required."],
        trim: true
    },

    // The date this review was posted.
    datePosted: {
        type: Date,
        required: [true, "Date is required."],
    },

    // The rating this review is giving.
    rating: {
        type: Number,
        required: true,
    },

    // The _id of the User who created this review.
    creator: {
        type: mongoose.Schema.Types.ObjectID,
        required: true,
        ref: 'User'
    }

});

const PostSchema = new mongoose.Schema({

    // The username of this post's creator.
    userName: {
        type: String,
        required: [true, "Username is required."],
        minlength: 1,
        trim: true
    },

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
    reviews: [ReviewSchema],

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
