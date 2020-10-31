import React from "react";
import "../../actions/addRecipe"
import Recipe from "../Recipe/Recipe"
import { UnmountClosed } from "react-collapse";

import "./Post.css"
import ReviewList from "../ReviewList/ReviewList";

/**
 * A post of a recipe.
 *
 * Required props:
 *  - username {string} Name of the user viewing this post.
 *  - profilePic {string} Path to the profile picture of the user viewing this post.
 *  - post {Object} An Object containing data about this post.
 *      post: {
 *          username    {string}    Username of this recipe's writer.
 *          profilePic  {string}    Path to the profile picture of this recipe's writer.
 *          title       {string}    Title of this recipe.
 *          desc        {string}    Description of this recipe.
 *          ingredients {string[]}  List of ingredients needed to follow this recipe.
 *          steps       {string[]}  List of steps the recipe tells you to follow.
 *      }
 */
class Post extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isOpened: false,
            reviewsButton: "Reviews"
        }
    }

    /**
     * Show or hide the reviews.
     */
    toggleShowHide = () => {
        this.setState({isOpened: !this.state.isOpened});

        if (this.state.isOpened) {
            this.setState({reviewsButton: "Reviews"});
            console.log("hid review");
        } else {
            this.setState({reviewsButton: "Hide"});
            console.log("showed review");
        }
    }

    render() {
        // obtain the username and profile picture of the viewer and data of the post.
        const { username, profilePic, post } = this.props;

        return(
            <div className = "App">
                <div className ="block">
                    <img src={post.profilePic} className="profilePic"/>
                    <h3 className="username">{post.username}</h3>
                </div>
                <div className="block">

                    <Recipe
                        title={post.title}
                        desc={post.desc}
                        ingredients={post.ingredients}
                        steps={post.steps}
                    />
                    {/* buttons component, implementing next
                     <LikeButton />
                     <DislikeButton />
                     */}
                    <button onClick={this.toggleShowHide}>{this.state.reviewsButton}</button>
                    <UnmountClosed isOpened={this.state.isOpened}>
                        {/* TODO: rename post to postTitle (cascade) */}
                        <ReviewList username={username} profilePic={profilePic} post={post.title}/>
                    </UnmountClosed>
                </div>
            </div>
        );
    }

}

export default Post