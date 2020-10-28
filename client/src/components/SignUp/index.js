import React from "react";
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import SignUpForm from "./../SignUpForm";
import Timeline from "../../components/Timeline";

// Importing actions/required methods
import { addAccount } from "../../actions/signup";

/* Component for the SignUp page */
class SignUp extends React.Component {

  state = {
    username: "",
    password: "",
    age: "",
    typeMeal: "",
    accounts:[{ username: "user", password: "user", age: "404", typeMeal: "Filet Mignon"},
      { username: "admin", password: "admin", age: "30", typeMeal: "Sliced Oranges" }]
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
            <Route exact path='/Timeline' render={() => 
                            (<Timeline appState={this.state}/>)}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default SignUp;