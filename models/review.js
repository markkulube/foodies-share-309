/* This file contains the Post schema. */
"use strict";

// TODO: Insights
//  1) We should only have a profile picture for users to avoid redundancy and obtain it through queries.

const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({

    // The username of this review's creator.
    userName: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },

    // TODO: Refer to insight (1) for why "profilePic" is missing.

    // The content of this review.
    content: {
        type: String,
        required: true,
        trim: true
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

const Review = mongoose.model('Review', ReviewSchema);
module.exports = { Review };
