import profilePic from "../images/profile.png";

// Send a request to check if a user is logged in through the session cookie
export const checkSession = (app) => {
    const url = "/user/check-session";

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json && json.currentUser) {
                app.setState({ currentUser: json.currentUser });
            }
        })
        .catch(error => {
            console.log(error);
        });
};

// A function to send a POST request with a new user
export const addAccount = signup => {

   // the URL for the request
   const url = "/api/user";

  const user = {
    userName: signup.state.userName,
    profilePic: profilePic,
    password: signup.state.password,
    age: signup.state.age,
    favMeal: signup.state.favMeal,
    savedPosts: [],
    isAdmin:false,
    likedPosts: [],  // 1 = like, 0 = dislike
    dislikedPosts: []
  };
  
  // Create our request constructor with all the parameters we need
  const request = new Request(url, {
        method: "post",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
  });

    // Send the request with fetch()
    fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                // If student was added successfully, tell the user.
                signup.setState({
                    message: {
                        body: "Success: Added a student.",
                        type: "success"
                    }
                });
            } else {
                // If server couldn't add the student, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                signup.setState({
                    message: {
                        body: "Error: Could not add student.",
                        type: "error"
                    }
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
};

// A function to send a POST request with the user to be logged in
export const checkAccount = (loginComp, app) => {
   // Create our request constructor with all the parameters we need
    const request = new Request("/user/login", {
        method: "post",
        body: JSON.stringify(loginComp.state),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json.currentUser !== undefined) {
                app.setState({ currentUser: json.currentUser });
            }
        })
        .catch(error => {
            console.log(error);
        });
};

// A function to send a GET request to logout the current user
export const signOut = app => {
    const url = "/api/logout";

    fetch(url)
        .then(res => {
            app.props.app.setState({
                currentUser: null,
                message: { type: "", body: "" }
            });
        })
        .catch(error => {
            console.log(error);
        });
};