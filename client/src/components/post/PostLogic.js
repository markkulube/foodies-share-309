/* Logic file for the Post component. */

import {lazy} from "react";

/**
 * Delete the post with the given _id.
 * This process should only succeed when the current user matches the given creator.
 *
 * @param {string} creator -- The ObjectID string of the given post's creator.
 * @param {string} postId -- The ObjectID string of the post to delete.
 * @returns {Promise<void>}
 */
export const deletePost = async (creator, postId) => {
    try {
        const response = await fetch(new Request('/api/timeline/post', {
            method: 'delete',
            body: JSON.stringify({
                creator: creator,
                postId: postId
            }),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        }));
        const deletedPost = await response.json();

        console.log(`Deleted post: ${deletedPost}`);
    } catch (error) {
        console.error(error);
    }
}

/**
 * Have the current user dislike the given post.
 *
 * @param {string} postId -- The ObjectID string of the post to dislike.
 */
export const handleDislike = async postId => {
    try {
        const response = await fetch(new Request('/api/timeline/dislike', {
            method: 'post',
            body: JSON.stringify({
                postId: postId
            }),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        }));
        const data = await response.json();

        console.log(`User ${data.user._id} disliked post ${data.post._id}`);
    } catch (error) {
        console.error(error);
    }
}

/**
 * Have the current user like the given post.
 *
 * @param {string} postId -- The ObjectID string of the post to like.
 */
export const handleLike = async postId => {
    try {
        const response = await fetch(new Request('/api/timeline/like', {
            method: 'post',
            body: JSON.stringify({
                postId: postId
            }),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        }));
        const data = await response.json();

        console.log(`User ${data.user._id} liked post ${data.post._id}`);
    } catch (error) {
        console.error(error);
    }
}
