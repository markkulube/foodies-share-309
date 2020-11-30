/* This file connects to our mongodb server through mongoose. */
"use strict";

const mongoose = require('mongoose');

// Define the URI for the database.
// If URI is not defined for deployment, use our local one for development.
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/FoodiesAPI';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

module.exports = { mongoose };  // Export the active connection.
