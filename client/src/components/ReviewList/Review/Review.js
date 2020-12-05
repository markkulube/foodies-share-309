import React from "react";

/* styles and images */
import "./Review.css";
import Stars from "../Stars/Stars";

// Import logic.
import { ObjectID } from "mongodb";

/**
 * A review of a recipe post.
 *
 * Required props:
 *  - username  {string}    The username of who wrote this review.
 *  - content   {string}    The body of this review.
 *  - rating    {int}       The rating given to this review.
 */
export default class Review extends React.Component {

    deletePost = async () => {
        const { postId, review, context } = this.props;
        console.log(`Current user is deleting review ${review._id} from post ${postId}`);

        try {
            const response = await fetch(new Request("/api/timeline/review", {
                method: 'delete',
                body: JSON.stringify({
                    postId: postId,
                    reviewId: review._id
                }),
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                }
            }));
            const reviews = await response.json();

            // We don't need to sort by date posted, since it was already sorted to begin with.
            context.setState({ reviews: reviews });
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        // obtain username and profile of the current user, and the content and rating of the in-progress review.
        const { currentUser, review } = this.props;

        return (
            <div>
                <img className={"profile"} src={review.profilePic} alt={"profile"}/>
                <div>
                    <h1>{review.username}</h1>
                    <p>{review.content}</p>
                    {/* We pass in the identity function for updateStar because we don't want anything to happen
                        when clicking the stars of an existing review. */}
                    <Stars rating={review.rating} updateStar={() => {}} parent={this}/>
                </div>
                { ObjectID(currentUser._id).equals(ObjectID(review.creator)) &&
                    <a onClick={this.deletePost} className={"review-delete"}>Delete</a>
                }
            </div>
        );
    }

}
