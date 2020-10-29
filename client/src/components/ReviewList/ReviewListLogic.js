/* Logic files for the ReviewList component. */

// TODO: Mock data - remove once API calls are implemented in handlePostReview
const reviews = [
    {name: "Eddie", content: "This is the review body.", rating: 4},
    {name: "Mark", content: "This dish is seriously lacking some taste...", rating: 2},
    {name: "Brandon", content: "Wow, this dish is amazing. Please lend me the recipe!", rating: 5}
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
 * Post a new review for the given post under the given user name with the given content and rating. Update the given
 * ReviewList with the new post.
 *
 * @param {ReviewList}  reviewList  The ReviewList to update.
 * @param {string}      name        Name of the review writer.
 * @param {string}      post        The post the review is for.  TODO: probably need to change identifier here
 * @param {string}      content     The content body of the review.
 * @param {int}         rating      The rating of the review.
 */
export const handlePostReview = (reviewList, name, post, content, rating) => {
    console.log(name, "is posting a", rating, "star review");
    // TODO: This is where we will perform a POST API call to add the new review to data. For now, we will identify
    //  posts by their title (param: post) and the username of said post (param: name). This will probably need to
    //  change to a unique ID of some sort when we implement the backend.

    // TODO: adding to mock data, remove once API calls are implemented.
    reviews.unshift({name: name, content: content, rating: rating});
    reviewList.setState({reviews: reviews});
}
