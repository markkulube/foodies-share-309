/* This file contains helpers and middleware for authentication. */
"use strict";

// Import required mongoose models.
const { User } = require("../../models/user");

/**
 * Use the current session to authenticate the given request. If authentication fails, send an unauthorized response.
 * Otherwise, set user value in the given request and continue with the next process.
 *
 * @params req, res, next -- Required for express middleware usage.
 * @returns {Promise<void>}
 */
const authenticate = async (req, res, next) => {
    if (req.session.user) {
        try {
            const user = await User.findById(req.session.user);

            if (!user) {  // User not found.
                res.status(401).send("Unauthorized");
            } else {  // User was found! Add it to the request before continuing to the next process.
                req.user = user;
                next();
            }
        } catch (error) {  // Error searching for user in database.
            res.status(401).send("Unauthorized");
        }
    } else {  // Session user does not exist.
        res.status(401).send("Unauthorized");
    }
}

/**
 * Check the current session for an authenticated user. If no user is authenticated, redirect to home page for login.
 *
 * @params req, res, next -- Required for express middleware usage.
 */
const sessionChecker = (req, res, next) => {
    if (req.session.user) {
        res.redirect('/');  // Redirect to login.
    } else {
        next();
    }
};

module.exports = { authenticate, sessionChecker };
