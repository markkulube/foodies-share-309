/* Logic files for the Timeline component. */

/**
 * Update the timeline's state with the posts specified by the option.
 *
 * @param {Timeline}    timeline    The timeline component to update state.
 * @param {string}      option      The option to filter posts by.
 */
export const handleFilter = (timeline, option) => {
    console.log("filtering posts with option:", option);

    // get list of all posts (sorted)
    const posts = timeline.getAllPosts();

    // TODO: All cases in switch will contain API calls to receive posts from backend
    switch (option) {
        case "home":  // obtain all posts
            timeline.setState({ posts: posts });
            break;
        case "breakfast":  // filter breakfast recipes and update state
            timeline.setState({ posts: posts.filter((post) => post.category === "breakfast") });
            break;
        case "lunch":  // filter lunch recipes and update state
            timeline.setState({ posts: posts.filter((post) => post.category === "lunch") });
            break;
        case "dinner":  // filter dinner recipes and update state
            timeline.setState({ posts: posts.filter((post) => post.category === "dinner") });
            break;
        case "dessert":  // filter dessert recipes and update state
            timeline.setState({ posts: posts.filter((post) => post.category === "dessert") });
            break;
        default:
            // should never reach this
            throw new Error("invalid filter option for timeline feed");
    }
}

/**
 * Update the timeline's state with the posts specified by the search bar value.
 *
 * @param event     {Object}            The event to obtain filter option value from.
 * @param timeline  {Timeline}   The timeline to update posts for.
 */
export const handleSearchFilter = (event, timeline) => {
    event.preventDefault();
    // obtain the user input, ignoring case
    const value = event.target.value.toLowerCase();
    console.log("filtering post with parameter:", value);

    // filter posts that match the user input, ignoring case
    const target = timeline.getAllPosts().filter((post) => post.title.toLowerCase().includes(value))

    timeline.setState({ posts: target })
}
