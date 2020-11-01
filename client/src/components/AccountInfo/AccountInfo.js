import React, { Component } from 'react'
import { Link } from "react-router-dom";

// styles and images
import "./AccountInfo.css"
import avatar from "./static/img_avatar3.png"


class AccountInfo extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            username: "user",
            password: "user",
            email: "user@user.com",
            favmeal: "pasta",

            user: {
                    username: "user",
                    password: "user",
                    email: "user@user.com",
                    favmeal: "pasta"
            }
        }

        this.handleEditClick = this.handleEditClick.bind(this)
        this.handleCancelClick = this.handleCancelClick.bind(this)
        this.handleUpdateClick = this.handleUpdateClick.bind(this)
        this.handleTyping = this.handleTyping.bind(this)
    }

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

    handleCancelClick = (e) => {

        document.querySelector("#psw-default").style.display="block"
        document.querySelector("#edit").style.display="inline-block"

        let elems = document.querySelectorAll(".edit-input")
        let length = elems.length;
        for (let index = 0; index < length; index++) {
            elems[index].style.display="none"
        }

        let username = this.state.user.username
        let password = this.state.user.password
        let email = this.state.user.email
        let favmeal = this.state.user.favmeal

        this.setState({
            username: username,
            password: password,
            email: email,
            favmeal: favmeal
          });
    }

    handleUpdateClick = (e) => {

      let newuser = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            favmeal: this.state.favmeal
        }

        this.setState({
            user: newuser
          });

        document.querySelector("#psw-default").style.display="block"
        document.querySelector("#edit").style.display="inline-block"

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
            case "email":
                this.setState({
                    email: value
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
                        <Link to={"/"}>  {/* TODO: replace with link to home page */}
                            <button className={"account-info-nav-buttons"}>Home</button>
                        </Link>
                        <Link to={"/Timeline"}>  {/* TODO: replace with link to time line */}
                            <button className={"account-info-nav-buttons"}>Timeline</button>
                        </Link>
                    </div>
                    <div className="imgcontainer">
                        <img src={avatar} alt={avatar} className="avatar">
                            </img>
                    </div>

                    <div className="container">
                        <label className={"label-default"} for="uname"><b>User Name: {this.state.username}</b><br></br></label>
                        <input maxLength={10} className={"edit-input text"} onChange={this.handleTyping} type="text" placeholder="Enter Username" value={this.state.username} name="username" required></input>
                        
                        <label className={"label-default"} for="uname"><br></br><b> Favorite Meal: {this.state.favmeal} </b><br></br></label>
                        <input maxLength={10} className={"edit-input text"} onChange={this.handleTyping} type="text" placeholder="Enter Favorite Meal" value={this.state.favmeal} name="favmeal" required></input>
                        
                        <label className={"label-default"} for="uname"><br></br><b>Email: {this.state.email}</b><br></br></label>
                        <input maxLength={15} className={"edit-input text"} onChange={this.handleTyping} type="text" placeholder="Enter Email" value={this.state.email} name="email" required></input>
                        
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