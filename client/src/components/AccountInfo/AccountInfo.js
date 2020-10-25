import React, { Component } from 'react'

// styles and images
import "./AccountInfo.css"
import avatar from "./static/img_avatar2.png"


class AccountInfo extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            userName: "testuser",
            password: "pass123",
            email: "testuser@email.com",
            favMeal: "pasta"
        }
    }
    

    render() {
        return (
            <div id="account-info">
                <div id="form" >

                    <div id="account-info-header">
                        <h2>My Account</h2>
                    </div>
                    <div className="imgcontainer">
                        <img src={avatar} alt={avatar} className="avatar">
                            </img>
                    </div>

                    <div className="container">
                        <label for="uname"><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;user name: {this.state.userName}</b></label> <br></br><br></br>
                        <label for="uname"><b>favorite dish: {this.state.favMeal} </b></label> <br></br><br></br>
                        <label for="uname"><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;email: {this.state.email}</b></label> <br></br>
                        <br></br>
                        <label for="psw"><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;password: ******* </b></label><br></br>
                        <br></br> 
                        <button onClick={this.handleEditClick} >Edit</button><br></br>
                    </div>

                </div>
            </div>
        )
    }
}

export default AccountInfo