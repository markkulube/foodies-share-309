/* This file contains helpers and middleware for mongodb functions. */
"use strict";

const mongoose = require("mongoose");

/**
 * Returns true if the given error is caused by MongoDB disconnect.
 *
 * @param error -- The error to check.
 * @returns {boolean}
 */
function isMongoError(error) {
    return typeof error === 'object' && error !== null && error.name === "MongoNetworkError";
}

/**
 * Check if there were any issues with connecting to mongoose. If connection was unsuccessful, send an internal server
 * error response. Otherwise, continue to the next process.
 *
 * @params req, res, next -- Required for express middleware usage.
 */
const mongoChecker = (req, res, next) => {
    if (mongoose.connection.readyState !== 1) {
        // If mongoose connection was not successful, log and stop the server.
        console.log('Issue with mongoose connection');
        res.status(500).send('Internal server error');
    } else {
        // Otherwise, we are ready to continue to the next process.
        next();
    }
}

module.exports = { isMongoError, mongoChecker };
