/* Logic file for the Post component. */

import {lazy} from "react";

/**
 * Delete the post with the given _id.
 * This process should only succeed when the current user matches the given creator.
 *
 * @param {string} creator -- The ObjectID string of the given post's creator.
 * @param {string} postId -- The ObjectID string of the post to delete.
 * @param {Timeline} context -- The timeline component to re-render after updating.
 * @returns {Promise<void>}
 */
export const deletePost = async (creator, postId, context) => {
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

        // Re-render the timeline.
        context.componentDidMount().catch(error => console.error(error));

        console.log(`Deleted post: ${deletedPost}`);
    } catch (error) {
        console.error(error);
    }
}

/**
 * Have the current user dislike the given post.
 *
 * @param {string} postId -- The ObjectID string of the post to dislike.
 * @param {Timeline} context -- The timeline component to re-render after disliking.
 */
export const handleDislike = async (postId, context) => {
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

        // Re-render the timeline.
        context.componentDidMount().catch(error => console.error(error));

        console.log(`User ${data.user._id} disliked post ${data.post._id}`);
    } catch (error) {
        console.error(error);
    }
}

/**
 * Have the current user like the given post.
 *
 * @param {string} postId -- The ObjectID string of the post to like.
 * @param {Timeline} context -- The timeline component to re-render after liking.
 */
export const handleLike = async (postId, context) => {
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

        // Re-render the timeline.
        context.componentDidMount().catch(error => console.error(error));

        console.log(`User ${data.user._id} liked post ${data.post._id}`);
    } catch (error) {
        console.error(error);
    }
}
