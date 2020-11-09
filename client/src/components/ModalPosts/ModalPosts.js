import React, { Component } from 'react'
import UserFeed from "../UserTimeline/UserFeed";

import "./ModalPosts.css"
import { handleSearchFilter } from "../UserTimeline/UserTimelineLogic";

/**
 * Render user timeline in a modal box.
 */
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

    // Fetch the user's posts
    getAllPosts = () => {

        // API Call: GET the user's posts from the server/MongoDB
        let accounts = this.props.appState.accounts

        // get a list of all existing posts from appState
        let posts = []
        let profilePic
        accounts.forEach(account => {
            if (account.userName==this.props.currentUser) {
                console.log(account.posts)
                posts=account.posts;
                // sort the posts by descending date posted
                posts.sort((a, b) => b.datePosted - a.datePosted);
                profilePic = account.profilePic
                
            }
        });

        return [posts, profilePic]
    }

    onClose = e => {
        this.props.onClose && this.props.onClose(e);
      };
    
    render() {

        const username = this.props.currentUser;
        const [posts, profilePic] = this.getAllPosts()
        const flag = false;

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
                        flag={flag}
                        parent={this}
                        />
                      
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalPosts;