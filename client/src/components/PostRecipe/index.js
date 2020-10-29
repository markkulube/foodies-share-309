import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Input from "./../Input";
import "./PostRecipe.css"
import { TextField } from "@material-ui/core";

class PostRecipe extends React.Component {
    
    render(){
        const{
            recipeName,
            category,
            instruction,
            handleChange,
            addRecipe,
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
                <textarea></textarea>
                <Input
                    name="category"
                    value={category}
                    onChange={handleChange}
                    label="Category"
                />

                <TextField
                    name="instruction"
                    value={instruction}
                    onChange={handleChange}
                    label="instruction"
                />

                <Link to={"Timeline"}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={addRecipe}
                    >
                        Post it on Foodies
                    </Button>
                </Link>
            </div>
        );
    }


}
export default PostRecipe