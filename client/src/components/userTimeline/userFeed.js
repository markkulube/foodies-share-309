import React from "react";
import { uid } from "react-uid";
import { Link } from "react-router-dom";
import Post from "../post/Post.js"
import { Route, Switch, BrowserRouter } from 'react-router-dom';
export default class UserFeed extends React.Component{
    
    
    
    
    render(){
        
        const { posts,favPosts, profilePic, username, handleSearchFilter, parent } = this.props;
        return(         
            
            <div id={"feed-container"}>
                <div className={"feed-header"}>
                    <Link id={"profile-container"} to={"AccountInfo"}>
                        <img id={"profile"} src={profilePic} alt={"profile picture"}/>
                    </Link>
                    <Link id={"post-button"} to={"./PostRecipePage"}>  {/* TODO: replace with link to "create post" page */}
                        <button>Post A Recipe</button>
                    </Link>
                </div>
                <input onChange={(event) => handleSearchFilter(event, parent)} placeholder={"Search for a recipe"}/>
                <h2>My Recipe</h2>
                { posts ? (
                posts.map(post => {
                return (
                    <div key={uid(post)}>
                        <Post username={username} profilePic={profilePic} post={post}/>
                        <hr />
                    </div>
                    );
                }))
                : (
                    <p>No Post Yet</p>
                )
                }


                <h2>Saved Recipe</h2>
                { favPosts ?(
                favPosts.map(post => {
                return (
                    <div key={uid(post)}>
                        <Post username={username} profilePic={profilePic} post={post}/>
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