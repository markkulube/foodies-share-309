import React, { Component } from 'react'
import { Link } from "react-router-dom";

import "./AccountInfo.css"

import { signOut } from "../../actions/user";

// styles and images
import logo from "../../images/foodies.png";
import homePic from "../../images/home.png";
import signOutPic from "../../images/signout.png";
import postsPic from "../../images/posts.png";

/**
 * A component that renders user account info. The use is allowed
 * edit, update, and save operations.
 */
class AccountInfo extends Component {
    constructor(props) {
        super(props)
        // API call: GET use info from MongoDB

        this.props.history.push("/AccountInfo");
        
        if(this.props.app.state.currentUser===null)
        {
          this.props.history.push("/");
          this.state = {
            username: '',
            password: '',
            old_password: "",
            age: 0,
            favmeal: '',

            user: {
                    username: '',
                    password: '',
                    age: 0,
                    favmeal: ''
            }
            
        }

        this.avatar = ''
        }
        else
        {
        this.state = {
            username: this.props.app.state.currentUser.userName,
            password: this.props.app.state.currentUser.password,
            old_password: "",
            age: this.props.app.state.currentUser.age,
            favmeal: this.props.app.state.currentUser.favMeal,

            user: {
                    username: this.props.app.state.currentUser.userName,
                    password: this.props.app.state.currentUser.password,
                    age: this.props.app.state.currentUser.age,
                    favmeal: this.props.app.state.currentUser.favMeal
            }
            
        }

        this.avatar = this.props.app.state.currentUser.profilePic
        }

        this.handleEditClick = this.handleEditClick.bind(this)
        this.handleCancelClick = this.handleCancelClick.bind(this)
        this.handleUpdateClick = this.handleUpdateClick.bind(this)
        this.handleTyping = this.handleTyping.bind(this)

       
    }

    componentDidMount () {
        if(this.props.app.state.currentUser!==null){
        if (this.props.app.state.currentUser.isAdmin) {
            document.getElementById('profile-link').style.display = 'block'
        } else {
            document.getElementById('profile-link').style.display = 'none'
        }
        }
    }

    // Handle click event that enables editing of account info values.
    handleEditClick = () => { 

        this.setState({
            password: ""
          });

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
    handleCancelClick = () => {

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

    checkInput(username, age, password, favmeal) {
        return (username.length>0) && (age !== "") && (password.length>0) && (favmeal.length>0)
    }

    alertBox (cased) {
        if (cased === "success") {
            alert("SUCCESS: Account Info Updated.")
        } else {
            alert("Complete all inputs before updating account info.")
        }
        
    }

    // Handle click event that saves updated account info.
    handleUpdateClick = () => {

        let final_password 
        this.state.password === ""? final_password = this.state.user.password: final_password = this.state.password
      const user = {
        userName: this.state.username,
        profilePic: this.state.avatar,
        password: final_password,
        age: this.state.age,
        favMeal: this.state.favmeal,
        savedPosts: this.props.app.state.currentUser.savedPosts,
        isAdmin: this.props.app.state.currentUser.isAdmin,
        likedPosts: this.props.app.state.currentUser.likedPosts,  // 1 = like, 0 = dislike
        dislikedPosts: this.props.app.state.currentUser.dislikedPosts,
      };


      
      if (this.checkInput(this.state.username, this.state.age, this.state.password, this.state.favmeal))  {
        // Create our request constructor with all the parameters we need
        const request = new Request('/api/account/'+ this.props.app.state.currentUser._id, {
            method: "PATCH",
            body: JSON.stringify(user),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
          });
          
            // Send the request with fetch()
            fetch(request)
                .then(function (res) {
                    // Handle response we get from the API.
                    // Usually check the error codes to see what happened.
                    if (res.status === 200) {
    
                        // TODO
                        // If update was a success, tell the user.
                        console.log('success::account info updated')
                        alert("UPDATE-SUCCESS: " + user.userName + " account updated.")
                       
                    } else {
                        // TODO
                        // If update failed, tell the user.
                        // Here we are adding a generic message, but you could be more specific in your app.
                        console.log('fail::account info not updated')
                        alert("UPDATE-FAIL: " + user.userName + " account not updated.")
    
                    }
                })
            .catch(error => {
                console.log(error);
            });
    
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

            //this.alertBox("success")
      } else {
          this.alertBox()
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
        let displayAdminButt;
        if(this.props.app.state.currentUser!==null)
        {
        if (this.props.app.state.currentUser.isAdmin) {
            displayAdminButt = {diplay: 'block'}
        } else {
            displayAdminButt = {diplay: 'none'}
        }
        }
        
        return (
            <div id="account-info">
                <div id={"side-container-accinfo"} className={"side-container-accinfo"}>
                        <img id={"logo"} src={logo} alt={logo}/>
                        {/* <Link id={"profile-link"} to={"Admin"}>
                        <button id={"admin-button"}> 
                            <img id={"symbol"} src={adminPic} alt={adminPic}/>
                        Admin</button>
                        </Link> */}
                        <Link style={displayAdminButt} id={"profile-link"} to={"Admin"}>
                        <button > 
                            {/* <img id={"symbol"} src={this.state.currentUser.profilePic} alt={"profile-pic"}/> */}
                        Admin</button>
                        </Link>
                        <Link id={"timeLine-link"} to={"Timeline"}>
                        <button><img id={"symbol"} src={homePic} alt={homePic}/>
                        Timeline</button>
                        </Link>
                        <Link id={"userTimeline-link"} to={"UserTimeline"}>
                        <button>
                        <img id={"symbol"} src={postsPic} alt={postsPic}/>
                        My Posts</button>
                        </Link>
                        <Link id={"signout-link"} to={"/"}>
                            <button onClick={() => signOut(this)}>
                            <img id={"symbol"} src={signOutPic} alt={signOutPic}/>
                            Sign Out</button>
                        </Link>
                    </div>
                <div id="form" >

                    <div className="imgcontainer">
                        <img src={this.avatar} alt={"user profile picture"} className="avatar">
                            </img>
                    </div>

                    <div className="container">
                        <label className={"label-default"} for="uname"><b>User Name: {this.state.username}</b><br></br></label>
                        <input className={"edit-input text"} onChange={this.handleTyping} type="text" placeholder="Enter Username" value={this.state.username} name="username" required></input>
                        
                        <label className={"label-default"} for="uname"><br></br><b> Favorite Meal: {this.state.favmeal} </b><br></br></label>
                        <input className={"edit-input text"} onChange={this.handleTyping} type="text" placeholder="Enter Favorite Meal" value={this.state.favmeal} name="favmeal" required></input>
                        
                        <label className={"label-default"} for="uname"><br></br><b>Age: {this.state.age}</b><br></br></label>
                        <input className={"edit-input text"} onChange={this.handleTyping} type="text" placeholder="Enter Age" value={this.state.age} name="age" required></input>
                        
                        <label id={"psw-default"} className={"label-default"} for="psw"><br></br><b>Password: ******* </b><br></br></label>
                        <label id={"psw-edit"} className={"edit-input"} for="psw"><br></br><b>Password: {this.state.password} </b><br></br></label>
                        <input id={"psw-edit"} className={"edit-input"} onChange={this.handleTyping} type="password" placeholder="Enter New Password" value={this.state.password} name="psw" required></input>
                    
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