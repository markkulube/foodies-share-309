import React from "react";
import "../../actions/addRecipe"
import Recipe from "../Recipe/Recipe"
import { UnmountClosed } from "react-collapse";

import "./Post.css"
import ReviewList from "../ReviewList";

class Post extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isOpened: false,
            reviewsButton: "Reviews"
        }
    }

    /**
     * Show or hide the reviews.
     */
    toggleShowHide = () => {
        this.setState({isOpened: !this.state.isOpened});

        if (this.state.isOpened) {
            this.setState({reviewsButton: "Reviews"});
            console.log("hid review");
        } else {
            this.setState({reviewsButton: "Hide"});
            console.log("showed review");
        }
    }

    render(){
        const { username, profilePic, title, desc, ingredients, steps } = this.props;

        return(
            <div className = "App">
                <div className ="block">
                    <img src={profilePic} className="profilePic"/>
                    <h3 className="username">{username}</h3>
                </div>
                <div className="block">

                    <Recipe
                        title= {title}
                        desc= {desc}
                        ingredients= {ingredients}
                        steps= {steps}
                    />
                    {/* buttons component, implementing next
                     <LikeButton />
                     <DislikeBUtton />
                     */}
                    <button onClick={this.toggleShowHide}>{this.state.reviewsButton}</button>
                    <UnmountClosed isOpened={this.state.isOpened}>
                        <ReviewList name={"<my here>"} profilePic={profilePic} post={title}/>
                    </UnmountClosed>
                </div>
            </div>
            

        );
    }

}

export default Post