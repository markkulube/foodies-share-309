import React, { Component } from 'react'
import AdminTable from './AdminTable'
import AdminPostTable from './AdminPostTable'
import { Link } from "react-router-dom";

import "./Admin.css"

class Admin extends Component {
    render() {
        return (
            
            <div id={"admin"}>


                <div id="admin-header">
                        <h1>Welcome Admin</h1>
                        <Link to={"/"}> 
                            <button className={"account-info-nav-buttons"}>Home</button>
                        </Link>
                        <Link to={"/Timeline"}>
                            <button className={"account-info-nav-buttons"}>Timeline</button>
                        </Link>
                </div>

                <div id={"admin-main"}>
                <h3>Foodie Users</h3>
                    <AdminTable appState={this.props.appState}></AdminTable>
                    <h3>Foodie Posts</h3>
                    <AdminPostTable appState={this.props.appState}></AdminPostTable>
                </div>

            </div>
        )
    }
}

export default Admin