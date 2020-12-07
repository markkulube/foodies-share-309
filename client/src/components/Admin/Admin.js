import React, { Component } from 'react'
import { Link } from "react-router-dom";

import AdminTable from './AdminTable'
import AdminPostTable from './AdminPostTable'

import "./Admin.css"

// styles and images
import logo from "../../images/foodies.png";
import homePic from "../../images/home.png";
import breakfastPic from "../../images/breakfast.png";
import lunchPic from "../../images/lunch.png";
import dinnerPic from "../../images/dinner.png";
import dessertPic from "../../images/dessert.png";
import otherPic from "../../images/other.png";
import signOutPic from "../../images/signout.png";
import adminPic from "../../images/admin.png";
import postsPic from "../../images/posts.png";

import { signOut } from "../../actions/user";

/**
 * Parent component of admin page. Children include
 * user and posts table.
 */
class Admin extends Component {

    constructor(props) {
        super(props);
        this.props.history.push("/Admin");
      }


    render() {
        return (
            
            <div id={"admin"}>
{/* 
                <div id="admin-header">

                    <div className={"admin-nav"}>
                        <h1>Welcome Admin</h1>
                            <Link to={"/Timeline"}>
                                <button className={"account-info-nav-buttons"}>Home</button>
                            </Link>
                            <Link to={"/userTimeline"}>
                            <button className={"account-info-nav-buttons"}>My Timeline</button>
                            </Link>
                            <Link className={"account-info-nav-buttons"} to={"AccountInfo"}>
                            <button>Account</button>
                            </Link>
                            <Link to={""}>
                            <button onClick={() => signOut(this)} className={"account-info-nav-buttons"}>Sign Out</button>
                            </Link>
                    </div>
                        
                </div> */}

                <div id={"side-container-admin"} className={"side-container-admin"}>
                    <img id={"logo"} src={logo} alt={logo}/>
                    <Link id={"profile-link"} to={"Admin"}>
                     <button id={"admin-button"}> 
                         <img id={"symbol"} src={adminPic} alt={adminPic}/>
                     Admin</button>
                    </Link>
                    <Link id={"profile-link"} to={"AccountInfo"}>
                     <button> 
                         {/* <img id={"symbol"} src={this.state.currentUser.profilePic} alt={"profile-pic"}/> */}
                     Account</button>
                    </Link>

                    <Link id={"userTimeline-link"} to={"UserTimeline"}>
                     <button>
                     <img id={"symbol"} src={postsPic} alt={postsPic}/>
                     My Posts</button>
                    </Link>
                    <Link id={"signout-link"} to={"/"}>
                        <button onClick={() => signOut(this)}>
                        <img id={"symbol"} src={signOutPic} alt={signOutPic}/>
                        Sign Out</button>
                    </Link>
                </div>

                <div id={"admin-main"}>

                    <div className={"admin-nav"}>
                    <h2>Foodie Users</h2>
                    </div>
                     <AdminTable app={this.props.app}></AdminTable>

                   <div className={"admin-nav"}>
                    <h2>Foodie Posts</h2>
                    </div>
                    <AdminPostTable app={this.props.app}></AdminPostTable>
                    
                </div>

                

            </div>
        )
    }
}

export default Admin