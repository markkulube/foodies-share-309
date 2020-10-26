import React from "react";
import { uid } from "react-uid";
import Stars from "./Stars";
import Review from "./Review"

/* styles and images */
import "./style.css";
import profile from "../../images/eggie.jpg";

/* import logic */
import { updateStar, handlePostReview } from "./ReviewListLogic";

export default class ReviewList extends React.Component {

    constructor(props) {
        super(props);

        // Note: calling handleFilter (aka. calling setState) in constructor somehow doesn't update the state.
        //  Therefore, we need to make a manual API call to retrieve initial list of reviews.
        const initReviews = [  // TODO: replace this with API call to retrieve reviews
            {name: "Eddie Shao", content: "This is the review body.", rating: 4},
            {name: "Mark Kulube", content: "This dish is seriously lacking some taste...", rating: 2},
            {name: "Brandon Jozwik", content: "Wow, this dish is amazing. Please lend me the recipe!", rating: 5}
        ]
        this.state = {
            currentRating: 0,  // rating of the current in-progress review
            content: "",  // content of the current in-progress review
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
        const { name, post } = this.props;  // obtain the name of the reviewer and the post they are reviewing

        return(
            <div id={"review-list-container"}>
                <button>close</button>
                <hr/>
                <div>  {/* the block to write a review */}
                    <div>
                        <img id={"profile"} src={profile} alt={"profile"}/>
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