import React from "react";
import { uid } from "react-uid";
import { Link } from "react-router-dom";
import Post from "../post/Post.js"
import { Route, Switch, BrowserRouter } from 'react-router-dom';
//stylesheet
import "./UserFeed.css";

/*
    User feed consisting user's posts and user's favorited posts. if no posts are present,
    a tag will shown on the page indicating there is no post yet. 
*/

export default class UserFeed extends React.Component{
      
    render(){
        //getting neccessary objects from post
        const { posts,favPosts, profilePic, username, handleSearchFilter, handleSavedFilter, flag, parent } = this.props;
        return(         
            
            <div id={"feed-container"}>
                <div className={"feed-header"}>
                    <Link id={"profile-container"} to={"AccountInfo"}>
                        <img id={"profile"} src={profilePic} alt={"profile picture"}/>
                    </Link>
                    {flag &&
                    <Link id={"post-button"} to={"./PostRecipePage"}>  
                        <button>Post A Recipe</button>
                    </Link>
                    }
                </div>
                {flag &&
                <input onChange={(event) => handleSearchFilter(event, parent)} placeholder={"Search for a recipe"}/>
                }
                <h2>My Recipe</h2>
                { posts ? (
                posts.map(post => {
                return (
                    <div key={uid(post)}>
                        <Post username={username} profilePic={profilePic} post={post} canSave={false} appState={parent.props.appState}/>
                        <hr />
                    </div>
                    );
                }))
                : (
                    <p>No Post Yet</p>
                )
                }
                {flag &&
                <input onChange={(event) => handleSavedFilter(event, parent)} placeholder={"Search for a recipe"}/>
                }
                <h2>Saved Recipe</h2>
                { favPosts ?(
                favPosts.map(post => {
                return (
                    <div key={uid(post)}>
                        <Post username={username} profilePic={profilePic} post={post} canSave={false} appState={parent.props.appState}/>
                        <hr />
                    </div>
                    );
                }))
                : (
                    <p>No Favorite Post </p>
                )
                }
            </div>
            
        );

        
    }
}
