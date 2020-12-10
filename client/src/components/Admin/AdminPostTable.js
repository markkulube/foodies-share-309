import React, { Component } from 'react'

import "./AdminPostTable.css"

// logic imports
import {deletePost} from "../post/PostLogic";

/**
 * Table with all user posts ordered by date in descending order.
 */
class AdminPostTable extends Component {

    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }
        this.deleteRow = this.deleteRow.bind(this)
    }

    async componentDidMount() {
        const data = await this.getAllData()
        const posts = data.posts
        this.setState({
            posts: posts
        })

    }

     getAllData = async () => {
         // Create our request constructor with all the parameters we need
         let data = []
         try {
            const response = await fetch("/api/all");
            data = await response.json();
         } catch (error) {
             console.log(error)
         }

         return data

    }
    
    // Handle click event that deletes a post from the table
    async deleteRow(e) {
        let no = e.target.name
        //let username = document.getElementById("post_username"+no+"").innerHTML
        //let datePosted = document.getElementById("post_date"+no+"").innerHTML
        let post_id= document.getElementById("post_row"+no+"").title

      

        try {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            const res = await fetch(new Request('/api/timeline/post', {
                method: 'delete',
                body: JSON.stringify({
                    creator: "Admin",
                    postId: post_id
                }),
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                }
            }));
            const deletedPost = await res.json();
            if (res.status === 200) {

                // TODO
                console.log('success::post: '+post_id+' deleted')
                document.getElementById("post_row"+no+"").outerHTML="";
                
            } else {
                // TODO
                // If account creation failed, tell the user.
                console.log('success::post: '+post_id+' not deleted')

                }
            
        } catch (error) {
            console.log(error)
        }

    }

    generateTableRows() {

        let allPosts = this.state.posts

        // sort the posts by descending date posted
        allPosts.sort((a, b) => (new Date(b.datePosted)) - (new Date(a.datePosted)));

        let post_row = 1

        let tableRows = []
        let tableRow

        allPosts.forEach(post => {
            tableRow = <tr title={post._id} id={"post_row"+post_row}>
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
        let allPosts = this.state.posts

        let tableRows = this.generateTableRows()
        const saveStyle = {
            display: 'none'
        }

        return (
            
            <div id={"admin-post-table"}>
                    <br></br>
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