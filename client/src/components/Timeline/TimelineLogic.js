/* Logic files for the Timeline component. */

/**
 * Return a list of all existing posts sorted by date posted (earliest first).
 */
export const getAllPosts = async () => {
    try {
        const response = await fetch("/api/timeline/post");
        const posts = await response.json();

        // Sort the posts by (descending) date posted.
        posts.sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted));

        return posts;
    } catch (error) {
        console.error(error);
        return [];
    }
}

/**
 * Update the timeline's state with the posts specified by the option.
 *
 * @param {Timeline}    timeline    The timeline component to update state.
 * @param {string}      option      The option to filter posts by.
 */
export const handleFilter = (timeline, option) => {
    console.log("filtering posts with option:", option);

    // get list of all posts (sorted)
    const posts = timeline.state.allPosts;

    switch (option) {
        case "home":  // obtain all posts
            timeline.setState({ posts: posts });
            break;
        case "breakfast":  // filter breakfast recipes and update state
            timeline.setState({ posts: posts.filter((post) => post.category.toLowerCase()==="breakfast") });
            break;
        case "lunch":  // filter lunch recipes and update state
            timeline.setState({ posts: posts.filter((post) => post.category.toLowerCase() === "lunch") });
            break;
        case "dinner":  // filter dinner recipes and update state
            timeline.setState({ posts: posts.filter((post) => post.category.toLowerCase() === "dinner") });
            break;
        case "dessert":  // filter dessert recipes and update state
            timeline.setState({ posts: posts.filter((post) => post.category.toLowerCase() === "dessert") });
            break;
        case "other":  // filter dessert recipes and update state
            timeline.setState({ posts: posts.filter((post) => post.category.toLowerCase() === "other") });
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
    const target = timeline.state.allPosts.filter((post) => post.title.toLowerCase().includes(value))

    timeline.setState({ posts: target })
}
