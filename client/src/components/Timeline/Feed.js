import React from "react";
import { uid } from "react-uid";
import { Link } from "react-router-dom";
import Post from "../post/Post.js"
import "./Feed.css";

/**
 * The main section of the Timeline page containing a collection of posts.
 *
 * Required props:
 *  - posts                 {Object[]}          A list of post objects.
 *  - profilePic            {string}            Path to the profile picture of the given user.
 *  - username              {string}            Name of the user viewing this Feed.
 *  - handleSearchFilter    {function}          The callback to invoke when search bar input is changed (onChange)
 *  - parent                {React.Component}   The parent component to call handleSearchFilter for.
 *  - deletePost            {function}          The function to delete a certain post from the timeline.
 */
export default class Feed extends React.Component {

    render() {
        // obtain the list of post objects, profile picture, and current user from props
        const { posts, profilePic, username, handleSearchFilter, parent, deletePost } = this.props;

        return (
            <div id={"feed-container"}>
                <div className={"feed-header"}>
                    <Link id={"profile-container"} to={"AccountInfo"}>
                        <img id={"profile"} src={profilePic} alt={"profile picture"}/>
                    </Link>
                    <Link id={"post-button"} to={"./PostRecipePage"}>  {/* TODO: replace with link to "create post" page */}
                        <button>Post A Recipe</button>
                    </Link>
                </div>

                <input onChange={(event) => handleSearchFilter(event, parent)} placeholder={"Search for a recipe"}/>
                {
                
                    posts.map(post => {
                        return (
                            <div key={uid(post)}>
                                <Post username={username} profilePic={profilePic} post={post} canSave={true}
                                      appState={parent.props.appState} deletePost={deletePost} timeline={parent}/>
                                <hr />
                            </div>
                        );
                    })
                }
            </div>
        );
    }

}
