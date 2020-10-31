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
 *      posts[element]: {
 *          username    {string}    Username of this recipe's writer.
 *          profilePic  {string}    Path to the profile picture of this recipe's writer.
 *          title       {string}    Title of this recipe.
 *          desc        {string}    Description of this recipe.
 *          ingredients {string[]}  List of ingredients needed to follow this recipe.
 *          steps       {string[]}  List of steps the recipe tells you to follow.
 *      }
 *  - profilePic            {string}            Path to the profile picture of the given user.
 *  - username              {string}            Name of the user viewing this Feed.
 *  - handleSearchFilter    {function}          The callback to invoke when search bar input is changed (onChange)
 *  - parent                {React.Component}   The parent component to call handleSearchFilter for.
 */
export default class Feed extends React.Component {

    render() {
        // obtain the list of post objects, profile picture, and current user from props
        const { posts, profilePic, username, handleSearchFilter, parent } = this.props;

        return (
            <div id={"feed-container"}>
                <div id={"feed-header"}>
                    <Link id={"profile-container"} to={"AccountInfo"}>
                        <img id={"profile"} src={profilePic} alt={"profile picture"}/>
                    </Link>
                    <Link id={"post-button"} to={"./PostRecipe"}>  {/* TODO: replace with link to "create post" page */}
                        <button>Post a recipe</button>
                    </Link>
                </div>
                <input onChange={(event) => handleSearchFilter(event, parent)} placeholder={"Search for a recipe"}/>
                {
                    posts.map(post => {
                        return (
                            <div key={uid(post)}>
                                <Post username={username} profilePic={profilePic} post={post}/>
                                <hr />
                            </div>
                        );
                    })
                }
            </div>
        );
    }

}
