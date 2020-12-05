/* This file contains the router for /api/timeline API calls. */
"use strict";

// Create express router.
const express = require('express');
const router = express.Router();

// Import required mongoose models.
const { User } = require("../models/user");
const { Post } = require("../models/post");

// Use this to compare ObjectID values.
const { ObjectID } = require("mongodb");

// Import helpers and middleware.
const { isMongoError, mongoChecker } = require("./helpers/mongoHelpers");
const { authenticate } = require("./helpers/authentication");

/**
 * GET request for obtaining all existing posts.
 */
router.get("/post", mongoChecker, async (req, res) => {
    console.log("GET request for api/timeline/post");

    try {
        res.send(await Post.find());
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});

/**
 * DELETE request for deleting the given post.
 *
 * @param {string} req.body.creator -- The ObjectID string for the user who created this post.
 * @param {string} req.body.postId -- The ObjectID string for the post being deleted.
 */
router.delete("/post", mongoChecker, authenticate, async (req, res) => {
    console.log("DELETE request for api/timeline/post");

    if (!ObjectID(req.user._id).equals(ObjectID(req.body.creator))) {
        res.status(401).send("Unauthorized");
        return;
    }

    try {
        res.send(await Post.findOneAndRemove({ _id: ObjectID(req.body.postId) }));

        // Update all users who have interacted with this post in some way.
        // Note: Reviews of a post will be deleted automatically since Review is a sub-document of Post.
        const response = await User.updateMany(
            { $or: [
                    { savedPosts: { $in: req.body.postId } },
                    { likedPosts: { $in: req.body.postId } },
                    { dislikedPosts: { $in: req.body.postId } }
                ] },
            { $pull: {
                    "savedPosts": req.body.postId,
                    "likedPosts": req.body.postId,
                    "dislikedPosts": req.body.postId
                } }
        );

        console.log(`Matched ${response.n} documents and updated ${response.nModified} documents`);
    } catch (error) {
        console.error(error);
        if (isMongoError(error)) {
            res.status(500).send('Internal server error');
        } else {
            res.status(400).send('Bad Request');  // 400 for bad request gets sent to client.
        }
    }
});

/**
 * POST request for liking the given post.
 *
 * @param {string} req.body.postId -- The ObjectID string of the post to like.
 */
router.post("/like", mongoChecker, authenticate, async (req, res) => {
    console.log("POST request for api/timeline/like");

    // Check if postId is even defined.
    let postId;
    req.body.postId ? postId = req.body.postId : res.status(400).send("Bad request (0)");

    let post, user;
    try {
        if (req.user.likedPosts.find(pId => ObjectID(pId).equals(ObjectID(postId)))) {
            // If post is already liked by current user, un-like it.
            post = await Post.findOneAndUpdate(
                { _id: postId },
                { $inc: { "likes": -1 } },
                { new: true, useFindAndModify: false }
            );
            if (!post) {
                res.status(400).send("Bad request (5.1)");
                return;
            }

            user = await User.findOneAndUpdate(
                { _id: req.user._id },
                { $pull: { "likedPosts": postId } },
                { new: true, useFindAndModify: false }
            );
            if (!user) {
                res.status(400).send("Bad request (5.2)");
            }
        } else {
            // If the user has previously disliked the post, remove the dislike from said user and post.
            if (req.user.dislikedPosts.find(pId => ObjectID(pId).equals(ObjectID(postId)))) {
                post = await Post.findOneAndUpdate(
                    { _id: postId },
                    { $inc: { "dislikes": -1 } },
                    { new: true, useFindAndModify: false }
                );
                if (!post) {
                    res.status(400).send("Bad request (4.1)");
                    return;
                }

                user = await User.findOneAndUpdate(
                    { _id: req.user._id },
                    { $pull: { "dislikedPosts": postId } },
                    { new: true, useFindAndModify: false }
                );
                if (!user) {
                    res.status(400).send("Bad request (4.2)");
                }
            }

            // Find the post with the given _id. If no match is found, terminate with bad request (400).
            // Then, increment the given post's likes by 1.
            post = await Post.findOneAndUpdate(
                { _id: postId },
                { $inc: { "likes": 1 } },
                { new: true, useFindAndModify: false }
            );
            if (!post) {
                res.status(400).send("Bad request (2)");
                return;
            }

            // Add the given _id to the current user's likedPosts.
            user = await User.findOneAndUpdate(
                { _id: req.user._id },
                { $push: { "likedPosts": postId } },
                { new: true, useFindAndModify: false }
            );
            if (!user) {
                res.status(400).send("Bad request (3)");
            }
        }

        // Update the current session.
        req.session.user = user;

        res.send({ user: user, post: post });
    } catch (error) {
        console.error(error);
        if (isMongoError(error)) {
            res.status(500).send('Internal server error');
        } else {
            res.status(400).send('Bad Request');  // 400 for bad request gets sent to client.
        }
    }
});

/**
 * POST request for disliking the given post.
 *
 * @param {string} req.body.postId -- The ObjectID string of the post to dislike.
 */
router.post("/dislike", mongoChecker, authenticate, async (req, res) => {
    console.log("POST request for api/timeline/dislike");

    // Check if postId is even defined.
    let postId;
    req.body.postId ? postId = req.body.postId : res.status(400).send("Bad request (0)");

    let post, user;
    try {
        if (req.user.dislikedPosts.find(pId => ObjectID(pId).equals(ObjectID(postId)))) {
            // If post is already disliked by current user, un-dislike it.
            post = await Post.findOneAndUpdate(
                { _id: postId },
                { $inc: { "dislikes": -1 } },
                { new: true, useFindAndModify: false }
            );
            if (!post) {
                res.status(400).send("Bad request (5.1)");
                return;
            }

            user = await User.findOneAndUpdate(
                { _id: req.user._id },
                { $pull: { "dislikedPosts": postId } },
                { new: true, useFindAndModify: false }
            );
            if (!user) {
                res.status(400).send("Bad request (5.2)");
            }
        } else {
            // If the user has previously liked the post, remove the like from said user and post.
            if (req.user.likedPosts.find(pId => ObjectID(pId).equals(ObjectID(postId)))) {
                post = await Post.findOneAndUpdate(
                    { _id: postId },
                    { $inc: { "likes": -1 } },
                    { new: true, useFindAndModify: false }
                );
                if (!post) {
                    res.status(400).send("Bad request (4.1)");
                    return;
                }

                user = await User.findOneAndUpdate(
                    { _id: req.user._id },
                    { $pull: { "likedPosts": postId } },
                    { new: true, useFindAndModify: false }
                );
                if (!user) {
                    res.status(400).send("Bad request (4.2)");
                }
            }

            // Find the post with the given _id. If no match is found, terminate with bad request (400).
            // Then, increment the given post's dislikes by 1.
            post = await Post.findOneAndUpdate(
                { _id: postId },
                { $inc: { "dislikes": 1 } },
                { new: true, useFindAndModify: false }
            );
            if (!post) {
                res.status(400).send("Bad request (2)");
                return;
            }

            // Add the given _id to the current user's dislikedPosts.
            user = await User.findOneAndUpdate(
                { _id: req.user._id },
                { $push: { "dislikedPosts": postId } },
                { new: true, useFindAndModify: false }
            );
            if (!user) {
                res.status(400).send("Bad request (3)");
            }
        }

        // Update the current session.
        req.session.user = user;
        res.send();
    } catch (error) {
        console.error(error);
        if (isMongoError(error)) {
            res.status(500).send('Internal server error');
        } else {
            res.status(400).send('Bad Request');  // 400 for bad request gets sent to client.
        }
    }
});

/**
 * POST request to save the given post to the current user's saved posts.
 *
 * @param {string} req.body.postId -- The ObjectID of the post to save.
 */
router.post("/save", mongoChecker, authenticate, async (req, res) => {
    console.log("POST request for /api/timeline/save");

    try {
        const user = await User.findOneAndUpdate(
            { _id: req.user._id, savedPosts: { $nin: req.body.postId } },  // Ensures unique postId's
            { $push: { "savedPosts": req.body.postId } },
            { new: true, useFindAndModify: false }
        );
        if (!user) {
            res.status(400).send("Bad request");
        } else {
            res.send(user);
        }
    } catch (error) {
        console.error(error);
        if (isMongoError(error)) {
            res.status(500).send('Internal server error');
        } else {
            res.status(400).send('Bad Request');  // 400 for bad request gets sent to client.
        }
    }
});

/**
 * POST request to create a new review for the given post.
 *
 * @param {string} content -- The content of the review.
 * @param {Number} rating -- The rating given from 0-5. If a 0-star rating is given, convert it to a 1-star rating.
 * @param {string} postId -- The ObjectID string of the post this review is for.
 */
router.post("/review", mongoChecker, authenticate, async (req, res) => {
    console.log("POST request for api/timeline/review");

    const review = {
        userName: req.user.userName,
        profilePic: req.user.profilePic,
        content: req.body.content,
        datePosted: new Date(),
        rating: req.body.rating ? req.body.rating : 1,
        creator: req.user._id
    };

    try {
        const post = await Post.findOneAndUpdate(
            { _id: req.body.postId },
            { $push: { "reviews": review } },
            { new: true, useFindAndModify: false }
        );
        if (!post) {
            res.status(400).send("Bad request");
        } else {
            res.send(post.reviews);
        }
    } catch (error) {
        console.error(error);
        if (isMongoError(error)) {
            res.status(500).send('Internal server error');
        } else {
            res.status(400).send('Bad Request');  // 400 for bad request gets sent to client.
        }
    }
});

/**
 * DELETE request to remove a review.
 *
 * @param {string} postId -- The ObjectID string of the post the given review is for.
 * @param {string} reviewId -- The ObjectID string of the review to remove.
 */
router.delete("/review", mongoChecker, authenticate, async (req, res) => {
    console.log("DELETE request for /api/timeline/review");

    try {
        const post = await Post.findOneAndUpdate(
            { _id: req.body.postId },
            { $pull: { "reviews": { _id: req.body.reviewId } } },
            { new: true, useFindAndModify: false }
        );
        if (!post) {
            res.status(400).send("Bad request");
        } else {
            res.send(post.reviews);
        }
    } catch (error) {
        console.error(error);
        if (isMongoError(error)) {
            res.status(500).send('Internal server error');
        } else {
            res.status(400).send('Bad Request');  // 400 for bad request gets sent to client.
        }
    }
});

module.exports = router;
