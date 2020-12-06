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
            users: [], 
            posts: []
        }

        this.onClose = this.onClose.bind(this)
    }

    async componentDidMount() {
        
        if(this.props.isModalPosts) {
            document.getElementById('feed-container').style.width='100%'
        }

        const data = await this.getAllData()
        const posts = data.posts
        const users = data.users
        this.setState({
            users: users,
            posts: posts
        })

    }

     getAllData = async () => {
         // Create our request constructor with all the parameters we need
         let data = []
         try {
            const response = await fetch("/api/all");
            data = await response.json();
         } catch (error) {
             console.log(error)
         }

         return data

    }

    /* componentDidMount() {
        if(this.props.isModalPosts) {
            document.getElementById('feed-container').style.width='100%'
        }
    } */

    // Fetch the user's posts
    getAllPosts = () => {

        // API Call: GET the user's posts from the server/MongoDB
        let users = this.state.users

        // get a list of all existing posts from appState
        let posts = this.state.posts
        let profilePic
        let user_posts = []
        posts.forEach(post => {
            if (post.userName==this.props.currentUser) {
                user_posts.push(post)
                profilePic = post.profilePic
                
                
            }
        });

        // sort the posts by descending date posted
        user_posts.sort((a, b) => b.datePosted - a.datePosted);

        return [user_posts, profilePic]
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