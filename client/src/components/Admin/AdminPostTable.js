import React, { Component } from 'react'

import "./AdminPostTable.css"

/**
 * Table with all user posts ordered by date in descending order.
 */
class AdminPostTable extends Component {

    constructor(props) {
        super(props)
        this.deleteRow = this.deleteRow.bind(this)
    }
    
    // Handle click event that deletes a post from the table
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

        // API Call: POST request to delete post from users post collection in MongoDB
        for (let index = 0; index < posts.length; index++) {
            const post = posts[index];

            if (post.datePosted.toString() == datePosted) {
                posts.splice(index, 1)
            }
        }
        document.getElementById("post_row"+no+"").outerHTML="";
    }

    getAllPosts() {

        // API Call: GET all user posts from server/MongoDB
        let allPosts = []
        let accounts = this.props.appState.accounts

        for (let index = 0; index < accounts.length; index++) {
            const account = accounts[index];
            allPosts.push(...account.posts)
        }

        // sort the posts by descending date posted
        allPosts.sort((a, b) => b.datePosted - a.datePosted);
        
        return allPosts
    }

    generateTableRows() {

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

    myFunction() {
        let input = document.getElementById("post-table-search");
        let filter = input.value.toUpperCase();
        let table = document.getElementById("adminPostTable");
        let tr = table.getElementsByTagName("tr");
        for (let i = 1; i < tr.length; i++) {
            if (tr[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }      
        }
    }

    render() {
        let allPosts = this.getAllPosts()

        let tableRows = this.generateTableRows()
        const saveStyle = {
            display: 'none'
        }

        return (
            
            <div id={"admin-post-table"}>
              
                    <input type="text" id="post-table-search" onKeyUp={this.myFunction} placeholder="Search for posts.." title="Type in a name"></input>
                
                <table  cellSpacing={2} cellPadding={2} id={"adminPostTable"} border={1}>
                    
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