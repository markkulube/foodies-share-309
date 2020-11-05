import React, { Component } from 'react'

import "./AdminPostTable.css"

class AdminPostTable extends Component {

    constructor(props) {
        super(props)
        this.deleteRow = this.deleteRow.bind(this)
    }
    
    // TODO: Remove post from corresponding users posts:[]
    deleteRow(e) {
        let no = e.target.name
        let username = document.getElementById("post_username"+no+"").innerHTML
        let datePosted = document.getElementById("post_date"+no+"").innerHTML
        
        let accounts = this.props.appState.accounts
     
        let posts
        accounts.forEach(account => {

            if (account.userName === username) {
                posts = account.posts
            }
        });

        for (let index = 0; index < posts.length; index++) {
            const post = posts[index];

            if (post.datePosted.toString() == datePosted) {
                posts.splice(index, 1)
            }
        }
        document.getElementById("post_row"+no+"").outerHTML="";
    }

    getAllPosts() {
        let allPosts = []
        let accounts = this.props.appState.accounts

        for (let index = 0; index < accounts.length; index++) {
            const account = accounts[index];
            allPosts.push(...account.posts)
        }
        
        return allPosts
    }

    generateTableRows() {
        // TODO: Dynamically populate Table from building JSX on appState
        let allPosts = this.getAllPosts()

        let post_row = 1

        let tableRows = []
        let tableRow

        allPosts.forEach(post => {
            tableRow = <tr id={"post_row"+post_row}>
                            <td id={"post_date"+post_row}>{post.datePosted.toString()}</td>
                            <td id={"post_username"+post_row}>{post.userName}</td>
                            <td id={"title"+post_row}>{post.title}</td>
                            <td id={"description"+post_row}>{post.desc}</td>
                            <td id={"ingredients"+post_row}>{post.ingredients}</td>
                            <td id={"steps"+post_row}>{post.steps}</td>
                            <td>
                                <button id="post_delete_button1" value="Delete" className="delete" name={post_row+""} onClick={this.deleteRow}>Delete</button>
                            </td>
                        </tr>

            tableRows.push(tableRow)
            post_row++
        });

        return tableRows

    }

    render() {
        let allPosts = this.getAllPosts()

        let tableRows = this.generateTableRows()
        const saveStyle = {
            display: 'none'
        }

        return (
            
            <div id={"admin-post-table"}>
                <table  cellSpacing={2} cellPadding={5} id={"data_table"} border={1}>
                    <thead>
                        <tr>
                            <th>Post Date</th>
                            <th>User Name</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Ingredients</th>
                            <th>Steps</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows}
                    </tbody>
                </table>
            </div>

            
        )
    }
}

export default AdminPostTable