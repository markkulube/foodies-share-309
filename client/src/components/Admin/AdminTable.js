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

    generateTableRows() {
        // TODO: Dynamically populate Table from building JSX on appState
        const saveStyle = {
            display: 'none'
        }

        let accounts = this.props.appState.accounts

        let row = 1

        let tableRows = []
        let tableRow
        accounts.forEach(account => {
            tableRow = <tr id={"row"+row}>
                            <td id={"username"+row}>{account.userName}</td>
                            <td id={"email"+row}>{account.age}</td>
                            <td id={"password"+row}>{account.password}</td>
                            <td id={"favmeal"+row}>{account.favMeal}</td>
                            <td>
                                <button id={"edit_button"+row} value="Edit" className="edit" name={row} onClick={this.editRow}>Edit</button>
                                <button id={"save_button"+row}  value="Save" style={saveStyle} className="save" name={row} onClick={this.saveRow}>Save</button>
                                <button id={"delete_button"+row} value="Delete" className="delete" name={row} onClick={this.deleteRow}>Delete</button>
                            </td>
                        </tr>

            tableRows.push(tableRow)
            row++
        });

        return tableRows

    }
    render() {
        const saveStyle = {
            display: 'none'
        }

        let tableRows = this.generateTableRows()

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

                        {tableRows}

                    </tbody>
                </table>
            </div>

            
        )
    }
}

export default AdminTable