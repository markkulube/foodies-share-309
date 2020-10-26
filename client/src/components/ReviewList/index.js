import React from "react";
import Stars from "./Stars";

/* styles and images */
import "./style.css";
import profile from "../../images/eggie.jpg";

/* import logic */
import { updateStar } from "./ReviewListLogic";

export default class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentRating: 0,  // rating of the current in-progress review
            reviewContent: ""  // content of the current in-progress review
        }
    }

    /**
     * Update the review content state with whatever is in the <textarea> input.
     */
    handleContentUpdate = (event) => {
        this.setState({ reviewContent: event.target.value });
    }

    render() {
        return(
            <div id={"review-list-container"}>
                <button>close</button>
                <hr/>
                <div>  {/* the block to write a review */}
                    <img id={"profile"} src={profile} alt={"profile"}/>
                    <div>
                        <textarea onChange={this.handleContentUpdate} rows={8} cols={30}
                                  placeholder={"Write a review"}/>
                        <Stars rating={this.state.currentRating} updateStar={updateStar} parent={this}/>
                        <button>Post</button>
                    </div>
                </div>
                {/* TODO: list of <Review/>'s */}
            </div>
        );
    }

}