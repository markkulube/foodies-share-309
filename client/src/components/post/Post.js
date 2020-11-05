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
 *          category    {string}    The category this recipe belongs to.
 *          desc        {string}    Description of this recipe.
 *          datePosted  {Date}      The date and time this recipe was posted to Foodies.
 *          ingredients {string[]}  List of ingredients needed to follow this recipe.
 *          steps       {string[]}  List of steps the recipe tells you to follow.
 *          reviews     {Object[]}  list of reviews on this recipe.
 *      }
 */
class Post extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isOpened: false,
            reviewsButton: "Reviews",  // state of the reviews button
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
        const { username, profilePic, post, appState } = this.props;

        return(
            <div className = "App">
                <div className ="block">
                    <img src={post.profilePic} className="profilePic"/>
                    <h3 className="username">{post.username}</h3>
                </div>
                <div className="block">

                    <Recipe
                        canEdit={username === post.username}
                        title={post.title}
                        desc={post.desc}
                        ingredients={post.ingredients}
                        steps={post.steps}
                        appState={appState}
                        username={username}
                        datePosted={post.datePosted}
                    />
                    <button>Like</button>
                    <button>Dislike</button>
                    <button onClick={this.toggleShowHide}>{this.state.reviewsButton}</button>
                    <UnmountClosed isOpened={this.state.isOpened}>
                        <ReviewList username={username} profilePic={profilePic} reviews={post.reviews}/>
                    </UnmountClosed>
                </div>
            </div>
        );
    }

}

export default Post