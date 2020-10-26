/* Logic files for the ReviewList component. */

// TODO: Mock data - remove once API calls are implemented in handlePostReview
const reviews = [
    {name: "Eddie Shao", content: "This is the review body.", rating: 4},
    {name: "Mark Kulube", content: "This dish is seriously lacking some taste...", rating: 2},
    {name: "Brandon Jozwik", content: "Wow, this dish is amazing. Please lend me the recipe!", rating: 5}
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
 * @param {string}      name        Name of the review writer.  TODO: POST name depending on how Keren passes it in
 * @param {TBD}         post        The post the review is for.  TODO: change TBD to what Keren decides to pass in
 * @param {string}      content     The content body of the review.
 * @param {int}         rating      The rating of the review.
 */
export const handlePostReview = (reviewList, name, post, content, rating) => {
    console.log(name, "is posting a", rating, "star review");
    // TODO: implement function with mock API call
    reviews.unshift({name: "\<current user\>", content: content, rating: rating});
    reviewList.setState({reviews: reviews});
}
