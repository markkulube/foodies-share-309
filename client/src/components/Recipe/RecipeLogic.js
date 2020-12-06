/* Logic files for the Recipe component. */

/**
 * Save changes from the current recipe state to the server.
 *
 * @param recipe {Recipe} The Recipe component to save changes to.
 */
const saveChanges = (recipe) => {
    // TODO: edits to appState will be replaced with POST requests to server API.
    console.log(recipe)

      const post = {
        userName: recipe.props.userName,
        profilePic: recipe.props.profilePic,
        title: recipe.state.title,
        category: recipe.state.category.toLowerCase(),  // casts string to correct check format
        desc: recipe.state.desc,
        datePosted: recipe.props.datePosted,
        ingredients: recipe.state.ingredients,
        steps: recipe.state.steps,
        reviews: recipe.props.reviews,
        likes: recipe.props.likes,
        dislikes: recipe.props.likes,
        creator: recipe.props.creator
    };
   
   // Create our request constructor with all the parameters we need
      const request = new Request('/api/post/'+ recipe.props.id, {
            method: "PATCH",
            body: JSON.stringify(post),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
      });

      console.log(request)
      
        // Send the request with fetch()
        fetch(request)
            .then(function (res) {
                // Handle response we get from the API.
                // Usually check the error codes to see what happened.
                if (res.status === 200) {

                    // TODO
                    // If update was a success, tell the user.
                    console.log('success::post info updated')
                   
                } else {
                    // TODO
                    // If update failed, tell the user.
                    // Here we are adding a generic message, but you could be more specific in your app.
                    console.log('fail::post info not updated')

                }
            })
        .catch(error => {
            console.log(error);
        });
}

/**
 * Toggle the option to edit this recipe. This method should only be called for Recipes with canEdit.
 *
 * @param recipe {Recipe} The Recipe component to toggle.
 */
export const toggleEdit = (recipe) => {
    recipe.setState({ editing: !recipe.state.editing });

    if (recipe.state.editing) {  // remove ability to edit text fields
        recipe.setState({ editButton: "Edit" });
        saveChanges(recipe);  // save changes to global state
    } else {  // enable user to edit text fields
        recipe.setState({ editButton: "Save" });
        console.log("editing recipe");
    }
}

/**
 * Show or hide full recipe body.
 *
 * @param recipe {Recipe} The Recipe component to toggle.
 */
export const toggleRecipe = (recipe) => {
    recipe.setState({isOpened: !recipe.state.isOpened});

    if (recipe.state.isOpened) {
        recipe.setState({button: "Show"});
        console.log("hid recipe");
    } else {
        recipe.setState({button: "Hide"});
        console.log("showed recipe");
    }
}
