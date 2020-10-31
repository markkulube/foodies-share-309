import React from "react";

/* styles and images */
import "./Review.css";
import Stars from "../Stars/Stars";
import profilePic from "../../../images/profile.png"

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
        const { username, content, rating } = this.props;  // obtain username, review content, and rating

        // TODO: implement API call to obtain the profile picture of the user with the given username.
        //  Replace src of <img> below with this profile picture.
        // const profilePic = getProfilePicAPI(username);

        return (
            <div>
                <img className={"profile"} src={profilePic} alt={"profile"}/>  {/* TODO: replace profilePic */}
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
