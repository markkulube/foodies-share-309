export const addRecipeFunc = addRecipe => {
    const currentUser = addRecipe.props.appState.currentUser;

    // Note: this follows the structure of posts defined in the global state.
    const post = {
        username: currentUser.userName,
        profilePic: currentUser.profilePic,
        title: addRecipe.state.recipeName,
        category: addRecipe.state.category,
        desc: addRecipe.state.description,
        datePosted: new Date(),
        ingredients: addRecipe.state.ingredients.split(", "),
        steps: addRecipe.state.instruction.split(", "),
        reviews: []
   };

   const app_accountList = addRecipe.props.appState.accounts;
  
   for(let i=0; i<app_accountList.length; i++)
   {
        if(app_accountList[i].isLoggedIn.valueOf()===(true))
        {
          app_accountList[i].posts.push(post);
          break;
        }
   }

}