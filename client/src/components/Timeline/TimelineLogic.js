// Logic files for the Timeline component.

// TODO: Mock data - remove once API calls are implemented below
const posts = [
    {title: "Blueberry Pancakes"},
    {title: "Steak Sandwich"},
    {title: "Chicken Parmesan"},
    {title: "Apple Pie"}
]

/**
 * Obtain a list of posts according to the given filter <option> and update <timeline>'s state with these posts.
 *
 * @param {Timeline}    timeline    The timeline component to update state.
 * @param {string}      option      The option to filter posts by.
 */
export const handleFilter = (timeline, option) => {
    console.log("filtering posts with option:", option);

    // TODO: All cases in switch will contain API calls to receive posts from backend
    switch (option) {
        case "home":  // obtain all posts
            timeline.setState({ posts: posts });
            break;
        case "breakfast":  // obtain breakfast posts
            timeline.setState({ posts: [posts[0]] });
            break;
        case "lunch":  // obtain lunch posts
            timeline.setState({ posts: [posts[1]] });
            break;
        case "dinner":  // obtain lunch posts
            timeline.setState({ posts: [posts[2]] });
            break;
        case "dessert":  // obtain lunch posts
            timeline.setState({ posts: [posts[3]] });
            break;
        default:
            // should never reach this
            throw new Error("invalid filter option for timeline feed");
    }
}
