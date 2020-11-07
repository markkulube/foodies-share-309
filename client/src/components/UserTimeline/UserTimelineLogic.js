/**
 * Update the User timeline's state with the posts specified by the option.
 *
 * @param {UserTimeline}    usertimeline    The timeline component to update state.
 * @param {string}      option      The option to filter posts by.
 */
export const handleFilter = (usertimeline, option) => {
    console.log("filtering posts with option:", option);

    // get list of all posts (sorted)
    const posts = usertimeline.getAllPosts();

    // TODO: All cases in switch will contain API calls to receive posts from backend
    switch (option) {
        case "home":  // obtain all posts
            usertimeline.setState({ posts: posts });
            break;
        case "breakfast":  // filter breakfast recipes and update state
            usertimeline.setState({ posts: posts.filter((post) => post.category === "breakfast") });
            break;
        case "lunch":  // filter lunch recipes and update state
            usertimeline.setState({ posts: posts.filter((post) => post.category === "lunch") });
            break;
        case "dinner":  // filter dinner recipes and update state
            usertimeline.setState({ posts: posts.filter((post) => post.category === "dinner") });
            break;
        case "dessert":  // filter dessert recipes and update state
            usertimeline.setState({ posts: posts.filter((post) => post.category === "dessert") });
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
export const handleSearchFilter = (event, usertimeline) => {
    event.preventDefault();
    // obtain the user input, ignoring case
    const value = event.target.value.toLowerCase();
    console.log("filtering post with parameter:", value);

    // filter posts that match the user input, ignoring case
    const target = usertimeline.getAllPosts().filter((post) => post.title.toLowerCase().includes(value))

    usertimeline.setState({ posts: target })
}
