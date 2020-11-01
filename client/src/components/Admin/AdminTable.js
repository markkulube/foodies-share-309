import React, { Component } from 'react'

import "./AdminTable.css"

class AdminTable extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             table_len: 4
        }

        this.addRow = this.addRow.bind(this)
        this.editRow = this.editRow.bind(this)
        this.saveRow = this.saveRow.bind(this)
        this.deleteRow = this.deleteRow.bind(this)
    }
    

    editRow(e) {
        let no = e.target.name
        document.getElementById("edit_button"+no).style.display="none";
        document.getElementById("save_button"+no).style.display="block";
            
        let username=document.getElementById("username"+no);
        let email=document.getElementById("email"+no);
        let password=document.getElementById("password"+no);
        let favmeal=document.getElementById("favmeal"+no);
            
        let username_data=username.innerHTML;
        let email_data=email.innerHTML;
        let password_data=password.innerHTML;
        let favmeal_data=favmeal.innerHTML;
            
        username.innerHTML="<input type='text' id='username_text"+no+"' value='"+username_data+"'>";
        email.innerHTML="<input type='text' id='email_text"+no+"' value='"+email_data+"'>";
        password.innerHTML="<input type='text' id='password_text"+no+"' value='"+password_data+"'>";
        favmeal.innerHTML="<input type='text' id='favmeal_text"+no+"' value='"+favmeal_data+"'>";
    }

    saveRow(e) {
        let no = e.target.name
        let username_val=document.getElementById("username_text"+no).value;
        let email_val=document.getElementById("email_text"+no).value;
        let password_val=document.getElementById("password_text"+no).value;
        let favmeal_val=document.getElementById("favmeal_text"+no).value;

        document.getElementById("username"+no).innerHTML=username_val;
        document.getElementById("email"+no).innerHTML=email_val;
        document.getElementById("password"+no).innerHTML=password_val;
        document.getElementById("favmeal"+no).innerHTML=favmeal_val;

        document.getElementById("edit_button"+no).style.display="block";
        document.getElementById("save_button"+no).style.display="none";
    }

    deleteRow(e) {
        let no = e.target.name
        document.getElementById("row"+no+"").outerHTML="";
    }

    addRow() {
        let new_username=document.getElementById("new_username").value;
        let new_email=document.getElementById("new_email").value;
        let new_password=document.getElementById("new_password").value;
        let new_favmeal=document.getElementById("new_favmeal").value;
            
        let table=document.getElementById("data_table");
        let table_rows=(table.rows.length);
        let table_len=(this.state.table_len)-1
        
        table.insertRow(table_rows).outerHTML="<tr id='row"+table_len+
                        "'><td id='username"+table_len+"'>"+new_username+"</td><td id='email"+
                        table_len+"'>"+new_email+"</td><td id='password"+table_len+"'>"+new_password
                        +"</td>"+"<td id='favmeal"+table_len+"'>"+new_favmeal
                        +"</td><td><button name='"+table_len+ "' id='edit_button"+table_len+
                        "' value='Edit' className='edit' onClick='{this.editRow}'>Edit</button>"+
                        " <button name='"+table_len+ "' id='save_button"+table_len+
                        "' value='Save' className='save' onClick={this.saveRow}>Save</button>"+
                        " <button name='"+table_len+ "' id='delete_button"+table_len+ 
                        "' value='Delete' className='delete' onClick={this.deleteRow}>Delete</button></td></tr>";

        document.getElementById("new_username").value="";
        document.getElementById("new_email").value="";
        document.getElementById("new_password").value="";
        document.getElementById("new_favmeal").value="";

        document.getElementById("edit_button"+table_len).onclick=this.editRow
        document.getElementById("save_button"+table_len).onclick=this.saveRow
        document.getElementById("delete_button"+table_len).onclick=this.deleteRow

        document.getElementById("save_button"+table_len).style.display="none"
        this.setState({
            table_len: table_len +2
          });
    }

    render() {
        const saveStyle = {
            display: 'none'
        }

        return (

            <div id={"admin-table"}>
                <table  cellSpacing={2} cellPadding={5} id={"data_table"} border={1}>
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Favorite Meal</th>
                            <th></th>
                        </tr>
                        <tr>
                            <td><input type="text" id="new_username"></input></td>
                            <td><input type="text" id="new_email"></input></td>
                            <td><input type="text" id="new_password"></input></td>
                            <td><input type="text" id="new_favmeal"></input></td>
                            <td><input type="button" className="add" onClick={this.addRow} value="Add Row"></input></td>
                        </tr>
 
                    </thead>

                    <tbody>

                        <tr id="row1">
                            <td id="username1">user</td>
                            <td id="email1">user@user.com</td>
                            <td id="password1">user</td>
                            <td id="favmeal1">pasta</td>
                            <td>
                                <button id="edit_button1" value="Edit" className="edit" name="1" onClick={this.editRow}>Edit</button>
                                <button id="save_button1" value="Save" style={saveStyle} className="save" name="1" onClick={this.saveRow}>Save</button>
                                <button id="delete_button1" value="Delete" className="delete" name="1" onClick={this.deleteRow}>Delete</button>
                            </td>
                        </tr>

                        <tr id="row2">
                            <td id="username2">admin</td>
                            <td id="email2">admin@admin.com</td>
                            <td id="password2">admin</td>
                            <td id="favmeal2">beef</td>
                            <td>
                                <button id="edit_button2" value="Edit" className="edit" name="2" onClick={this.editRow}>Edit</button>
                                <button id="save_button2" value="Save" style={saveStyle} className="save" name="2" onClick={this.saveRow}>Save</button>
                                <button id="delete_button2" value="Delete" className="delete" name="2" onClick={this.deleteRow}>Delete</button>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>

            
        )
    }
}

export default AdminTable