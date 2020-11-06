import React from "react";
import { uid } from "react-uid";
import { UnmountClosed } from "react-collapse";

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
            title: this.props.title  // the title of this recipe.
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

    render() {
        // obtain the recipe title, description, and list of ingredients and steps to display
        // also obtain whether or not this recipe should be editable (correct account logged in)
        const { ingredients, steps, canEdit } = this.props;

        // depending on whether or not we are in "editing" state, show text or input fields.
        let descElement, titleElement;
        if (this.state.editing) {
            descElement = <input onChange={(event) => this.handleChange(event, "desc")}
                                 value={this.state.desc}/>
            titleElement = <input onChange={(event) => this.handleChange(event, "title")}
                                  value={this.state.title}/>
        } else {
            descElement = <p>{this.state.desc}</p>
            titleElement = <h1>{this.state.title}</h1>
        }

        return (
            <div className={"recipe-container"}>
                {titleElement}
                {descElement}
                <UnmountClosed isOpened={this.state.isOpened}>
                    <ul>
                        {ingredients.map(ingredient => (
                            <li key={uid(ingredient)}>{ingredient}</li>
                        ))}
                    </ul>
                    <ol>
                        {steps.map(step => (
                            <li key={uid(step)}>{step}</li>
                        ))}
                    </ol>
                </UnmountClosed>
                <button onClick={() => toggleShowHide(this)}>{this.state.button}</button>
                { canEdit &&
                    <button onClick={() => toggleEdit(this)}>{this.state.editButton}</button>
                }
            </div>
        );
    }

}
