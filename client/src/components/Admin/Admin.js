import React, { Component } from 'react'
import AdminTable from './AdminTable'
import AdminPostTable from './AdminPostTable'
import { Link } from "react-router-dom";

import "./Admin.css"

/**
 * Parent component of admin page. Children include
 * user and posts table.
 */
class Admin extends Component {
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
                            <button className={"account-info-nav-buttons"}>Sign Out</button>
                            </Link>
                    </div>
                        
                </div>

                <div id={"admin-main"}>

                    <div className={"admin-nav"}>
                    <h2>Foodie Users</h2>
                    </div>
                    <AdminTable appState={this.props.appState}></AdminTable>

                    <div className={"admin-nav"}>
                    <h2>Foodie Posts</h2>
                    </div>
                    <AdminPostTable appState={this.props.appState}></AdminPostTable>
                    
                </div>

            </div>
        )
    }
}

export default Admin