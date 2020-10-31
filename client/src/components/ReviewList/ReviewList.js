import React from "react";
import { uid } from "react-uid";
import Stars from "./Stars/Stars";
import Review from "./Review/Review"

/* styles and images */
import "./ReviewList.css";

/* import logic */
import { updateStar, handleCreateReview, reviews } from "./ReviewListLogic";

/**
 * A list of reviews with a block to add a new review.
 *
 * Required props:
 *  - username      {string}    The username of user who is viewing and potentially adding a new review.
 *  - profilePic    {string}    The path to the profile picture of the user with the given name.
 *  - post          {string}    The unique identifier of the post this list of reviews are for.
 */
export default class ReviewList extends React.Component {

    constructor(props) {
        super(props);

        // TODO: implement API call to obtain a list of all reviews for the given post.
        // const reviews = getReviewsAPI(this.props.post);

        this.state = {
            currentRating: 0,  // rating of the current in-progress review
            content: "",  // content of the current in-progress review
            reviews: reviews  // list of existing reviews  TODO: replace with data from API call above
        }
    }

    /**
     * Update the review content state with whatever is in the <textarea> input.
     */
    handleContentUpdate = (event) => {
        this.setState({ content: event.target.value });
    }

    render() {
        // get the username and profile picture of the user viewing the ReviewList of the obtained post.
        const { username, profilePic, post } = this.props;

        return(
            <div id={"review-list-container"}>
                <div>
                    <img id={"profile"} src={profilePic} alt={"profile"}/>
                    <div>
                        <textarea onChange={this.handleContentUpdate} rows={4} cols={30}
                                  placeholder={"Write a review"}/>
                        <Stars rating={this.state.currentRating} updateStar={updateStar} parent={this}/>
                        <button onClick={() =>
                            handleCreateReview(this, username, post, this.state.content, this.state.currentRating)}>
                            Post
                        </button>
                    </div>
                </div>
                <hr/>
                {
                    this.state.reviews.map(review => {
                        return (
                            <div key={uid(review)}>
                                <Review username={review.username}
                                        content={review.content}
                                        rating={review.rating}/>
                                <hr/>
                            </div>
                        );
                    })
                }
            </div>
        );
    }

}
