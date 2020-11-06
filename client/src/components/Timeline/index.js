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
import signOutPic from "../../images/signout.png";

// import logic from logic file
import { handleFilter, handleSearchFilter } from "./TimelineLogic";
import {signOut} from "../../actions/signup";

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
        this.state = {
            posts: []
        }
    }

    /**
     * Return a list of all existing posts sorted by date posted (earliest first).
     */
    getAllPosts = () => {
        // get a list of all existing posts from appState
        let posts = []  // this will contain all posts
        for (let account of this.props.appState.accounts) {
            posts = posts.concat(account.posts);
        }

        // sort the posts by descending date posted
        posts.sort((a, b) => b.datePosted - a.datePosted);

        return posts;
    }

    componentDidMount() {
        // begin by showing all posts
        this.setState({ posts: this.getAllPosts() })
        
        if (this.props.appState.currentUser.isAdmin) {
            document.getElementById('admin-button').style.display = 'inline-block'
        } 
    }

    render() {
        const username = this.props.appState.currentUser.userName;
        // TODO: create a profilePic field in accounts global data and ask Brandon to add it when assigning currentUser.
        // const profilePic = this.props.appState.currentUser.profilePic;

        return(
            <div id={"timeline"}>
                <div className={"side-container"}>
                    <img id={"logo"} src={logo} alt={logo}/>
                    <Link id={"profile-link"} to={"Admin"}>
                     <button id={"admin-button"}> 
                         <img id={"symbol"} src={profilePic} alt={profilePic}/>
                     Admin</button>
                    </Link>
                    <Link id={"profile-link"} to={"AccountInfo"}>
                     <button> 
                         <img id={"symbol"} src={profilePic} alt={profilePic}/>
                     Account</button>
                    </Link>

                    <Link id={"userTimeline"} to={"userTimeline"}>
                     <button>My Post</button>
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
                />
                <div className={"side-container"}>
                </div>
            </div>
        );
    }

}
