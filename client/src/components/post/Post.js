import React from "react";
import "../../actions/addRecipe"
import Recipe from "../Recipe/Recipe"
import { UnmountClosed } from "react-collapse";

import "./Post.css"
import ReviewList from "../ReviewList/ReviewList";

// logic imports
import { handleLikeDislike, deletePost } from "./PostLogic";
import { addtoFavourites } from "../../actions/addRecipe";

/**
 * A post of a recipe.
 *
 * Required props:
 *  - username      {string} Name of the user viewing this post.
 *  - profilePic    {string} Path to the profile picture of the user viewing this post.
 *  - post          {Object} A object containing data on this post.
 */
class Post extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isOpened: false,
            reviewsButton: "Reviews",  // text displayed on the show/hide reviews button
            liked: false,
            disliked: false
        }
    }

    componentDidMount() {
        const { post } = this.props;
        // determine status for like/dislike of this post
        const status = post.liked;

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
    renderLike = (liked) => {
        const { appState, username, post } = this.props;

        if (liked) {
            return <button className={"link green"}
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
    renderDislike = (disliked) => {
        const { appState, username, post } = this.props;

        if (disliked) {
            return <button className={"link red"}
                                    onClick={() => handleLikeDislike(this, appState, username, post, false)}>
                Dislike {post.dislikes}</button>;
        } else {
            return <button className={"link"}
                                    onClick={() => handleLikeDislike(this, appState, username, post, false)}>
                Dislike {post.dislikes}</button>;
        }
    }

    render() {
        const { username, profilePic, post, canSave } = this.props;

        // decide whether to render active or inactive like button
        const likeButton = this.renderLike(this.state.liked);

        // decide whether to render active or inactive dislike button
        const dislikeButton = this.renderDislike(this.state.disliked)
        
        return(
            <div className="App reviews-container">
            <br/>
                <div className ="block">
                    <img src={post.profilePic} className="profilePic" alt="profile picture"/>
                    <h3 className="username">{post.userName}</h3>
                    {canSave &&
                        <button className="save" onClick={() => console.log("Add to favourites")}>
                            Save to Favourites
                        </button>
                    }
                </div>
                <div className="block">
                    <Recipe
                        canEdit={username === post.userName}
                        title={post.title}
                        desc={post.desc}
                        category={post.category}
                        ingredients={post.ingredients}
                        steps={post.steps}
                        username={username}
                        datePosted={post.datePosted}
                    />
                </div>
                {likeButton}
                {dislikeButton}
                <button className="nonLike" onClick={this.toggleShowHide}>{this.state.reviewsButton}</button>
                { username === post.userName &&
                    <button className="delete red" onClick={() => deletePost(post.creator, post._id)}>Delete</button>
                }
                <UnmountClosed isOpened={this.state.isOpened}>
                    <ReviewList username={username} profilePic={profilePic} reviews={post.reviews}/>
                </UnmountClosed>
            </div>
        );
    }

}

export default Post