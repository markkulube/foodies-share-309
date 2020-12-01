import React from "react";
import { Link } from "react-router-dom";
import Feed from "./Feed";

// styles and images
import "./Timeline.css";
import logo from "../../images/foodies.png";
import profilePic from "../../images/profile.png";  // TODO: remove once account data contains profilePic
import homePic from "../../images/home.png";
import breakfastPic from "../../images/breakfast.png";
import lunchPic from "../../images/lunch.png";
import dinnerPic from "../../images/dinner.png";
import dessertPic from "../../images/dessert.png";
import otherPic from "../../images/other.png";
import signOutPic from "../../images/signout.png";
import adminPic from "../../images/admin.png";
import postsPic from "../../images/posts.png";

// import logic from logic file
import { handleFilter, handleSearchFilter, deletePost, getAllPosts } from "./TimelineLogic";
import { signOut } from "../../actions/signup";

/**
 * The main page after the login procedure. Display timeline of posts, option to create a post, and other navigation
 * options.
 *
 * Required props:
 *  - appState {Object} The global state of the app.
 */
export default class Timeline extends React.Component {

    constructor(props) {
        super(props);
        this.props.history.push("/Timeline");
    }

     state = {
          posts: []
      }

    componentDidMount() {
        // begin by showing all posts
        this.setState({ posts: getAllPosts(this) })
        
        if (this.props.app.state.currentUser.isAdmin) {
            document.getElementById('admin-button').style.display = 'inline-block';
        } 
    }

    render() {
        const username = this.props.app.state.currentUser.userName;

        return(
            <div id={"timeline"}>
                <div className={"side-container"}>
                    <img id={"logo"} src={logo} alt={logo}/>
                    <Link id={"profile-link"} to={"Admin"}>
                     <button id={"admin-button"}> 
                         <img id={"symbol"} src={adminPic} alt={adminPic}/>
                     Admin</button>
                    </Link>
                    <Link id={"profile-link"} to={"AccountInfo"}>
                     <button> 
                         <img id={"symbol"} src={profilePic} alt={profilePic}/>
                     Account</button>
                    </Link>

                    <Link id={"userTimeline-link"} to={"UserTimeline"}>
                     <button>
                     <img id={"symbol"} src={postsPic} alt={postsPic}/>
                     My Posts</button>
                    </Link>
                    
                    <button onClick={() => handleFilter(this, "home")}>
                    <img id={"symbol"} src={homePic} alt={homePic}/>
                    Home</button>
                    <button onClick={() => handleFilter(this, "breakfast")}>
                    <img id={"symbol"} src={breakfastPic} alt={breakfastPic}/>
                    Breakfast</button>
                    <button onClick={() => handleFilter(this, "lunch")}>
                    <img id={"symbol"} src={lunchPic} alt={lunchPic}/>
                    Lunch</button>
                    <button onClick={() => handleFilter(this, "dinner")}>
                    <img id={"symbol"} src={dinnerPic} alt={dinnerPic}/>
                    Dinner</button>
                    <button onClick={() => handleFilter(this, "dessert")}>
                    <img id={"symbol"} src={dessertPic} alt={dessertPic}/>
                    Dessert</button>
                    <button onClick={() => handleFilter(this, "other")}>
                    <img id={"symbol"} src={otherPic} alt={otherPic}/>
                    Other</button>
                    <Link id={"signout-link"} to={""}>
                        <button onClick={() => signOut(this)}>
                        <img id={"symbol"} src={signOutPic} alt={signOutPic}/>
                        Sign Out</button>
                    </Link>
                </div>
                <Feed
                    posts={this.state.posts}
                    profilePic={profilePic}
                    username={username}
                    handleSearchFilter={handleSearchFilter}
                    parent={this}
                    deletePost={deletePost}
                />
                <div className={"side-container"}>
                </div>
            </div>
        );
    }

}
