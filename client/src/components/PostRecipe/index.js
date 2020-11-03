import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Input from "./../Input";
import "./PostRecipe.css"
import { TextField } from "@material-ui/core";

import {addRecipeFunc} from "../../actions/addRecipe";

class PostRecipe extends React.Component {
    
    render(){
        const{
            recipeName,
            description,
            category,
            ingredients,
            instruction,
            handleChange,
            addRecipeFunc,
          } = this.props;
    
        return(
            <div className="App">
                <h1>Post a Recipe!</h1>
                <Input
                    className="left-col"
                    name="recipeName"
                    value={recipeName}
                    onChange={handleChange}
                    label="Recipe Name"
                    
                />
                <br/>
                <br/>
                 <textarea
                    name="description"
                    value={description}
                    onChange={handleChange}
                    label="Description"
                    placeholder="Description..."
                />

                <br/>
                <br/>
                <select name="category" label="category" value={category} onChange={handleChange}>
                    <option value="category">Please Choose a Category</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Other">Other</option>
                                         
                </select>
                <br/>
                <br/>
                 <textarea
                    name="ingredients"
                    value={ingredients}
                    onChange={handleChange}
                    label="Ingredients"
                    placeholder="Ingredients..."
                />
                <br/>
                <br/>
                <textarea
                    name="instruction"
                    value={instruction}
                    onChange={handleChange}
                    label="Instruction"
                    placeholder="Instructions..."
                />
                <br/>
                <br/>
                <Link id={"timeline-link"} to={"Timeline"}>
                    <Button 
                        className="post-button"
                        onClick={addRecipeFunc}
                    >
                        Post it on Foodies
                    </Button>
                </Link>
            </div>
        );
    }


}
export default PostRecipe