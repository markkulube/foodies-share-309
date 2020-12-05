/* Logic files for the ReviewList component. */

/**
 * Update the stars displayed to the ReviewList with the given rating.
 *
 * @param {ReviewList}  reviewList  The ReviewList to update.
 * @param {int}         rating      The rating to update to.
 */
export const updateStar = (reviewList, rating) => {
    console.log("update current rating to", rating);
    reviewList.setState({ currentRating: rating });
}

/**
 * Post a new review for the given post under the given username with the given content and rating. Update the given
 * ReviewList with the new post.
 *
 * @param {ReviewList}  context     The review list holding this
 * @param {string}      content     The content body of the review.
 * @param {int}         rating      The rating of the review.
 * @param {string}      postId      The ObjectID string of the post to write a review for.
 */
export const handleCreateReview = async (context, content, rating, postId) => {
    console.log(`Current user is posting a ${rating} star review for post ${postId}`);

    try {
        const response = await fetch(new Request("/api/timeline/review", {
            method: 'post',
            body: JSON.stringify({
                content: content,
                rating: rating,
                postId: postId
            }),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        }));
        const reviews = await response.json();

        // Sort reviews by (descending) date posted.
        reviews.sort((a, b) => (new Date(b.datePosted)).getTime() - (new Date(a.datePosted)).getTime());

        context.setState({ reviews: reviews });
    } catch (error) {
        console.error(error);
    }
}
