import React from "react";
import { uid } from "react-uid";
import { Link } from "react-router-dom";
import Post from "../post/Post.js"
import "./Feed.css";

/**
 * The main section of the Timeline page containing a collection of posts.
 *
 * Required props:
 *  - posts {Object[]} An list of objects with data about a single post.
 *      posts[Object]: {
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
 *  - profilePic            {string}            Path to the profile picture of the given user.
 *  - username              {string}            Name of the user viewing this Feed.
 *  - handleSearchFilter    {function}          The callback to invoke when search bar input is changed (onChange)
 *  - parent                {React.Component}   The parent component to call handleSearchFilter for.
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
