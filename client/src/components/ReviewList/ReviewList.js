import React from "react";
import { uid } from "react-uid";
import Stars from "./Stars/Stars";
import Review from "./Review/Review"

/* styles and images */
import "./ReviewList.css";

/* import logic */
import { updateStar, handleCreateReview } from "./ReviewListLogic";

/**
 * A list of reviews with a block to add a new review.
 *
 * Required props:
 *  - username      {string}    The username of user who is viewing and potentially adding a new review.
 *  - profilePic    {string}    The path to the profile picture of the user with the given name.
 *  - reviews       {string[]}  The existing list of reviews to display.
 */
export default class ReviewList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentRating: 0,
            content: "",
            reviews: []
        }
    }

    componentDidMount() {
        this.props.reviews.sort((a, b) => (new Date(b.datePosted)).getTime() - (new Date(a.datePosted)).getTime());
        this.setState({ reviews: this.props.reviews });
    }

    /**
     * Update the review content state with whatever is in the <textarea> input.
     */
    handleContentUpdate = (event) => {
        this.setState({ content: event.target.value });
    }

    render() {
        // get the username and profile picture of the user viewing this ReviewList.
        const { currentUser, postId } = this.props;
        const { content, currentRating } = this.state;

        return (
            <div id={"review-list-container"}>
                <div>
                    <br/>
                    <img id={"profile"} src={currentUser.profilePic} alt={"profile"}/>
                    <div>
                        <textarea onChange={this.handleContentUpdate} rows={4} cols={30}
                                  placeholder={"Write a review"}/>
                        <Stars rating={this.state.currentRating} updateStar={updateStar} parent={this}/>
                        <button onClick={() => handleCreateReview(this, content, currentRating, postId)}>
                            Post
                        </button>
                    </div>
                </div>
                <hr/>
                {
                    this.state.reviews.map(review => {
                        return (
                            <div key={uid(review)}>
                                <Review currentUser={currentUser} review={review} postId={postId} context={this}/>
                                <hr/>
                            </div>
                        );
                    })
                }
            </div>
        );
    }

}
