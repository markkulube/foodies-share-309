import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import "./styles.css";

/* Component for the Home page */
class SignUp extends React.Component {

  state = {
    username: "",
    password: "",
    age: "",
    typeMeal: ""
  };

  // Generic handler for whenever we type in an input box.
  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value // [name] sets the object property name to the value of the `name` variable.
    });
  };
  render() {
    return (
      <div className="App">
        {/* Header component with text props. */}
        <TextField
             hintText="Enter your Username"
             floatingLabelText="Username"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
             />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
      </div>
    );
  }
}

export default SignUp;