export const addRecipeFunc = addRecipe => {
  
    const post = {  
       recipeName: addRecipe.state.recipeName,
       description: addRecipe.state.description,
       category: addRecipe.state.category,
       ingredients: addRecipe.state.ingredients,
       instructions: addRecipe.state.instructions
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