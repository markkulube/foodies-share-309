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
 * @param {ReviewList}  reviewList  The ReviewList to update.
 * @param {string}      username    Username of the review writer.
 * @param {string}      content     The content body of the review.
 * @param {int}         rating      The rating of the review.
 */
export const handleCreateReview = (reviewList, username, content, rating) => {
    console.log(username, "is posting a", rating, "star review");
    // TODO: Along with updates to state, add updates to server with POST request once API is implemented.

    const reviews = reviewList.state.reviews;
    const profilePic = reviewList.props.profilePic
    reviews.unshift({username: username, profilePic: profilePic, content: content, rating: rating})

    reviewList.setState({reviews: reviews});
}
