import React, { Component } from 'react'
import UserFeed from "../UserTimeline/UserFeed";

import "./ModalPosts.css"

// styles and images
import profilePic from "../../images/profile.png";  // TODO: remove once account data contains profilePic

// import logic from logic file
import { handleFilter, handleSearchFilter } from "../UserTimeline/UserTimelineLogic";

class ModalPosts extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            posts: []
        }

        this.onClose = this.onClose.bind(this)
    }

    componentDidMount() {
        if(this.props.isModalPosts) {
            document.getElementById('feed-container').style.width='100%'
        }
    }

    getAllPosts = () => {
        
        let accounts = this.props.appState.accounts
        // get a list of all existing posts from appState
        let posts = []
        accounts.forEach(account => {
            if (account.userName==this.props.currentUser) {
                console.log(account.posts)
                posts=account.posts;
                // sort the posts by descending date posted
                posts.sort((a, b) => b.datePosted - a.datePosted);
                
            }
        });

        return posts
    }

    onClose = e => {
        this.props.onClose && this.props.onClose(e);
      };
    
    render() {

        const username = this.props.currentUser;
        const accounts = this.props.appState.accounts
        const posts = this.getAllPosts()

        if(!this.props.show){
            return null;
        }

        return (
            <div className="modal" id="modal">
                <div className={"modal-content"}>
                    <div>
          
                        <button className={"close"} onClick={this.onClose}>
                            Close
                        </button>

                        <UserFeed
                        posts={posts}
                        profilePic={profilePic}
                        username={username}
                        handleSearchFilter={handleSearchFilter}
                        parent={this}
                        />
                      
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalPosts;