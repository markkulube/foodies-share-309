import React from "react";

/* styles and images */
import "./Review.css";
import Stars from "../Stars/Stars";

/**
 * A review of a recipe post.
 *
 * Required props:
 *  - username  {string}    The username of who wrote this review.
 *  - content   {string}    The body of this review.
 *  - rating    {int}       The rating given to this review.
 */
export default class Review extends React.Component {

    render() {
        // obtain username and profile of the current user, and the content and rating of the in-progress review.
        const { username, profilePic, content, rating } = this.props;

        return (
            <div>
                <img className={"profile"} src={profilePic} alt={"profile"}/>
                <div>
                    <h1>{username}</h1>
                    <p>{content}</p>
                    {/* We pass in the identity function for updateStar because we don't want anything to happen
                        when clicking the stars of an existing review. */}
                    <Stars rating={rating} updateStar={() => {}} parent={this}/>
                </div>
            </div>
        );
    }

}
