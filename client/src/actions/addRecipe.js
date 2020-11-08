export const addRecipeFunc = addRecipe => {
    const currentUser = addRecipe.props.appState.currentUser;

    // Note: this follows the structure of posts defined in the global state.
    const post = {
        userName: currentUser.userName,
        profilePic: currentUser.profilePic,
        title: addRecipe.state.recipeName,
        category: addRecipe.state.category.toLowerCase(),  // casts string to correct check format
        desc: addRecipe.state.description,
        datePosted: new Date(),
        ingredients: addRecipe.state.ingredients.split(", "),
        steps: addRecipe.state.instruction.split(", "),
        reviews: [],
        likes: 0,
        dislikes: 0
    };

    // find index of the account of the recipe poster
    const accIndex = addRecipe.props.appState.accounts.findIndex((account) => account.isLoggedIn);

    // add the new post to their list of posts
    if (accIndex !== -1) {
        addRecipe.props.appState.accounts[accIndex].posts.push(post);
    }

}

export const addtoFavourites = addRecipe => {

    let flag=true;

    for(let i=0;i<addRecipe.props.appState.currentUser.savedPosts.length;i++)
    {
        if(addRecipe.props.appState.currentUser.savedPosts[i]===addRecipe.props.post)
        {
            flag=false;
        }
    }
    
    if(flag)
    {
        addRecipe.props.appState.currentUser.savedPosts.push(addRecipe.props.post)
    }
}