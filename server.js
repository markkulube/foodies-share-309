/* This is the main server endpoint file. */
"use strict";

const express = require("express");
const path = require('path');

// Start up the express server.
const app = express();

// Mongoose and mongodb connection.
const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false);  // Fix deprecation issues.

// Import mongoose models (AKA. schemas)
const { Review } = require("./models/review");
const { User } = require("./models/user");
const { Post } = require("./models/post");

// Use this to check validity of mongodb _id's
const { ObjectID } = require("mongodb");


// ==== Middleware Functions ==== //
// ------------------------------ //

// Middleware for parsing HTTP JSON body into a usable object.
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Middleware for managing user sessions with cookies.
const session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Returns true if the given error is caused by MongoDB disconnect.
 *
 * @param error -- The error to check.
 * @returns {boolean}
 */
function isMongoError(error) {
    return typeof error === 'object' && error !== null && error.name === "MongoNetworkError";
}

// Middleware function for checking mongo connection.
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

// Middleware function for authenticating users.
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

// Middleware to create a session and session cookie.
app.use(session({
    secret: "secret message",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60000,
        httpOnly: true
    }
}));


// ==== Session Handling ==== //
// -------------------------- //

// Login with the given credentials.
app.post('/api/login', async (req, res) => {
    console.log("POST request for api/login");

    const userName = req.body.userName;
    const password = req.body.password;

    const user = await User.findByUsernamePassword(userName, password);

    switch (user) {
        case 500:
            res.status(500).send("Internal server error");
            break;
        case 404:
            res.status(404).send("User not found");
            break;
        default:  // Must have found user.
            req.session.user = user;
            req.session.userName = user.userName;
            res.send({ currentUser: user.userName });
    }
});

app.get('/api/logout', (req, res) => {
    console.log("GET request for api/logout");

    req.session.destroy(error => error ? res.status(500).send(error) : res.send());
});

// TODO: Add routes to login, logout, and check authentication using the session here.


// ==== API Route Handling ==== //
// ---------------------------- //

// Retrieve all existing data from server as a test.
app.get('/api/all', mongoChecker, async (req, res) => {
    console.log("GET request for api/all");

    try {
        const users = await User.find();
        const posts = await Post.find();
        const reviews = await Review.find();

        res.send({
            users: users,
            posts: posts,
            reviews: reviews
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
});

// Retrieve the currently authenticated user.
app.get('/api/user', mongoChecker, authenticate, async (req, res) => {
    console.log(`GET request for api/user: user=${req.user._id}`);
    res.send(req.user);
});

// Create a new user with the given request data.
app.post('/api/user', mongoChecker, async (req, res) => {
    console.log("POST request for api/user");

    const user = new User({
        userName: req.body.userName,
        password: req.body.password,
        age: req.body.age,
        favMeal: req.body.favMeal,
        favPosts: [],
        isAdmin: false
    });

    try {
        res.send(await user.save());
    } catch (error) {
        if (isMongoError(error)) {
            res.status(500).send('Internal server error');
        } else {
            console.log(error);
            res.status(400).send('Bad request');  // Input error by the client.
        }
    }
});

app.delete('/api/user', mongoChecker, async (req, res) => {
    console.log('DELETE request for api/user');

    try {
        const user = await User.findByIdAndRemove(req.body.user);
        user ? res.send(user) : res.status(404).send("User not found");
    } catch (error) {
        console.log(error)
        if (isMongoError(error)) {
            res.status(500).send('Internal server error');
        } else {
            res.status(400).send('Bad request')  // Input error by the client.
        }
    }
});

// TODO: Add routes to get server data here.


// ==== Serving Frontend ==== //
// -------------------------- //

// Serve static frontend files.
app.use(express.static(path.join(__dirname, "/client/build")));

// Send index.html to any route. Give a 200 or 404 status code depending on whether or not the page exists.
app.get("*", (req, res) => {
    // If page does not exist in frontend, send a 404 response.
    const goodPageRoutes = ["/", "/SignUp", "/LogIn", "/Timeline", "/UserTimeline", "/AccountInfo", "/Admin", "/PostRecipePage"];
    if (!goodPageRoutes.includes(req.url)) {
        res.status(404);
    }

    res.sendFile(path.join(__dirname, "/client/build/index.html"));
});


// ==== Listening on Port ==== //
// --------------------------- //

// Have express server listen on deployed or local port.
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
