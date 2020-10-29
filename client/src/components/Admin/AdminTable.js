import React, { Component } from 'react'

import "./AdminTable.css"

class AdminTable extends Component {
    render() {
        return (
            <div id={"admin-table"}>
                <table>
                    <thead>
                        <tr>
                            <th>username</th>
                            <th>email</th> 
                            <th>favorite meal</th>
                            <th>password</th>
                        </tr>
                    </thead>

                    <tr>
                        <td contenteditable={'true'}>admin</td>
                        <td contenteditable={'true'}>admin@admin.com</td>
                        <td contenteditable={'true'}>beef</td>
                        <td contenteditable={'true'}>admin</td>
                    </tr>

                    <tr>
                        <td contenteditable={'true'}>user</td>
                        <td contenteditable={'true'}>user@user.com</td>
                        <td contenteditable={'true'}>pasta</td>
                        <td contenteditable={'true'}>user</td>
                    </tr>
                </table>
                
            </div>
        )
    }
}

export default AdminTable