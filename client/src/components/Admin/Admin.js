import React, { Component } from 'react'
import { Link } from "react-router-dom";

import AdminTable from './AdminTable'
import AdminPostTable from './AdminPostTable'

import "./Admin.css"

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