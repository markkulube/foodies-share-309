import React, { Component } from 'react'
import ModalPosts from '../ModalPosts/ModalPosts'

import "./AdminTable.css"

class AdminTable extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             table_len: props.appState.accounts.length + 2,
             modalDisplay: false,
             currentUser: ""
        }

        this.addRow = this.addRow.bind(this)
        this.editRow = this.editRow.bind(this)
        this.saveRow = this.saveRow.bind(this)
        this.deleteRow = this.deleteRow.bind(this)
        this.showModalPosts = this.showModalPosts.bind(this)  
    }
    

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
        password.innerHTML="<input type='text' name='"+password_data +"' id='password_text"+no+"' value='"+password_data+"'>";
        favmeal.innerHTML="<input type='text' name='"+favmeal_data +"' id='favmeal_text"+no+"' value='"+favmeal_data+"'>";
    }

    saveRow(e) {
        let no = e.target.name

        let oldUserName = document.getElementById("username_text"+no).name

        let username_val=document.getElementById("username_text"+no).value;
        let age_val=document.getElementById("age_text"+no).value;
        let password_val=document.getElementById("password_text"+no).value;
        let favmeal_val=document.getElementById("favmeal_text"+no).value;
 
        let accounts = this.props.appState.accounts
        accounts.forEach(account => {
            if (account.userName===oldUserName) {
                account.userName=username_val
                account.age=age_val
                account.password=password_val
                account.favMeal=favmeal_val

                account.posts.forEach(post => {
                    post.userName=username_val
                });
            }
        });

        document.getElementById("username"+no).innerHTML=username_val;
        document.getElementById("age"+no).innerHTML=age_val;
        document.getElementById("password"+no).innerHTML=password_val;
        document.getElementById("favmeal"+no).innerHTML=favmeal_val;

        document.getElementById("edit_button"+no).style.display="block";
        document.getElementById("save_button"+no).style.display="none";
    }

    deleteRow(e) {
        let no = e.target.name

        let username = document.getElementById("username"+no+"").innerHTML
        
        let accounts = this.props.appState.accounts
        
        for (let index = 0; index < accounts.length; index++) {
            const account = accounts[index];
    
            if (account.userName===username) {
                accounts.splice(index, 1)
            }
        }

        document.getElementById("row"+no+"").outerHTML="";
    }

    addRow(e) {
        let new_username=document.getElementById("new_username").value;
        let new_age=document.getElementById("new_age").value;
        let new_password=document.getElementById("new_password").value;
        let new_favmeal=document.getElementById("new_favmeal").value;
            
        let table=document.getElementById("data_table");
        let table_rows=(table.rows.length);
        let table_len=(this.state.table_len)-1
        
        let newUser = {
                userName: new_username,
                age: new_age,
                password: new_password,
                favMeal: new_favmeal,
                profilePic: "",
                isAdmin: false,
                isLoggedIn: false,
                posts:[]
            }
        
        this.props.appState.accounts.push(newUser)

        document.getElementById("new_username").value="";
        document.getElementById("new_age").value="";
        document.getElementById("new_password").value="";
        document.getElementById("new_favmeal").value="";

        this.setState({
            table_len: table_len +2
          });
    }

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

        let accounts = this.props.appState.accounts

        let row = 1

        let tableRows = []
        let tableRow
        accounts.forEach(account => {
            tableRow = <tr id={"row"+row}>
                            <td id={"username"+row} value={account.userName}>{account.userName}</td>
                            <td id={"age"+row} value={account.age}>{account.age}</td>
                            <td id={"password"+row} value={account.password}>{account.password}</td>
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
    render() {
        let tableRows = this.generateTableRows()

        return (

            <div>
                <div id={"admin-table"}>
                    <table  cellSpacing={2} cellPadding={5} id={"data_table"} border={1}>
                        <thead>
                            <tr>
                                <th>User Name</th>
                                <th>age</th>
                                <th>Password</th>
                                <th>Favorite Meal</th>
                                <th></th>
                            </tr>
                            <tr>
                                <td><input type="text" id="new_username"></input></td>
                                <td><input type="text" id="new_age"></input></td>
                                <td><input type="text" id="new_password"></input></td>
                                <td><input type="text" id="new_favmeal"></input></td>
                                <td><input type="button" className="add" onClick={this.addRow} value="Add Row"></input></td>
                            </tr>
    
                        </thead>

                        <tbody>

                            {tableRows}

                        </tbody>
                    </table>
                </div>

                <ModalPosts currentUser={this.state.currentUser} appState={this.props.appState} onClose={this.showModalPosts} show={this.state.modalDisplay}>Message in Modal</ModalPosts>
            </div>
            
        )
    }
}

export default AdminTable