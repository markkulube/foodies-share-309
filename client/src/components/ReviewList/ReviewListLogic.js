/* Logic files for the ReviewList component. */

export const updateStar = (reviewList, rating) => {
    console.log("update current rating to", rating);
    reviewList.setState({ currentRating: rating });
}
