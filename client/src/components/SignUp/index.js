import React from "react";
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import SignUpForm from "./../SignUpForm";
import LogIn from "../../components/LogIn";

// Importing actions/required methods
import { addAccount } from "../../actions/user";

/* Component for the SignUp page */
class SignUp extends React.Component {

constructor(props) {
    super(props);
    this.props.history.push("/SignUp");
}

  state = {
      username: "",
      password: "",
      age: "",
      favMeal: "" 
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
        <BrowserRouter>
          <Switch>
             <Route exact path='/LogIn' render={props => <LogIn {...props} app={this}/>} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default SignUp;