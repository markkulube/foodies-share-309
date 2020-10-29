



export const addRecipe = post => {
    
    const postList = post.state.postList;
  
    const posting = {
      username: post.state.studentName,
      post: post.state.studentCourse,
      recipeTitle: post.state.recipeTitle
    };

    postList.push(post);

}