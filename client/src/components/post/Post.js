import React from "react";
import "../../actions/addRecipe"
import Recipe from "../Recipe/Recipe"
import { UnmountClosed } from "react-collapse";

import "./Post.css"
import ReviewList from "../ReviewList/ReviewList";

// logic imports
import { handleLikeDislike, getLikeStatus } from "./PostLogic";

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
            liked: false,
            disliked: false
        }
    }

    /**
     * Determine whether or not each of the like and dislike buttons are already clicked.
     */
    componentDidMount() {
        const { appState, username, post } = this.props;
        // determine status for like/dislike of this post
        const status = getLikeStatus(this, appState.accounts, username, post);

        switch (status) {
            case 0:  // disliked
                this.setState({ disliked: true });
                break;
            case 1:  // liked
                this.setState({ liked: true });
                break;
            default:
                // neither is clicked, pass
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

    /**
     * Render an activated or deactivated like button depending on the state.
     *
     * @param liked {boolean} Whether or not this post is liked or not.
     */
    renderLike(liked) {
        const { appState, username, post } = this.props;

        if (liked) {
            return <button className={"link liked"}
                           onClick={() => handleLikeDislike(this, appState, username, post, true)}>
                Like {post.likes}</button>;
        } else {
            return <button className={"link"}
                           onClick={() => handleLikeDislike(this, appState, username, post, true)}>
                Like {post.likes}</button>;
        }
    }

    /**
     * Render an activated or deactivated dislike button depending on the state.
     *
     * @param disliked {boolean} Whether or not this post is disliked or not.
     */
    renderDislike(disliked) {
        const { appState, username, post } = this.props;

        if (disliked) {
            return <button className={"link disliked"}
                                    onClick={() => handleLikeDislike(this, appState, username, post, false)}>
                Dislike {post.dislikes}</button>;
        } else {
            return <button className={"link"}
                                    onClick={() => handleLikeDislike(this, appState, username, post, false)}>
                Dislike {post.dislikes}</button>;
        }
    }

    render() {
        // obtain the username and profile picture of the viewer and data of the post.
        const { username, profilePic, post, appState } = this.props;

        // decide to render active or inactive like button
        const likeButton = this.renderLike(this.state.liked);

        // decide to render active or inactive dislike button
        const dislikeButton = this.renderDislike(this.state.disliked)

        return(
            <div className = "App">
                <div className ="block">
                    <img src={post.profilePic} className="profilePic"/>
                    <h3 className="username">{post.userName}</h3>
                </div>
                <div className="block">

                    <Recipe
                        canEdit={username === post.userName}
                        title={post.title}
                        desc={post.desc}
                        ingredients={post.ingredients}
                        steps={post.steps}
                        appState={appState}
                        username={username}
                        datePosted={post.datePosted}
                    />
                    {likeButton}
                    {dislikeButton}
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