/* Logic files for the Recipe component. */

/**
 * Save changes to the current state to the global state.
 *
 * @param recipe {Recipe} The Recipe component to save changes to.
 */
const saveChanges = (recipe) => {
    // obtain the information needed to find and edit this recipe in the global state.
    const { username, datePosted, appState } = recipe.props;

    // find the account with the given username
    // Note: This algorithm is linear time! The inner loop never runs more than once.
    for (let account of appState.accounts) {
        if (account.userName === username) {
            // find the post with the given date posted
            for (let post of account.posts) {
                // console.log(post.datePosted.getTime(), datePosted.getTime())
                if (post.datePosted.getTime() === datePosted.getTime()) {
                    console.log("saving changes to recipe");
                    // this is the correct post to modify
                    post.desc = recipe.state.desc;
                    post.title = recipe.state.title;
                    // TODO: modify other fields here
                    return;
                }
            }
        }
    }
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
export const toggleShowHide = (recipe) => {
    recipe.setState({isOpened: !recipe.state.isOpened});

    if (recipe.state.isOpened) {
        recipe.setState({button: "Show"});
        console.log("hid recipe");
    } else {
        recipe.setState({button: "Hide"});
        console.log("showed recipe");
    }
}
