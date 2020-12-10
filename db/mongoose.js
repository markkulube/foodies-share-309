/* This file connects to our mongodb server through mongoose. */
"use strict";

const mongoose = require('mongoose');

// Define the URI for the database.
// If URI is not defined for deployment, use our local one for development.
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://user:user@foodies-dev.5h6a5.mongodb.net/FoodiesAPI?retryWrites=true&w=majority';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

module.exports = { mongoose };  // Export the active connection.
