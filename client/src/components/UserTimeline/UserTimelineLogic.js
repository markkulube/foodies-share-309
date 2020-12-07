/**
 * Update the User timeline's state with the posts specified by the option.
 *
 * @param {UserTimeline}    usertimeline    The User timeline component to update state.
 * @param {string}      option      The option to filter posts by.
 */
export const handleFilter = async(usertimeline, option) => {
    console.log("filtering posts with option:", option);

    // get list of all posts (sorted)
    const userPosts = await getUserPosts()  
    const savedPosts = await getAllSavedPosts()

    // TODO: All cases in switch will contain API calls to receive posts from backend
    switch (option) {
        case "home":  // obtain all posts
            usertimeline.setState({ userPosts: userPosts, savedPosts: savedPosts });
            break;
        case "breakfast":  // filter breakfast recipes and update state
            usertimeline.setState({ userPosts: userPosts.filter((post) => post.category === "breakfast"),
                                    savedPosts: savedPosts.filter((post) => post.category === "breakfast")});
            break;
        case "lunch":  // filter lunch recipes and update state
            usertimeline.setState({ userPosts: userPosts.filter((post) => post.category === "lunch"),
                                    savedPosts: savedPosts.filter((post) => post.category === "lunch")});
            break;
        case "dinner":  // filter dinner recipes and update state
            usertimeline.setState({ userPosts: userPosts.filter((post) => post.category === "dinner"),
                                    savedPosts: savedPosts.filter((post) => post.category === "dinner")});
            break;
        case "dessert":  // filter dessert recipes and update state
            usertimeline.setState({ userPosts: userPosts.filter((post) => post.category === "dessert"),
                                    savedPosts: savedPosts.filter((post) => post.category === "dessert")});
            break;
        case "other":
             usertimeline.setState({ userPosts: userPosts.filter((post) => post.category === "other"),
                                    savedPosts: savedPosts.filter((post) => post.category === "other")});
            break;
        default:
            // should never reach this
            throw new Error("invalid filter option for usertimeline feed");
    }
}

/**
 * Update the usertimeline's state with the posts specified by the search bar value.
 *
 * @param event     {Object}            The event to obtain filter option value from.
 * @param usertimeline  {usertimeline}   The usertimeline to update posts for.
 */
export const handleSearchFilter = async (event, usertimeline) => {
    event.preventDefault();
    // obtain the user input, ignoring case
    const value = event.target.value.toLowerCase();
    console.log("filtering post with parameter:", value);

    // filter posts that match the user input, ignoring case
    const target = await getUserPosts()
    usertimeline.setState({ userPosts: target.filter((post) => post.title.toLowerCase().includes(value))  })
}

export const handleSavedFilter = async(event, usertimeline) => {
    event.preventDefault();
    // obtain the user input, ignoring case
    const value = event.target.value.toLowerCase();
    console.log("filtering post with parameter:", value);

    // filter posts that match the user input, ignoring case
    const target = await getAllSavedPosts()
    usertimeline.setState({ savedPosts: target.filter((post) => post.title.toLowerCase().includes(value))  })
}

export const getUserPosts = async () => {
    try {
        const response = await fetch("/api/timeline/post");
        const posts = await response.json();

        let user;
        try {
            const response = await fetch("/user/check-session");
            user = (await response.json()).currentUser;
        } catch (error) {
            console.error(error);
            return;
        }

        let userPosts = []
        //search for post that thats created by user
        posts.forEach(post => {
            if (user.userName===post.userName) {
                userPosts.push(post)
            }
        });
        // Sort the posts by (descending) date posted.
        userPosts.sort((a, b) => b.datePosted - a.datePosted);
        return userPosts;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getAllSavedPosts = async () => {
     try {
        const response = await fetch("/api/timeline/post");
        const posts = await response.json();

        let user;
        try {
            const response = await fetch("/user/check-session");
            user = (await response.json()).currentUser;
        } catch (error) {
            console.error(error);
            return;
        }

        let savedPosts = []
        //search for post that thats created by user
        posts.forEach(post => {
            if (user.savedPosts.includes(post._id)) {
                savedPosts.push(post)
            }
        });
        
        // Sort the posts by (descending) date posted.
        savedPosts.sort((a, b) => b.datePosted - a.datePosted);

        return savedPosts;
    } catch (error) {
        console.error(error);
        return [];
    }
}
