import React from "react";
import { uid } from "react-uid";
import { Link } from "react-router-dom";

import "./Feed.css";
import profile from "../../images/eggie.jpg";

/**
 * The main section of the Timeline page containing a collection of posts.
 *
 * Required props:
 *  - posts (Object[]): An list of objects with data about a single post (title, desc, ingredients, steps).
 */
export default class Feed extends React.Component {

    render() {
        const { posts } = this.props;  // obtain the list of post objects from props

        return (
            <div id={"feed-container"}>
                <div id={"feed-header"}>
                    <Link id={"profile-container"} to={"profile"}>  {/* TODO: replace with link to user profile page */}
                        <img id={"profile"} src={profile} alt={"profile"}/>
                    </Link>
                    <Link id={"post-button"} to={"create-post"}>  {/* TODO: replace with link to "create post" page */}
                        <button>Post a recipe</button>
                    </Link>
                </div>
                <hr/>
                {
                    posts.map(post => {
                        return (
                            <div key={uid(post)}>
                                {/* TODO: replace this <div> with a <Post> component once Keren creates it */}
                                <div style={{"height": "300px"}}>
                                    Placeholder Post {posts.indexOf(post) + 1}: {post.title}
                                </div>
                                <hr />
                            </div>
                        );
                    })
                }
            </div>
        );
    }

}
