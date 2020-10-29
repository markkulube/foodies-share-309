import React from "react";
import { uid } from "react-uid";
import { Link } from "react-router-dom";
import Post from "../post/Post.js"
import "./Feed.css";
import profile from "../../images/eggie.jpg";

/**
 * The main section of the Timeline page containing a collection of posts.
 *
 * Required props:
 *  - posts {Object[]}  An list of objects with data about a single post (title, desc, ingredients, steps).
 */
export default class Feed extends React.Component {

    render() {
        const { posts } = this.props;  // obtain the list of post objects from props

        return (
            <div id={"feed-container"}>
                <div id={"feed-header"}>
                    <Link id={"profile-container"} to={"AccountInfo"}>
                        <img id={"profile"} src={profile} alt={"profile"}/>
                    </Link>
                    <Link id={"post-button"} to={"./PostRecipe"}>  {/* TODO: replace with link to "create post" page */}
                        <button>Post a recipe</button>
                    </Link>
                </div>
                <hr/>
                {
                    posts.map(post => {
                        return (
                            <div key={uid(post)}>
                                <Post 
                                    username={post.username}
                                    profilePic={post.profilePic}
                                    title={post.title}
                                    desc={post.desc}
                                    ingredients={post.ingredients}
                                    steps={post.steps}
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
