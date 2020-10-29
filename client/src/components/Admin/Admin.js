import React, { Component } from 'react'
import AdminTable from './AdminTable'

import "./Admin.css"

class Admin extends Component {
    render() {
        return (
            
            <div id={"admin"}>

                <div id={"admin-left-side"}>
                    <h2>Welcome Admin</h2>
                </div>

                <div id={"admin-main"}>
                    <h3>Users</h3>
                    <AdminTable></AdminTable>
                </div>

            </div>
        )
    }
}

export default Admin