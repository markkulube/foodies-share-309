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
// TODO: @Brandon, this is an example authenticator, feel free to change or replace it to fit your needs.
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
// TODO: This is an example route, feel free to delete if it conflicts with a route you need to create.
app.post('/user/login', async (req, res) => {
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
            res.send({ currentUser: user });
    }
});

app.get('/api/logout', (req, res) => {
    console.log("GET request for api/logout");
    req.session.destroy(error => error ? res.status(500).send(error) : res.send());
});

// TODO: Add more routes to login, logout, and check authentication using the session here.
// A route to check if a user is logged in on the session
app.get("/user/check-session", (req, res) => {
    if (req.session.user) {
        res.send({ currentUser: req.session.user });
    } else {
        res.status(401).send();
    }
});

// ==== API Route Handling ==== //
// ---------------------------- //

// Import routers and attach them to the app.
app.use("/api/timeline", require("./routes/timeline"));

// Retrieve all existing data from server as a test.
// TODO: This is an example route, feel free to delete if it conflicts with a route you need to create.
app.get('/api/all', mongoChecker, async (req, res) => {
    console.log("GET request for api/all");

    try {
        const users = await User.find();
        const posts = await Post.find();

        res.send({
            users: users,
            posts: posts,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
});

// Retrieve the currently authenticated user.
// TODO: This is an example route, feel free to delete if it conflicts with a route you need to create.
app.get('/api/user', mongoChecker, authenticate, async (req, res) => {
    console.log(`GET request for api/user: user=${req.user._id}`);
    res.send(req.user);
});

// Create a new user with the given request data.
// TODO: This is an example route, feel free to delete if it conflicts with a route you need to create.
app.post('/api/user', mongoChecker, async (req, res) => {
    console.log("POST request for api/user");

    const user = new User({
        userName: req.body.userName,
        profilePic: req.body.profilePic,
        password: req.body.password,
        age: req.body.age,
        favMeal: req.body.favMeal,
        savedPosts: [],
        isAdmin: false,
        likedPosts: [],
        dislikedPosts: []
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

// Delete the given user from the database.
app.delete('/api/user/:id', mongoChecker, async (req, res) => {
    console.log('DELETE request for api/user');

    const id = req.params.id
    let user

    try {
        user = await User.findByIdAndRemove(id);
        user ? res.send(user) : res.status(404).send("User not found");
    } catch (error) {
        console.log(error)
        if (isMongoError(error)) {
            res.status(500).send('Internal server error');
        } else {
            res.status(400).send('Bad request')  // Input error by the client.
        }
    }

    try {
        const posts = await Post.find();

        posts.forEach(async (post) => {
            if (post.userName === user.userName) {
          
                const post_id = post._id
            
                await Post.findOneAndRemove({ _id: ObjectID(post_id) });

                // Update all users who have interacted with this post in some way.
                // Note: Reviews of a post will be deleted automatically since Review is a sub-document of Post.
                const response = await User.updateMany(
                    { $or: [
                            { savedPosts: { $in: post_id } },
                            { likedPosts: { $in: post_id } },
                            { dislikedPosts: { $in: post_id } }
                        ] },
                    { $pull: {
                            "savedPosts": req.body.postId,
                            "likedPosts": req.body.postId,
                            "dislikedPosts": req.body.postId
                        } }
                );

                //console.log(`Matched ${response.n} documents and updated ${response.nModified} documents`);
            }
        });
        
    } catch (error) {
        console.log(error);
        if (isMongoError(error)) {
            res.status(500).send('Internal server error');
        } else {
            res.status(400).send('Bad Request');  // 400 for bad request gets sent to client.
        }
    }
});

// Update the given user from the database.
app.patch('/api/account/:id', async (req, res) => {
    console.log("PATCH request for /api/account/:id")

    const id = req.params.id

 	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	// Good practise: Validate id immediately
	if (!ObjectID.isValid(id)) {
		res.status(404).send() // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
    }

	// if id valid findById
	try {
		
        const user = await User.findOneAndUpdate({_id: ObjectID(id)}, req.body,
                                function(err, user) {
                                    if (err) {
                                        return next(err)
                                    } else {
                                        user.userName = req.body.userName
                                        user.favMeal = req.body.favMeal
                                        user.age = parseInt(req.body.age)
                                        user.password =  req.body.password
                                        user.save(function (err, user) {
                                            if (err) {
                                                // res.send("Error: ", err);
                                                // res.status(500).send('Internal Server Error') 
                                                console.log("error::password hashing")
                                            } else {
                                            // res.send("password updated successfully!");
                                            // res.send(user) 
                                            console.log("success::password hashed")
                                            }
                                        })
                                    }
                                
                                }, 
                                {useFindAndModify:false, new: false}
                                )

		if(!user) {

            res.status(404).send('Resource not found') // could not find this user
            
		} else {

			// sometimes we might wrap returned object in another object
            // res.send({user})
			res.send(user) 
		} 
	} catch (error) {
		console.log(error)
		res.status(500).send('Internal Server Error') // server error
	}
});

// TODO: Add more routes to get server data here.
// a POST route to *create* a post
app.post('/api/post', mongoChecker, async (req, res) => {

    // Create a new post using the Post mongoose model
    const post = new Post({
        userName: req.body.userName,
        profilePic: req.body.profilePic,
        title: req.body.title,
        category: req.body.category,
        desc: req.body.desc,
        datePosted: req.body.datePosted,
        ingredients: req.body.ingredients,
        steps: req.body.steps,
        reviews: req.body.reviews,
        likes: req.body.likes,
        dislikes: req.body.dislikes,
        creator: req.body.creator // creator id from the authenticate middleware
   
	})

    // Save post to the database
    // async-await version:
    try {
        const result = await post.save()
        console.log(result) 
        res.send(result)
    } catch(error) {
        console.log(error) // log server error to the console, not to the client.
        if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
        }
    }
})

// Update the given post from the database.
app.patch('/api/post/:id', async (req, res) => {
    console.log("PATCH request for /api/post/:id")

    const id = req.params.id

 	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	// Good practise: Validate id immediately
	if (!ObjectID.isValid(id)) {
		res.status(404).send() // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
    }

	// if id valid findById
	try {
		
        const post = await Post.findOneAndUpdate({_id: ObjectID(id)}, req.body,
                                function(err, post) {
                                    if (err) {
                                        return next(err)
                                    } else {
                                        post.userName = req.body.userName
                                        post.profilePic = req.body.profilePic
                                        post.title = req.body.title
                                        post.category =  req.body.category
                                        post.desc =  req.body.desc
                                        post.datePosted =  req.body.datePosted
                                        post.ingredients =  req.body.ingredients
                                        post.steps =  req.body.steps
                                        post.reviews =  req.body.reviews
                                        post.likes =  req.body.likes
                                        post.dislikes =  req.body.dislikes
                                        post.creator =  req.body.creator
                                        post.save(function (err, post) {
                                            if (err) {
                                                // res.send("Error: ", err);
                                                // res.status(500).send('Internal Server Error') 
                                                console.log("error")
                                            } else {
                                            // res.send("password updated successfully!");
                                            // res.send(user) 
                                            console.log("success")
                                            }
                                        })
                                    }
                                
                                }, 
                                {useFindAndModify:false, new: false}
                                )

		if(!post) {

            res.status(404).send('Resource not found') // could not find this post
            
		} else {

			// sometimes we might wrap returned object in another object
            // res.send({user})
			res.send(post) 
		} 
	} catch (error) {
		console.log(error)
		res.status(500).send('Internal Server Error') // server error
	}
});

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
