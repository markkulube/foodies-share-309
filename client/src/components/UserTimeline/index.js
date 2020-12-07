import React from "react";
import { Link } from "react-router-dom";
import UserFeed from "./UserFeed";
import { handleFilter, handleSearchFilter, handleSavedFilter,getUserPosts,getAllSavedPosts } from "./UserTimelineLogic";
import {signOut} from "../../actions/signup";
//stylesheet
import "../Timeline/Timeline.css";
//images for sidebar
import logo from "../../images/foodies.png";
import profilePic from "../../images/profile.png";  // TODO: remove once account data contains profilePic
import homePic from "../../images/home.png";
import breakfastPic from "../../images/breakfast.png";
import lunchPic from "../../images/lunch.png";
import dinnerPic from "../../images/dinner.png";
import dessertPic from "../../images/dessert.png";
import signOutPic from "../../images/signout.png";
import adminPic from "../../images/admin.png";

/*
    similar to Timeline, but consist only user's posts and user's favorited posts.
    accessed via the My Post button in Timeline. uses child component UserFeed.
*/

class UserTimeline extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userPosts: [],
            savedPosts:[],
            currentUser: {}
        }

        console.log(props)
    }
    async componentDidMount() {
        // Fetch all posts and the current user.
        
        let user;
        try {
            const response = await fetch("/user/check-session");
            user = (await response.json()).currentUser;
        } catch (error) {
            console.error(error);
            return;
        }

        // Conditionally render the admin button based.
        if (user.isAdmin) {
            document.getElementById('admin-button').style.display = 'inline-block';
        }

        // Set liked or disliked status of each post according to the current user.
       const userPosts = await getUserPosts()  
       const savedPosts = await getAllSavedPosts()


       console.log(savedPosts)
       console.log(userPosts)
        this.setState({
            userPosts: userPosts,
            savedPosts: savedPosts,
            currentUser: user
        });
    }


    render(){
        //retrieve the current user's username and profile pictures from appState 
        const username = this.props.app.state.currentUser.userName;
        const profilePic = this.props.app.state.currentUser.profilePic;
        const flag=true;
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

                    <Link id={"timeLine-link"} to={"Timeline"}>
                     <button><img id={"symbol"} src={homePic} alt={homePic}/>
                     Timeline</button>
                    </Link>
                    
                    <button onClick={() => handleFilter(this, "home")}>
                    All Recipes</button>
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
                   userPosts={this.state.userPosts}
                   favPosts={this.state.savedPosts}
                   currentUser={this.state.currentUser}
                   profilePic={profilePic}
                   handleSearchFilter={handleSearchFilter}
                   handleSavedFilter={handleSavedFilter}
                   flag={flag}
                   parent={this}
            
               />    
            <div className={"side-container"}>
                </div>
            </div>
              
        );
    }
    
}
export default UserTimeline