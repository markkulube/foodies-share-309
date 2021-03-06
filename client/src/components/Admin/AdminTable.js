import React, { Component } from 'react'
import ModalPosts from '../ModalPosts/ModalPosts'

import "./AdminTable.css"

/**
 * User table with registration info of all users
 * that are username, age, password, and favmeal
 */
class AdminTable extends Component {

    constructor(props) {
        super(props)
        // API call: GET all user account info from server MongoDB.
        this.state = {
             table_len: 2,
             modalDisplay: false,
             currentUser: null,
             users: [],
             posts: []
        }

        this.addRow = this.addRow.bind(this)
        this.editRow = this.editRow.bind(this)
        this.saveRow = this.saveRow.bind(this)
        this.deleteRow = this.deleteRow.bind(this)
        this.showModalPosts = this.showModalPosts.bind(this)  
    }

    async componentDidMount() {
        const data = await this.getAllData()
        const users = data.users
        const posts = data.posts
        this.setState({
            users: users,
            posts: posts,
            table_len: users.length
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
    
    // Handle click event that enable editing of user info.
    editRow(e) {
        let no = e.target.name
        document.getElementById("edit_button"+no).style.display="none";
        document.getElementById("save_button"+no).style.display="block";
            
        let username=document.getElementById("username"+no);
        let age=document.getElementById("age"+no);
        let password=document.getElementById("password"+no);
        let favmeal=document.getElementById("favmeal"+no);
            
        let username_data=username.innerHTML;
        let age_data=age.innerHTML;
        let password_data=password.innerHTML;
        let favmeal_data=favmeal.innerHTML;
            
        username.innerHTML="<input type='text' name='"+username_data +"' id='username_text"+no+"' value='"+username_data+"'>";
        age.innerHTML="<input type='text' name='"+age_data +"' id='age_text"+no+"' value='"+age_data+"'>";
/*         password.innerHTML="<input type='text' name='"+password_data +"' id='password_text"+no+"' value='"+password_data+"'>"; */
        password.innerHTML="<input type='text'" + "placeholder='Enter New Password'" + " name='"+password_data +"' id='password_text"+no+"' value=''>";
        favmeal.innerHTML="<input type='text' name='"+favmeal_data +"' id='favmeal_text"+no+"' value='"+favmeal_data+"'>";
    }

    // Handle click event that saves updates of user account info.
    async saveRow(e) {
        let no = e.target.name

        let oldUserName = document.getElementById("username_text"+no).name

        let username_val=document.getElementById("username_text"+no).value;
        let age_val=document.getElementById("age_text"+no).value;
        let password_val=document.getElementById("password_text"+no).value;
        let favmeal_val=document.getElementById("favmeal_text"+no).value;

        if (((username_val.length>0) && (age_val.length>0) && (password_val.length>0) && (favmeal_val.length>0))) {
            // API call: PATCH request to server updating user account info in MongoDB 
            let users = this.state.users
            let user, user_id
            users.forEach(userObj => {
                if (userObj.userName===oldUserName) {
                    user_id = userObj._id
                    let final_password 
                    password_val === ""? final_password = userObj.password: final_password = password_val
                    user = {
                        userName: username_val,
                        profilePic: userObj.profilePic,
                        password: final_password,
                        age: age_val,
                        favMeal: favmeal_val,
                        savedPosts: userObj.savedPosts,
                        isAdmin: userObj.isAdmin,
                        likedPosts: userObj.likedPosts,  // 1 = like, 0 = dislike
                        dislikedPosts: userObj.dislikedPosts,
                    };
                }
            });

            // Create our request constructor with all the parameters we need
            const request = new Request('/api/account/'+ user_id, {
                method: "PATCH",
                body: JSON.stringify(user),
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                }
            });

            console.log(request)

            // Send the request with fetch()
            fetch(request)
                .then(function (res) {
                    // Handle response we get from the API.
                    // Usually check the error codes to see what happened.
                    if (res.status === 200) {

                        // TODO
                        // If update was a success, tell the user.
                        console.log('success::account info updated')
                        alert("UPDATE-SUCCESS: " + oldUserName + " account updated.")
                        
                    } else {
                        // TODO
                        // If update failed, tell the user.
                        // Here we are adding a generic message, but you could be more specific in your app.
                        console.log('fail::account info not updated')
                        alert("UPDATE-FAIL: " + oldUserName + " account not updated.")

                    }
                })
                .catch(error => {
                    console.log(error);
            });

            const data = await this.getAllData()
            users = data.users
            const posts = data.posts
            this.setState({
                users: users,
                posts: posts,
                table_len: users.length
            })

            document.getElementById("username"+no).innerHTML=username_val;
            document.getElementById("age"+no).innerHTML=age_val;
            /* document.getElementById("password"+no).innerHTML=password_val; */
            document.getElementById("password"+no).innerHTML="******";
            document.getElementById("favmeal"+no).innerHTML=favmeal_val;

            document.getElementById("edit_button"+no).style.display="block";
            document.getElementById("save_button"+no).style.display="none";

            // this.alertBox("update_s", user.userName)
        } else {
            this.alertBox("save")
        }
 
        
    }

     // Handle click event that deletes of user account info.
    deleteRow(e) {
        let no = e.target.name

        let username = document.getElementById("username"+no+"").innerHTML
        
        // API call: GET request to server deleting user account info in MongoDB 
        let users = this.state.users
        let user, user_id
        users.forEach(userObj => {
            if (userObj.userName===username) {
                user_id = userObj._id
                user = userObj
            }
        });

        if (!user.isAdmin) {
             // Create our request constructor with all the parameters we need
         const request = new Request('/api/user/'+user_id, {
            method: "DELETE",
            body: JSON.stringify(user),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        });

        console.log(request)

        // Send the request with fetch()
        fetch(request)
            .then(function (res) {
                // Handle response we get from the API.
                // Usually check the error codes to see what happened.
                if (res.status === 200) {

                    // TODO
                    // If delete was a success, tell the admin.
                    console.log('success::user: '+user.userName+' account deleted')
                    alert("DELETE-SUCCESS: " + user.userName + " account deleted.")
                    
                } else {
                    // TODO
                    // If update failed, tell the admin.
                    // Here we are adding a generic message, but you could be more specific in your app.
                    console.log('fail::user: '+user.userName+' account not deleted')
                    alert("DELETE-FAIL: " + user.userName + " account not deleted.")

                }
            })
            .catch(error => {
                console.log(error);
        }); 

        document.getElementById("row"+no+"").outerHTML="";

        let p = []
        
        this.state.posts.forEach((post) => {
            if (post.userName === user.userName) {
                p.push(post._id)
            }
        });
        
        const table = document.getElementById("adminPostTable");
        for (let i = 0, row; row = table.rows[i]; i++) {
            if (p.includes(row.title)) {
                //row.outerHTML=""
                table.rows[i].style.display = 'none'
                
            }
           //iterate through rows
           //rows would be accessed using the "row" variable assigned in the for loop
           /* for (var j = 0, col; col = row.cells[j]; j++) {
             //iterate through columns
             //columns would be accessed using the "col" variable assigned in the for loop
           }   */
        }
            //this.alertBox("delete_s", user.userName)
        } else {
            this.alertBox("delete")
        }

    }

    checkInput(username, age, password, favmeal) {
        return (username.length>0) && (age.length>0) && (password.length>0) && (favmeal.length>0)
    }

    alertBox (cased, username) {

        if (cased === "add") {
            alert("Complete all inputs before creating or updating user info.")
        } else if (cased === "save") {
            alert("Complete all inputs before creating or updating user info.")
        } else if (cased === "delete") {
            alert("UNAUTHORIZED: User Type Admin cannot be deleted.")
        } else if (cased === "create_s") {
            alert("CREATE-SUCCESS: " + username + " account created.")
        } else if (cased === "update_s") {
            alert("UPDATE-SUCCESS: " + username + " account updated.")
        } else if (cased === "delete_s") {
            alert("DELETE-SUCCESS: " + username + " account deleted.")
        }
        
    }

    // Handle click event that creates new user account info.
    addRow(e) {
        let new_username=document.getElementById("new_username").value;
        let new_age=document.getElementById("new_age").value;
        let new_password=document.getElementById("new_password").value;
        let new_favmeal=document.getElementById("new_favmeal").value;

        if (this.checkInput(new_username, new_age, new_password, new_favmeal)) {
            let table=document.getElementById("adminTable");
            let table_rows=(table.rows.length);
            let table_len=(this.state.table_len)-1
            
            let user = {
                    userName: new_username,
                    profilePic: "/static/media/profile.8813c39a.png",
                    password: new_password,
                    age: new_age,
                    favMeal: new_favmeal,
                    savedPosts: [],
                    isAdmin:false,
                    likedPosts: [],  // 1 = like, 0 = dislike
                    dislikedPosts: []
                }
    
            // API call: POST request to server creating new user account info in MongoDB 
            // Create our request constructor with all the parameters we need
            const request = new Request('/api/user', {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                }
            });
    
            console.log(request)
    
            // Send the request with fetch()
            fetch(request)
                .then(function (res) {
                    // Handle response we get from the API.
                    // Usually check the error codes to see what happened.
                    if (res.status === 200) {
    
                        // TODO
                        // If account creation was a success, tell the admin.
                        console.log('success::user: '+user.userName+' account created')
                        alert("CREATE-SUCCESS: " + user.userName + " account created.")
                        
                    } else {
                        // TODO
                        // If account creation failed, tell the user.
                        // Here we are adding a generic message, but you could be more specific in your app.
                        console.log('fail::user: '+user.userName+' account not created')
                        alert("CREATE-FAIL: " + user.userName + " account not created.")
    
                    }
                })
                .catch(error => {
                    console.log(error);
            });
    
            document.getElementById("new_username").value="";
            document.getElementById("new_age").value="";
            document.getElementById("new_password").value="";
            document.getElementById("new_favmeal").value="";
    
            const users = this.state.users
            users.push(user)
            this.setState({
                table_len: table_len +2,
                users: users
              });
            //this.alertBox("create_s", user.userName)
        } else {
            this.alertBox("add")
        }
            
      
    }

    // Handle click event that renders a modal box display user timeline.
    showModalPosts(e) {

        let row = e.target.name

        if (!this.state.modalDisplay) {
            let userName = document.getElementById("username"+row).innerHTML
            this.setState({
                currentUser: userName
            }
            )
        }

        this.setState({
            modalDisplay: !this.state.modalDisplay
          });     
    }

    generateTableRows() {
        const saveStyle = {
            display: 'none'
        }

        // API Call: GET all user account info from server/MongoDB
        let users = this.state.users

        let row = 1

        let tableRows = []
        let tableRow
        users.forEach(account => {
            tableRow = <tr id={"row"+row}>
                            <td id={"username"+row} value={account.userName}>{account.userName}</td>
                            <td id={"age"+row} value={account.age}>{account.age}</td>
                            {/* <td id={"password"+row} value={account.password}>{account.password}</td> */}
                            <td id={"password"+row} value={account.password}>*******</td>
                            <td id={"favmeal"+row} value={account.favMeal}>{account.favMeal}</td>
                            <td>
                                <button id={"edit_button"+row} value="Edit" className="edit" name={row} onClick={this.editRow}>Edit</button>
                                <button id={"save_button"+row}  value="Save" style={saveStyle} className="save" name={row} onClick={this.saveRow}>Save</button>
                                <button id={"delete_button"+row} value="Delete" className="delete_admin" name={row} onClick={this.deleteRow}>Delete</button>
                                <button id={"modal_button"+row} value="Modal" className="modal_but" name={row} onClick={this.showModalPosts}>Timeline</button>
                            </td>
                        </tr>

            tableRows.push(tableRow)
            row++
        });

        return tableRows

    }

    // Filter user table based on input in search bar.
    myFunction() {
        let input = document.getElementById("admin-search");
        let filter = input.value.toUpperCase();
        let table = document.getElementById("adminTable");
        let tr = table.getElementsByTagName("tr");
        for (let i = 1; i < tr.length; i++) {
            if (tr[i].firstElementChild.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }      
        }
    }

    render() {
        let tableRows = this.generateTableRows()

        return (

            <div>
                <div id={"admin-table"}>
                        <br></br>
                        <input type="text" id="admin-search" onKeyUp={this.myFunction} placeholder="Search for users.." title="Type in a name"></input>
                    <table  cellSpacing={2} cellPadding={5} id={"adminTable"} border={1}>
                        <thead>
                            <tr>
                                <th>User Name</th>
                                <th>age</th>
                                <th>Password</th>
                                <th>Favorite Meal</th>
                                <th></th>
                            </tr>
                            <tr>
                                <td><input placeholder={"Enter New Username"} type="text" id="new_username"></input></td>
                                <td><input placeholder={"Enter New User Age"} type="text" id="new_age"></input></td>
                                <td><input placeholder={"Enter New User Password"} type="text" id="new_password"></input></td>
                                <td><input placeholder={"Enter New User Fav Meal"}  type="text" id="new_favmeal"></input></td>
                                <td><input type="button" className="add" onClick={this.addRow} value="Add Row"></input></td>
                            </tr>
    
                        </thead>

                        <tbody>

                            {tableRows}

                        </tbody>
                    </table>
                </div>

                <ModalPosts currentUser={this.state.currentUser} app={this.state} onClose={this.showModalPosts} show={this.state.modalDisplay}>Message in Modal</ModalPosts>
            </div>
            
        )
    }
}

export default AdminTable
