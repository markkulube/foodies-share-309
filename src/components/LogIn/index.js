import React from "react";
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';

import LogInForm from "./../LogInForm";
import Timeline from "../../components/Timeline";

// Importing actions/required methods
import { checkAccount } from "../../actions/signup";
import "./styles.css";

/* Component for the LogIn page */
class LogIn extends React.Component {

   state = {
    username: "",
    password: "",
    flag:false,
    accounts:[{ username: "user", password: "user" },
      { username: "admin", password: "admin" }]
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
      {/* Log In Form component with text and function props*/}
        <LogInForm
          userName={this.state.userName}
          password={this.state.password}
          handleChange={this.handleInputChange}
          checkAccount={() => checkAccount(this)}
        />
          {this.state.flag&&
            <Redirect to="/Timeline" render={() => 
                            (<Timeline appState={this.state}/>)}/>
          }
      </div>
    );
  }
}

export default LogIn;