import React from "react";
import { Route, Switch, BrowserRouter, Link } from 'react-router-dom';

import PostRecipe from "./../PostRecipe";
import Timeline from "./../Timeline";

// Importing actions/required methods
import { addRecipeFunc } from "../../actions/addRecipe";

/* Component for the SignUp page */
class PostRecipePage extends React.Component {

constructor(props) {
    super(props);
    this.state = {
         recipeName:"",
         description:"",
         category:"",
         ingredients:"",
         instruction:""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
}

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
        <PostRecipe
           recipeName={this.state.recipeName}
           description={this.state.description}
           category={this.state.category}
           ingredients={this.state.ingredients}
           instruction={this.state.instruction}
           handleChange={this.handleInputChange}
           addRecipeFunc={() => addRecipeFunc(this)}
        />
      </div>
    );
  }
}

export default PostRecipePage;