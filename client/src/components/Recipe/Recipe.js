import React from "react";
import { uid } from "react-uid";
import { UnmountClosed } from "react-collapse";

// stylesheet
import "./Recipe.css";

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
            editButton: "Edit"
        }
    }

    /**
     * Show or hide full recipe body.
     */
    toggleShowHide = () => {
        this.setState({isOpened: !this.state.isOpened});

        if (this.state.isOpened) {
            this.setState({button: "Show"});
            console.log("hid recipe");
        } else {
            this.setState({button: "Hide"});
            console.log("showed recipe");
        }
    }

    render() {
        // obtain the recipe title, description, and list of ingredients and steps to display
        // also obtain whether or not this recipe should be editable (correct account logged in)
        const { title, desc, ingredients, steps, canEdit } = this.props;

        return (
            <div className={"recipe-container"}>
                <h1>{title}</h1>
                <p>{desc}</p>
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
                <button onClick={this.toggleShowHide}>{this.state.button}</button>
                { canEdit &&
                    <button>{this.state.editButton}</button>
                }
            </div>
        );
    }

}
