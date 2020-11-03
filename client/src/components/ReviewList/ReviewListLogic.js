/* Logic files for the ReviewList component. */

// TODO: Mock data - remove once API calls are implemented in handlePostReview
export const reviews = [
    {username: "Keren", content: "Very tasty and light, I didn't feel groggy after eating.", rating: 4},
    {username: "Mark", content: "This dish is seriously lacking some taste...", rating: 2},
    {username: "Brandon", content: "Wow, this dish is amazing. Please lend me the recipe!", rating: 5}
]

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
    // TODO: This is where we will perform a POST API call to add the new review to data. For now, we will identify
    //  posts by their title (param: post) and the username of said post (param: name). This will probably need to
    //  change to a unique ID of some sort when we implement the backend.

    // TODO: adding to mock data, replace with API calls.
    const reviews = reviewList.state.reviews;
    reviews.unshift({username: username, content: content, rating: rating})

    // TODO: this will instead be settings state to what we obtain from a GET request for the reviews of given post
    reviewList.setState({reviews: reviews});
}
