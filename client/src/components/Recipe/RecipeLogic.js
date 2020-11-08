/* Logic files for the Recipe component. */

/**
 * Save changes from the current recipe state to the server.
 *
 * @param recipe {Recipe} The Recipe component to save changes to.
 */
const saveChanges = (recipe) => {
    // TODO: edits to appState will be replaced with POST requests to server API.

    // obtain the information needed to find and edit this recipe in the global state.
    const { username, datePosted, appState } = recipe.props;

    // get index of account and post of such account to save changes for.
    const accountIndex = appState.accounts.findIndex(acc => acc.userName === username);
    const postIndex = appState.accounts[accountIndex].posts.findIndex(post =>
        post.datePosted.getTime() === datePosted.getTime()
    );

    // save changes by updating appState
    appState.accounts[accountIndex].posts[postIndex].desc = recipe.state.desc;
    appState.accounts[accountIndex].posts[postIndex].title = recipe.state.title;
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
