import React from "react";
import { Link } from "react-router-dom";
import UserFeed from "./UserFeed";
import { handleFilter, handleSearchFilter } from "./UserTimelineLogic";
import "../Timeline/Timeline.css";
import logo from "../../images/foodies.png";
import profilePic from "../../images/profile.png";  // TODO: remove once account data contains profilePic
import homePic from "../../images/home.png";
import breakfastPic from "../../images/breakfast.png";
import lunchPic from "../../images/lunch.png";
import dinnerPic from "../../images/dinner.png";
import dessertPic from "../../images/dessert.png";
import signOutPic from "../../images/signout.png";

import {signOut} from "../../actions/signup";

class UserTimeline extends React.Component{
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        
        if (this.props.appState.currentUser.isAdmin) {
            document.getElementById('admin-button').style.display = 'inline-block'
        } 
    }

    getAllPosts = () => {
        
        let posts =  this.props.appState.currentUser.posts // this will contain all posts
        console.log(posts)
        
        // sort the posts by descending date posted
        posts.sort((a, b) => b.datePosted - a.datePosted);

        return posts;
    }


    render(){
        const username = this.props.appState.currentUser.userName;
        const profilePic = this.props.appState.currentUser.profilePic;
        const posts = this.props.appState.currentUser.posts;
        const favPosts = this.props.appState.currentUser.favPosts;
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

                    <Link id={"timeLine"} to={"Timeline"}>
                     <button>Timeline</button>
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
               <UserFeed
               posts={posts}
               favPosts={favPosts}
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
export default UserTimeline