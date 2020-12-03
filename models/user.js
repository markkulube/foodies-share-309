/* This file contains the User schema. */
"use strict";

// TODO: Insights
//  1) Instead of each user having a list of posts, each post should have a "created by" field (db design!).
//     When rendering all of some user's posts, simply filter posts by "created by" field.
//  2) Can we add an image attribute to a model?

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({

    // The username of this user.
    userName: {
        type: String,
        required: [true, "Username is required."],
        minlength: [1, "Password cannot be empty."],
        trim: true,
        unique: true
    },

    // TODO: Refer to insight (2) for why "profilePic" is temporarily missing.
    profilePic: {
        type: String,
        required: true,
        trim: true
    },
    
    // The password of this user's account.
    password: {
        type: String,
        required: [true, "Password is required."],
        minlength: [1, "Password cannot be empty."]
    },

    // The age of this user.
    age: {
        type: Number
    },

    // This user's favourite meal.
    favMeal: {
        type: String,
        minlength: 1,
        trim: true
    },

    // TODO: Refer to insight (1) for why "posts" is missing.

    // A list of the _id's of posts this user has added to favourites.
    savedPosts: [{
        type: mongoose.Schema.Types.ObjectID,
        required: true,
        ref: 'Post',
        unique: true
    }],

    // Whether or not this user is an admin.
    isAdmin: {
        type: Boolean,
        required: [true, "User must be defined as regular or admin."]
    },

    // A list of the _id's of posts this user has liked.
    likedPosts: [{
        type: mongoose.Schema.Types.ObjectID,
        required: true,
        ref: 'Post'
    }],

    // A list of the _id's of posts this user has disliked.
    dislikedPosts: [{
        type: mongoose.Schema.Types.ObjectID,
        required: true,
        ref: 'Post'
    }]

});

// Mongoose middleware to hash password before saving.
UserSchema.pre('save', function(next) {
    if (this.isModified('password')) {  // If we haven't already hashed the password...
        // Generate salt and hash the password.
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(this.password, salt, (err, hash) => {
                this.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

/**
 * Return a user from the database with the given username and password to signify login succeeded.
 * If no such user exists OR the password given is incorrect, return null to signify login failed.
 *
 * @param {string} userName -- The username of the user account to find.
 * @param {string} password -- The password of the user account to find.
 * @returns {Object|number}
 */
UserSchema.statics.findByUsernamePassword = async function(userName, password) {
    try {
        const user = await this.findOne({ userName: userName }).exec();

        // If the user is found AND the client provided the correct password for that user, we proceed with login.
        // Otherwise, we return null to signify that login has failed.
        return user && await bcrypt.compare(password, user.password) ? user : 404;
    } catch (error) {
        return 500;
    }
};

const User = mongoose.model('User', UserSchema);
module.exports = { User };
