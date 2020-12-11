import React from "react";
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

import SignUpForm from "./../SignUpForm";
import LogIn from "../../components/LogIn";

// Importing actions/required methods
import { addAccount } from "../../actions/user";

import "./styles.css";

/* Component for the SignUp page */
class SignUp extends React.Component {

constructor(props) {
    super(props);
    this.props.history.push("/SignUp");
   
    if(this.props.app.state.currentUser!==null)
    {
      this.props.history.push("/Timeline");
    }
}

  state = {
      username: "",
      password: "",
      age: "",
      favMeal: "",
      message: {
        body: "",
        type: ""
      } 
  };

  // Generic handler for whenever we type in an input box.
  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value 
    });

  };

  render() {
    return (
      <div className="App">
      {/* Sign Up Form component with text and function props*/}
        <SignUpForm
          userName={this.state.userName}
          password={this.state.password}
          age={this.state.age}
          favMeal={this.state.favMeal}
          handleChange={this.handleInputChange}
          addAccount={() => addAccount(this)}
        />
        <br/>
        <p className="message">{this.state.message.body}</p>
        {this.state.message.type==="success"&&
             <Redirect to='/Login' render={props => <LogIn {...props} app={this}/>} />
        }
      </div>
    );
  }
}

export default SignUp;