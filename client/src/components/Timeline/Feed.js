import React from "react";
import { uid } from "react-uid";
import { Link } from "react-router-dom";
import Post from "../post/Post.js"
import "./Feed.css";

/**
 * The main section of the Timeline page containing a collection of posts.
 *
 * Required props:
 *  - posts {Object[]}  An list of objects with data about a single post.
 *      posts[element]: {
 *          username    {string}    Username of this recipe's writer.
 *          profilePic  {string}    Path to the profile picture of this recipe's writer.
 *          title       {string}    Title of this recipe.
 *          desc        {string}    Description of this recipe.
 *          ingredients {string[]}  List of ingredients needed to follow this recipe.
 *          steps       {string[]}  List of steps the recipe tells you to follow.
 *      }
 */
export default class Feed extends React.Component {

    render() {
        // obtain the list of post objects, profile picture, and current user from props
        const { posts, profilePic, username } = this.props;

        return (
            <div id={"feed-container"}>
                <div className={"feed-header"}>
                    <Link id={"profile-container"} to={"AccountInfo"}>
                        <img id={"profile"} src={profilePic} alt={"profile picture"}/>
                    </Link>
                    <Link id={"post-button"} to={"./PostRecipe"}>  {/* TODO: replace with link to "create post" page */}
                        <button>Post A Recipe</button>
                    </Link>
                </div>
                <hr/>
                {
                    posts.map(post => {
                        return (
                            <div key={uid(post)}>
                                <Post
                                    username={username}
                                    profilePic={profilePic}
                                    post={post}
                                />
                                <hr />
                            </div>
                        );
                    })
                }
            </div>
        );
    }

}
