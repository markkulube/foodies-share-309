import React from "react";
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';

import LogInForm from "./../LogInForm";
import Timeline from "../../components/Timeline";

// Importing actions/required methods
import { checkAccount } from "../../actions/user";
import "./styles.css";

/* Component for the LogIn page */
class LogIn extends React.Component {

  constructor(props) {
    super(props);
    this.props.history.push("/LogIn");
  }

   state = {
    userName: "",
    password: "",
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

    const { app } = this.props

    return (
      <div className="App">
      {/* Log In Form component with text and function props*/}
        <LogInForm
          userName={this.state.userName}
          password={this.state.password}
          handleChange={this.handleInputChange}
          checkAccount={() => checkAccount(this, app)}
        />
        <p className="message2">{this.state.message.body}</p>
          {app.state.currentUser&&
             <Redirect to='/Timeline' render={props => <Timeline {...props} app={this}/>} />
          }
      </div>
    );
  }
}

export default LogIn;