import React from "react";
import "../../actions/addRecipe"
import Recipe from "../Recipe/Recipe"

import "./Post.css"

class Post extends React.Component{
  constructor(props) {
    super(props);
    
}  
    render(){
        const { username,profilePic, title, desc, ingredients, steps } = this.props;

        return(
            <div className = "App">
             <div className ="block">
                <img src={profilePic} className="profilePic"/>
                <h3 className="username">{username}</h3>
             </div>
            <div className="block">
            
                  <Recipe
                    title= {title}
                    desc= {desc}
                    ingredients= {ingredients}
                    steps= {steps}
                  />
                  {/* buttons component, implementing next 
                  <LikeButton />
                  <DislikeBUtton />
                  <ReviewButton />
                 */}
            </div>
            </div>
            

        );
    }

}

export default Post