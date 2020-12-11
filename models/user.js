/* This file contains the User schema. */
"use strict";

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

    // The profile pic of the user
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

    // A list of the _id's of posts this user has added to favourites.
    savedPosts: [{
        type: mongoose.Schema.Types.ObjectID,
        required: true,
        ref: 'Post'
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
	const user = this; // binds this to User document instance

	// checks to ensure we don't hash password more than once
	if (user.isModified('password')) {
		// generate salt and hash the password
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash
				next()
			})
		})
	} else {
		next()
	}
})

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
