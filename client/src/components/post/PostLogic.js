/* Logic file for the Post component. */

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
    console.log(`Current user is deleting post ${postId}`);

    try {
        await fetch(new Request('/api/timeline/post', {
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

        // Re-render the timeline.
        context.componentDidMount().catch(error => console.error(error));
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
    console.log(`Current user is disliking post ${postId}`);

    try {
        await fetch(new Request('/api/timeline/dislike', {
            method: 'post',
            body: JSON.stringify({
                postId: postId
            }),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        }));

        // Re-render the timeline.
        context.componentDidMount().catch(error => console.error(error));
    } catch (error) {
        console.error(error);
    }
}

/**
 * Have the current user like the given post.
 *
 * @param {string} postId -- The ObjectID string of the post to like.
 * @param {Timeline} context -- The timeline component to re-render after liking.
 * @returns {Promise<void>}
 */
export const handleLike = async (postId, context) => {
    console.log(`Current user is liking post ${postId}`);

    try {
        await fetch(new Request('/api/timeline/like', {
            method: 'post',
            body: JSON.stringify({
                postId: postId
            }),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        }));

        // Re-render the timeline.
        context.componentDidMount().catch(error => console.error(error));
    } catch (error) {
        console.error(error);
    }
}

/**
 * Have the current user save the given post to their saved posts (favourites).
 *
 * @param {string} postId -- The ObjectID string of the post to save.
 * @returns {Promise<void>}
 */
export const handleSave = async (postId) => {
    try {
        const response = await fetch(new Request("/api/timeline/save", {
            method: "post",
            body: JSON.stringify({
                postId: postId
            }),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        }));
        const user = await response.json();

        console.log(`User ${user._id} saved post ${postId} to favourites.`);
    } catch (error) {
        console.error(error);
    }
}
