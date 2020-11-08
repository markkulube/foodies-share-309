import React from "react";
import { uid } from "react-uid";
import { UnmountClosed } from "react-collapse";
import { TextField } from "@material-ui/core";

// stylesheet
import "./Recipe.css";

// logic
import { toggleEdit, toggleShowHide } from "./RecipeLogic";

/**
 * A written recipe.
 *
 * Required props:
 *  - title         {string}    The title of the recipe.
 *  - desc          {string}    The summary description of the recipe shown at the top of the recipe.
 *  - ingredients   {string[]}  A list of ingredients required.
 *  - steps         {string[]}  The list of instructions to follow. Array indices indicate the order of instructions.
 */
export default class Recipe extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpened: false,
            button: "Show",
            editing: false,
            editButton: "Edit",

            desc: this.props.desc,  // the description of this recipe.
            title: this.props.title,  // the title of this recipe.
            ingredients: this.props.ingredients,
            steps: this.props.steps,
            category: this.props.category
        }

    }

    /**
     * Update the state of the target data field with the current event value.
     *
     * @param event {Object} The event with the value of the description input.
     * @param field {string} The field field we are changing.
     */
    handleChange = (event, field) => {
        const value = event.target.value;  // obtain new description from input
        this.setState({ [field]: value });  // update the current description to the new one.
    }

    handleChangeSpecial = (event, field) => {
        
        const value = event.target.value;  // obtain new description from input
        for(let i=0; i< this.props.appState.currentUser.posts.length;i++)
        {
            if(this.props.appState.currentUser.posts[i].title === this.state.title)
            {
                this.props.appState.currentUser.posts[i].category = value;
            }
        }
        this.setState({ [field]: value });  // update the current description to the new one.
    }

    handleChangeArrayIngredients = (event, field) => {
        
        const value = event.target.value;  // obtain new description from input
        let newValue = value.split(",");
        for(let i=0; i< this.props.appState.currentUser.posts.length;i++)
        {
            if(this.props.appState.currentUser.posts[i].title === this.state.title)
            {
                this.props.appState.currentUser.posts[i].ingredients = newValue;
            }
        }
        this.setState({ [field]: newValue });  // update the current description to the new one.
    }

    handleChangeArraySteps = (event, field) => {
        
        const value = event.target.value;  // obtain new description from input
        let newValue = value.split(",");
        for(let i=0; i< this.props.appState.currentUser.posts.length;i++)
        {
            if(this.props.appState.currentUser.posts[i].title === this.state.title)
            {
                this.props.appState.currentUser.posts[i].steps = newValue;
            }
        }
       
        this.setState({ [field]: newValue });
    }

    render() {
        // obtain the recipe title, description, and list of ingredients and steps to display
        // also obtain whether or not this recipe should be editable (correct account logged in)
        const { ingredients, steps, desc, title, category, canEdit } = this.props;
        
        // depending on whether or not we are in "editing" state, show text or input fields.
        let descElement, titleElement, ingredientElement, stepElement, categoryElement;
        if (this.state.editing) {
            descElement = <input onChange={(event) => this.handleChange(event, "desc")}
                                 value={this.state.desc}/>
            titleElement = <input onChange={(event) => this.handleChange(event, "title")}
                                  value={this.state.title}/>
            ingredientElement = <textarea onChange={(event) => this.handleChangeArrayIngredients(event, "ingredients")}
                                  value={this.state.ingredients}/>
            stepElement = <textarea onChange={(event) => this.handleChangeArraySteps(event, "steps")}
                                  value={this.state.steps}/>
            categoryElement =  <select value={this.state.category} onChange={(event) => this.handleChangeSpecial(event, "category")}>
                    <option value="category">Please Choose a Category</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Other">Other</option>
                                         
                </select>
        } else {
            descElement = <p>{this.state.desc}</p>
            titleElement = <h1>{this.state.title}</h1>
            categoryElement = <h1>{this.state.category}</h1>
            ingredientElement = <UnmountClosed isOpened={this.state.isOpened}>      
                    <ul>
                        {this.state.ingredients.map(ingredient => (
                            <li key={uid(ingredient)}>{ingredient}</li>
                        ))}
                    </ul>
                    </UnmountClosed>
            stepElement =  <UnmountClosed isOpened={this.state.isOpened}>
                <ol>
                        {this.state.steps.map(step => (
                            <li key={uid(step)}>{step}</li>
                        ))}
                    </ol>
                    </UnmountClosed>              
        }

        return (
            <div className={"recipe-container"}>
                {titleElement}
                {categoryElement}
                {descElement}
                {ingredientElement}
                {stepElement}
                <br/>
                <button onClick={() => toggleShowHide(this)}>{this.state.button}</button>
                { canEdit &&
                    <button onClick={() => toggleEdit(this)}>{this.state.editButton}</button>
                }
            </div>
        );
    }

}
