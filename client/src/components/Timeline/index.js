import React from "react";
import { Link } from "react-router-dom";
import Feed from "./Feed";

// styles and images
import "./Timeline.css";
import logo from "../../images/placeholder-logo.png";

// import logic from logic file
import { handleFilter } from "./TimelineLogic";

export default class Timeline extends React.Component {

    constructor(props) {
        super(props);

        // Note: calling handleFilter (aka. calling setState) in constructor somehow doesn't update the state.
        //  Therefore, we need to make a manual API call to retrieve "home" data
        const initPosts = [  // TODO: replace this with API call to retrieve all posts
            {title: "Blueberry Pancakes"},
            {title: "Steak Sandwich"},
            {title: "Chicken Parmesan"},
            {title: "Apple Pie"}
        ]
        this.state = {
            posts: initPosts
        }
    }

    render() {
        return(
            <div id={"timeline"}>
                <div className={"side-container"}>
                    <img id={"logo"} src={logo} alt={logo}/>
                    <Link id={"profile-link"} to={"profile"}>Profile</Link>  {/* TODO: replace with link to user page */}
                    <button onClick={() => handleFilter(this, "home")}>Home</button>
                    <button onClick={() => handleFilter(this, "breakfast")}>Breakfast</button>
                    <button onClick={() => handleFilter(this, "lunch")}>Lunch</button>
                    <button onClick={() => handleFilter(this, "dinner")}>dinner</button>
                    <button onClick={() => handleFilter(this, "dessert")}>dessert</button>
                </div>
                <Feed posts={this.state.posts}/>
                <div className={"side-container"}>
                    <Link to={""}>  {/* TODO: replace with link to home page */}
                        <button>Sign out</button>
                    </Link>
                </div>
            </div>
        );
    }

}
