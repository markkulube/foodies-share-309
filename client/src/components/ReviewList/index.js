import React from "react";
import { uid } from "react-uid";
import Stars from "./Stars";
import Review from "./Review"

/* styles and images */
import "./style.css";

/* import logic */
import { updateStar, handlePostReview } from "./ReviewListLogic";

/**
 * A list of reviews with a block to add a new review.
 *
 * Required props:
 *  - name          {string}    The username of whom is viewing and potentially adding a new review.
 *  - profilePic    {string}    The path to the profile picture of the user with the given name.
 *  - post          {string}    The unique identifier of the post this list of reviews are for.
 *  TODO: post is just a name for now, change it to whatever unique identifier we end up using later on
 */
export default class ReviewList extends React.Component {

    constructor(props) {
        super(props);

        // Note: calling handleFilter (aka. calling setState) in constructor somehow doesn't update the state.
        //  Therefore, we need to make a manual API call to retrieve initial list of reviews.
        this.state = {
            currentRating: 0,  // rating of the current in-progress review
            content: "",  // content of the current in-progress review
            // TODO: replace initReviews with API call to retrieve reviews
            reviews: initReviews  // list of existing reviews
        }
    }

    /**
     * Update the review content state with whatever is in the <textarea> input.
     */
    handleContentUpdate = (event) => {
        this.setState({ content: event.target.value });
    }

    render() {
        const { name, profilePic, post } = this.props;  // obtain the name of the reviewer and the post they are reviewing

        return(
            <div id={"review-list-container"}>
                <div>  {/* the block to write a review */}
                    <div>
                        <img id={"profile"} src={profilePic} alt={"profile"}/>
                        {/* TODO: vertical line to visually "connect" reviews */}
                    </div>
                    <div>
                        <textarea onChange={this.handleContentUpdate} rows={4} cols={30}
                                  placeholder={"Write a review"}/>
                        <Stars rating={this.state.currentRating} updateStar={updateStar} parent={this}/>
                        <button onClick={() =>
                            handlePostReview(this, name, post, this.state.content, this.state.currentRating)}>
                            Post
                        </button>
                    </div>
                </div>
                <hr/>
                {
                    this.state.reviews.map(review => {
                        return (
                            <div key={uid(review)}>
                                <Review name={review.name} content={review.content} rating={review.rating}/>
                                <hr/>
                            </div>
                        );
                    })
                }
            </div>
        );
    }

}

// TODO: mock data - remove once API calls are implemented
const initReviews = [
    {name: "Eddie", content: "This is the review body.", rating: 4},
    {name: "Mark", content: "This dish is seriously lacking some taste...", rating: 2},
    {name: "Brandon", content: "Wow, this dish is amazing. Please lend me the recipe!", rating: 5}
]