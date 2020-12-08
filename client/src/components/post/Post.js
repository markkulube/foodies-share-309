import React from "react";
import "../../actions/addRecipe"
import Recipe from "../Recipe/Recipe"
import ModalPosts from "../ModalPosts/ModalPosts"
import { UnmountClosed } from "react-collapse";

import "./Post.css"
import ReviewList from "../ReviewList/ReviewList";

// logic imports
import { handleLike, handleDislike, deletePost, handleSave } from "./PostLogic";
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
            disliked: false,
            modalDisplay: false,
            users: [],
            userName: ""
        }

        this.showModalPosts = this.showModalPosts.bind(this)  
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

        this.setState({
            userName: this.props.post.userName
        })
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
        const { post, context } = this.props;

        if (liked) {
            return <button className={"link green"}
                           onClick={() => handleLike(post._id, context)}>
                Like {post.likes}</button>;
        } else {
            return <button className={"link"}
                           onClick={() => handleLike(post._id, context)}>
                Like {post.likes}</button>;
        }
    }

    /**
     * Render an activated or deactivated dislike button depending on the state.
     *
     * @param disliked {boolean} Whether or not this post is disliked or not.
     */
    renderDislike = (disliked) => {
        const { post, context } = this.props;

        if (disliked) {
            return <button className={"link red"}
                                    onClick={() => handleDislike(post._id, context)}>
                Dislike {post.dislikes}</button>;
        } else {
            return <button className={"link"}
                                    onClick={() => handleDislike(post._id, context)}>
                Dislike {post.dislikes}</button>;
        }
    }

    // Handle click event that renders a modal box display user timeline.
    showModalPosts(e) {

        let row = e.target.name

       /*  if (!this.state.modalDisplay) {
            let userName = document.getElementById("username"+row).innerHTML
            this.setState({
                currentUser: userName
            }
            )
        } */

        this.setState({
            modalDisplay: !this.state.modalDisplay
          });     
    }

    render() {
        let { currentUser, post, canSave, context } = this.props;
        const canEdit = ((typeof currentUser)!=='undefined') && (currentUser !== null) && (currentUser.userName === post.userName)

        if(canEdit && (post.userName===currentUser.userName))
        {
            canSave=false;
        }

        // decide whether to render active or inactive like button
        const likeButton = this.renderLike(this.state.liked);

        // decide whether to render active or inactive dislike button
        const dislikeButton = this.renderDislike(this.state.disliked)
       

        return(
            <div className="App reviews-container">
            <br/>
                <div className ="block">
                    <img onClick={this.showModalPosts} src={post.profilePic} className="profilePic" alt="profile picture"/>
                    <h3 className="username">{post.userName}</h3>
                    {canSave &&
                        <button className="save" onClick={() => handleSave(post._id)}>
                            Save to Favourites
                        </button>
                    }
                </div>
                <div className="block">
                    <Recipe
                        canEdit={canEdit}
                        title={post.title}
                        desc={post.desc}
                        category={post.category}
                        ingredients={post.ingredients}
                        steps={post.steps}
                        datePosted={post.datePosted}
                        userName={post.userName}
                        profilePic={post.profilePic}
                        reviews = {post.reviews}
                        likes = {post.likes}
                        dislikes = {post.dislikes}
                        creator = {post.creator}
                        id = {post._id}
                    />
                </div>
                {likeButton}
                {dislikeButton}
                <button className="nonLike" onClick={this.toggleShowHide}>{this.state.reviewsButton}</button>
                { canEdit &&
                    <button className="delete red" onClick={() => deletePost(post.creator, post._id, context)}>Delete</button>
                }
                <UnmountClosed isOpened={this.state.isOpened}>
                    <ReviewList currentUser={currentUser} reviews={post.reviews} postId={post._id}/>
                </UnmountClosed>
                <ModalPosts currentUser={this.state.userName} app={this.state} onClose={this.showModalPosts} show={this.state.modalDisplay}>Message in Modal</ModalPosts>
            </div>
        );
    }

}

export default Post