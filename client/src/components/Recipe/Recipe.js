import React from "react";
import { uid } from "react-uid";
import { UnmountClosed } from "react-collapse";

// stylesheet
import "./Recipe.css";

// logic
import { toggleEdit, toggleRecipe } from "./RecipeLogic";

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

            // below are the values of this Recipe's state
            desc: this.props.desc,
            title: this.props.title,
            ingredients: this.props.ingredients,
            steps: this.props.steps,
            category: this.props.category
        }

    }

    /**
     * Update the state of the target data field with the current event value.
     *
     * @param event {Object} The event with the value of the input.
     * @param field {string} The field we are changing.
     */
    handleChange = (event, field) => {
        const value = event.target.value;
        this.setState({ [field]: value });
    }

    /**
     * Update the category of this post with the value of the category drop-down menu.
     *
     * @param event {Object} The event with the value of the input.
     */
    handleChangeSpecial = (event) => {

        const value = event.target.value;

        this.setState({ "category": value });
    }

    /**
     * Update the given field (a list of elements) with the value of the input.
     *
     * @param event {Object} The event with the value of the input.
     * @param field {string} The field we are editing.
     */
    handleChangeArray = (event, field) => {
       
        const value = event.target.value;
        let newValue = value.split(",");

        this.setState({ [field]: newValue });
    }

    render() {
        // obtain the recipe title, description, and list of ingredients and steps to display
        // also obtain whether or not this recipe should be editable (correct account logged in)
        const { canEdit } = this.props;
        
        // depending on whether or not we are in "editing" state, show text or input fields.
        let descElement, titleElement, ingredientElement, stepElement, categoryElement;
        if (this.state.editing) {
            descElement = <input onChange={(event) => this.handleChange(event, "desc")}
                                 value={this.state.desc}/>
            titleElement = <input onChange={(event) => this.handleChange(event, "title")}
                                  value={this.state.title}/>
            ingredientElement = <textarea onChange={(event) => this.handleChangeArray(event, "ingredients")}
                                  value={this.state.ingredients}/>
            stepElement = <textarea onChange={(event) => this.handleChangeArray(event, "steps")}
                                  value={this.state.steps}/>
            categoryElement =  <input  onChange={(event) => this.handleChangeSpecial(event)}
                                   value={this.state.category}/>
        } else {
            descElement = <p>{this.state.desc}</p>
            titleElement = <h1>{this.state.title}</h1>
            categoryElement = <h1 className="visible">{this.state.category}</h1>
            ingredientElement = (
                <UnmountClosed isOpened={this.state.isOpened}>
                    <br/>
                    <h1>Ingredients</h1>
                    <ul>
                        {this.state.ingredients.map(ingredient => (
                            <li className="ingredients" key={uid(ingredient)}>{ingredient}</li>
                        ))}
                    </ul>
                </UnmountClosed>
            );
            stepElement = (
                <UnmountClosed isOpened={this.state.isOpened}>
                    <br/>
                    <h1>Instructions</h1>
                    <ol>
                        {this.state.steps.map(step => <li key={uid(step)}>{step}</li>)}
                    </ol>
                </UnmountClosed>
            )
        }

        return (
            <div className={"recipe-container"}>
                {titleElement}
                {categoryElement}
                <br/>
                {descElement}
                {ingredientElement}
                {stepElement}
                <br/>
                <button onClick={() => toggleRecipe(this)}>{this.state.button}</button>
                { canEdit &&
                    <button onClick={() => toggleEdit(this)}>{this.state.editButton}</button>
                }
            </div>
        );
    }

}
