import React from "react";

/* styles and images */
import "./style.css";
import profile from "../../../images/eggie.jpg";
import Stars from "../Stars";

/**
 * A review of a recipe post.
 *
 * Required props:
 *  - name      {string}    The username of this review.
 *  - content   {string}    The body of this review.
 *  - rating    {int}       The rating given to this review.
 */
export default class Review extends React.Component {

    render() {
        const { name, content, rating } = this.props;  // obtain username, review content, and rating

        return (
            <div>
                <div>
                    <img className={"profile"} src={profile} alt={"profile"}/>
                    {/* TODO: vertical line to visually "connect" reviews */}
                </div>
                <div>
                    <h1>{name}</h1>
                    <p>{content}</p>
                    {/* We pass in identity function for updateStar because we don't want anything to happen
                        when clicking the stars of an existing review. */}
                    <Stars rating={rating} updateStar={() => {}} parent={this}/>
                </div>
            </div>
        );
    }

}
