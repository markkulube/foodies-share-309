import React from "react";
import { uid } from "react-uid";

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
            <div>
                <div id={"feed-header"}>
                    <img className={"profile"} src={profile} alt={"profile"}/>
                    <button id={"post-button"}>Post a recipe</button>
                </div>
                <hr />
                {
                    // TODO: replace inner <div> with <Post> component once Keren creates it
                    posts.map(post => {
                        return (
                            <div key={uid(post)}>
                                <div>Placeholder Post {posts.indexOf(post) + 1}</div>  {/* TODO: replace this */}
                                <hr />
                            </div>
                        );
                    })
                }
            </div>
        );
    }

}
