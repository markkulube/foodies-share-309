import profilePic from "../images/profile.png";

// A function to send a POST request with a new user
export const addRecipeFunc = addRecipe => {
    const currentUser = addRecipe.props.appState.currentUser;
  
    // the URL for the request
    const url = "/api/post";

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
        dislikes: 0,
        creator: currentUser.userName
    };

    // find index of the account of the recipe poster
    const accIndex = addRecipe.props.appState.accounts.findIndex((account) => account.isLoggedIn);

    // add the new post to their list of posts
    if (accIndex !== -1) {
        addRecipe.props.appState.accounts[accIndex].posts.push(post);
    }

    // Create our request constructor with all the parameters we need
  const request = new Request(url, {
        method: "post",
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
                // If student was added successfully, tell the user.
                addRecipe.setState({
                    message: {
                        body: "Success: Added a recipe.",
                        type: "success"
                    }
                });
            } else {
                // If server couldn't add the student, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                addRecipe.setState({
                    message: {
                        body: "Error: Could not add recipe.",
                        type: "error"
                    }
                });
            }
        })
        .catch(error => {
            console.log(error);
        });

};
