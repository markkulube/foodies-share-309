import React from "react";
import { Link } from "react-router-dom";
import Feed from "./Feed";

// styles and images
import "./Timeline.css";
import logo from "../../images/foodies.png";
import profilePic from "../../images/profile.png";  // TODO: remove import once implemented pass as prop from App.js

// import logic from logic file
import { handleFilter, posts } from "./TimelineLogic";  // TODO: remove posts import once replaced with API call below

/**
 * The main page after the login procedure. Display timeline of posts, option to create a post, and other navigation
 * options.
 *
 * Required props:
 *  - username      {string} Name of the current user.
 *  - profilePic    {string} Path to the profile picture of the current user.
 */
export default class Timeline extends React.Component {

    constructor(props) {
        super(props);

        // Note: calling handleFilter (aka. calling setState) in constructor somehow doesn't update the state.
        //  Therefore, we need to make a manual API call to retrieve "home" data
        // TODO: implement API call to obtain a list of all posts.
        // const posts = getPostsAPI();

        this.state = {
            posts: posts  // TODO: replace with data from API call above
        }
    }

    render() {
        {/* TODO: uncomment props collection once implemented from login page */}
        // const { username, profilePic } = this.props;

        return(
            <div id={"timeline"}>
                <div className={"side-container"}>
                    <img id={"logo"} src={logo} alt={logo}/>
                    <Link id={"profile-link"} to={"AccountInfo"}>Profile</Link>
                    <button onClick={() => handleFilter(this, "home")}>Home</button>
                    <button onClick={() => handleFilter(this, "breakfast")}>Breakfast</button>
                    <button onClick={() => handleFilter(this, "lunch")}>Lunch</button>
                    <button onClick={() => handleFilter(this, "dinner")}>Dinner</button>
                    <button onClick={() => handleFilter(this, "dessert")}>Dessert</button>
                </div>
                {/* TODO: replace profilePic and <username> with collected props from login */}
                <Feed posts={this.state.posts} profilePic={profilePic} username={"<username>"}/>
                <div className={"side-container"}>
                    <Link to={""}>
                        <button>Sign out</button>
                    </Link>
                </div>
            </div>
        );
    }

}
