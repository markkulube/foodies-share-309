import React from "react";
import { Route, Switch, BrowserRouter, Link } from 'react-router-dom';

import PostRecipe from "./../PostRecipe";
import Timeline from "./../Timeline";

// Importing actions/required methods
import { addRecipeFunc } from "../../actions/post";

/* Component for the PostRecipePage page */
class PostRecipePage extends React.Component {

constructor(props) {
    super(props);
    this.props.history.push("/PostRecipePage");

    if(this.props.app.state.currentUser===null)
        {
          this.props.history.push("/");
        }
}

 state = {
         recipeName:"",
         description:"",
         category:"",
         ingredients:"",
         instruction:""
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
      {/* Post Recipe component with text and function props*/}
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