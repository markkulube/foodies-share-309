import React, { Component } from 'react'
import { Link } from "react-router-dom";

import "./AccountInfo.css"

/**
 * A component that renders user account info. The use is allowed
 * edit, update, and save operations.
 */
class AccountInfo extends Component {

    constructor(props) {
        super(props)
        // API call: GET use info from MongoDB
        this.state = {
            username: this.props.appState.currentUser.userName,
            password: this.props.appState.currentUser.password,
            age: this.props.appState.currentUser.age,
            favmeal: this.props.appState.currentUser.favMeal,

            user: {
                    username: this.props.appState.currentUser.userName,
                    password: this.props.appState.currentUser.password,
                    age: this.props.appState.currentUser.age,
                    favmeal: this.props.appState.currentUser.favMeal
            }
            
        }

        this.avatar = this.props.appState.currentUser.profilePic

        this.handleEditClick = this.handleEditClick.bind(this)
        this.handleCancelClick = this.handleCancelClick.bind(this)
        this.handleUpdateClick = this.handleUpdateClick.bind(this)
        this.handleTyping = this.handleTyping.bind(this)
    }

    componentDidMount () {
        if (this.props.appState.currentUser.isAdmin) {
            document.getElementById('admin-button').style.display = 'inline-block'
        } 
    }

    // Handle click event that enables editing of account info values.
    handleEditClick = (e) => {

        document.querySelector("#psw-default").style.display="none"
        document.querySelector("#edit").style.display="none"

        let elems = document.querySelectorAll(".edit-input")
        let length = elems.length;
        for (let index = 0; index < length; index++) {
            elems[index].style.display="block"
        }
        document.querySelector("#cancel").style.display="inline-block"
        document.querySelector("#update").style.display="inline-block"

    }

    // Handle click event that cancels editing of account info values.
    handleCancelClick = (e) => {

        document.querySelector("#psw-default").style.display="block"
        document.querySelector("#edit").style.display="inline-block"

        // Select and hide editing of input fields
        let elems = document.querySelectorAll(".edit-input")
        let length = elems.length;
        for (let index = 0; index < length; index++) {
            elems[index].style.display="none"
        }

        let username = this.state.user.username
        let password = this.state.user.password
        let age = this.state.user.age
        let favmeal = this.state.user.favmeal

        this.setState({
            username: username,
            password: password,
            age: age,
            favmeal: favmeal
          });
    }

    // Handle click event that saves updated account info.
    handleUpdateClick = (e) => {

    // API call: POST request to server updating user account info in MongoDB
    this.props.appState.currentUser.userName = this.state.username;
    this.props.appState.currentUser.password = this.state.password;
    this.props.appState.currentUser.age= this.state.age;
    this.props.appState.currentUser.favMeal= this.state.favmeal;
    
    let app_accountList = this.props.appState.accounts;
    
    // Update user account values.
    for(let i=0; i<app_accountList.length; i++) {
        if(app_accountList[i].isLoggedIn.valueOf()) {
            app_accountList[i].userName = this.state.username;
            app_accountList[i].password = this.state.password;
            app_accountList[i].age= this.state.age;
            app_accountList[i].favMeal= this.state.favmeal;
            break;
        }
    }

    let newuser = {
            username: this.state.username,
            password: this.state.password,
            age: this.state.age,
            favmeal: this.state.favmeal
        }

        this.setState({
            user: newuser
          });

        document.querySelector("#psw-default").style.display="block"
        document.querySelector("#edit").style.display="inline-block"

        // Select and hide editing of input fields
        let elems = document.querySelectorAll(".edit-input")
        let length = elems.length;
        for (let index = 0; index < length; index++) {
            elems[index].style.display="none"
        }

        elems = document.querySelectorAll(".label-default")
        length = elems.length;
        for (let index = 0; index < length; index++) {
            elems[index].style.display="block"
        }
    }

    // update state of input values as user types
    handleTyping(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        switch (name) {
            case "username":
                this.setState({
                    username: value
                  });
                break;
            case "favmeal":
                this.setState({
                    favmeal: value
                  });
                break;
            case "age":
                this.setState({
                    age: value
                  });
                break;
            case "psw":
                this.setState({
                    password: value 
                  });
                break;
        
            default:
                break;
        }

    }
    
    render() {
        return (
            <div id="account-info">
                <div id="form" >

                    <div id="account-info-header">
                        <h2>My Account</h2>
                        <Link to={"/Timeline"}>  
                            <button className={"account-info-nav-buttons"}>Home</button>
                        </Link>
                        <Link to={"/userTimeline"}>
                        <button className={"account-info-nav-buttons"}>My Timeline</button>
                        </Link>
                        <Link to={"/Admin"}>  
                            <button className={"account-info-nav-buttons"} id={"admin-button"} style={{display: "none"}}>Admin</button>
                        </Link>
                        <Link to={""}>
                            <button className={"account-info-nav-buttons"}>Sign Out</button>
                        </Link>
                    </div>
                    <div className="imgcontainer">
                        <img src={this.avatar} alt={this.avatar} className="avatar">
                            </img>
                    </div>

                    <div className="container">
                        <label className={"label-default"} for="uname"><b>User Name: {this.state.username}</b><br></br></label>
                        <input maxLength={10} className={"edit-input text"} onChange={this.handleTyping} type="text" placeholder="Enter Username" value={this.state.username} name="username" required></input>
                        
                        <label className={"label-default"} for="uname"><br></br><b> Favorite Meal: {this.state.favmeal} </b><br></br></label>
                        <input maxLength={10} className={"edit-input text"} onChange={this.handleTyping} type="text" placeholder="Enter Favorite Meal" value={this.state.favmeal} name="favmeal" required></input>
                        
                        <label className={"label-default"} for="uname"><br></br><b>Age: {this.state.age}</b><br></br></label>
                        <input maxLength={15} className={"edit-input text"} onChange={this.handleTyping} type="text" placeholder="Enter Age" value={this.state.age} name="age" required></input>
                        
                        <label id={"psw-default"} className={"label-default"} for="psw"><br></br><b>Password: ******* </b><br></br></label>
                        <label id={"psw-edit"} className={"edit-input"} for="psw"><br></br><b>Password: {this.state.password} </b><br></br></label>
                        <input maxLength={10} id={"psw-edit"} className={"edit-input"} onChange={this.handleTyping} type="password" placeholder="Enter Password" value={this.state.password} name="psw" required></input>
                    
                        <button id={"edit"} className={"label-default"} onClick={this.handleEditClick} >Edit<br></br></button>
                        <button id={"cancel"} className="edit-input" onClick={this.handleCancelClick} >Cancel<br></br></button><br></br>
                        <button id={"update"} className="edit-input" onClick={this.handleUpdateClick} >Update<br></br></button>
                    </div>

                </div>
            </div>
        )
    }
}

export default AccountInfo