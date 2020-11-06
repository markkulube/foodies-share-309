import React from "react";
import { uid } from "react-uid";
import { Link } from "react-router-dom";
import Post from "../post/Post.js"

export default class userFeed extends React.Component{
    constructor(props) {
        super(props);
        const currentUser = this.props.appState.currentUser;
        
        this.state = {
            username: currentUser.username,
            profilePic: currentUser.profilePic,
            posts: currentUser.posts
        }
    }
    
    render(){
        return(
            
                this.state.posts.map(post => {
                    return (
                        <div key={uid(post)}>
                            <Post username={this.state.username} profilePic={this.state.profilePic} post={post}/>
                            <hr />
                        </div>
                    );
                })
            

        );

        
}
}