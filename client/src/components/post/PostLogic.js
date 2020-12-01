/* Logic file for the Post component. */

/**
 * Update the like/dislike state of this post and the global app state with a like action.
 *
 * @param component {Post} The post component to update state for.
 * @param appState {Object} The global app state.
 * @param username {string} The username of the current user.
 * @param post {Object} The post the current user is interacting with.
 * @param liking {boolean} Whether or not we're liking or disliking.
 */
export const handleLikeDislike = (component, appState, username, post, liking) => {
    console.log("clicked like button");

    // TODO: most logic below will be implemented by API in a POST request to like a post.

    // find index of the user's account
    const userIndex = appState.accounts.findIndex((account) => account.userName === username);
    // find index of like status if it exists
    const likeIndex = appState.accounts[userIndex].likes.findIndex((like) => {
        return like[0] === post.userName && like[1].getTime() === post.datePosted.getTime();
    })

    // find index of user who made this post...
    const posterIndex = appState.accounts.findIndex((account) => account.userName === post.userName)
    // then find index of this post
    const postIndex = appState.accounts[posterIndex].posts.findIndex((post) => (
        post.datePosted.getTime() === post.datePosted.getTime()
    ));

    // update like/dislike instance and count

    if (liking) {  // like the post
        if (likeIndex === -1) {
            // the user has not liked the post, add new instance
            appState.accounts[userIndex].likes.push([post.userName, post.datePosted, 1])
            appState.accounts[posterIndex].posts[postIndex].likes++;
            console.log("TESTING", appState.accounts[posterIndex].posts[postIndex].likes);
            component.setState({ liked: true })
        } else if (appState.accounts[userIndex].likes[likeIndex][2] === 0) {
            // user originally disliked the post
            appState.accounts[userIndex].likes[likeIndex][2] = 1;
            appState.accounts[posterIndex].posts[postIndex].likes++;
            appState.accounts[posterIndex].posts[postIndex].dislikes--;
            component.setState({ liked: true })
            component.setState({ disliked: false });
        } else {
            // user already likes the post, we should undo the like
            appState.accounts[userIndex].likes.splice(likeIndex, 1);
            appState.accounts[posterIndex].posts[postIndex].likes--;
            component.setState({ liked: false })
        }
    } else {  // dislike the post
        if (likeIndex === -1) {
            // the user has not disliked the post, add new instance
            appState.accounts[userIndex].likes.push([post.userName, post.datePosted, 0])
            appState.accounts[posterIndex].posts[postIndex].dislikes++;
            component.setState({ disliked: true })
        } else if (appState.accounts[userIndex].likes[likeIndex][2] === 1) {
            // user originally liked the post
            appState.accounts[userIndex].likes[likeIndex][2] = 0;
            appState.accounts[posterIndex].posts[postIndex].dislikes++;
            appState.accounts[posterIndex].posts[postIndex].likes--;
            component.setState({ disliked: true });
            component.setState({ liked: false });
        } else {
            // user already disliked the post, we should undo the dislike
            appState.accounts[userIndex].likes.splice(likeIndex, 1);
            appState.accounts[posterIndex].posts[postIndex].dislikes--;
            component.setState({ disliked: false })
        }
    }
}

/**
 * Return a status for what the like and dislike buttons should be rendered as.
 *  - If the post should be disliked, return 0.
 *  - If the post should be liked, return 1.
 *  - Otherwise, if both should be untouched, return -1.
 *
 * @param component {Post} The post component to determine state for.
 * @param accounts {Object[]} The complete list of accounts.
 * @param username {string} The username of the current user.
 * @param post {Object} The data for the post to render like/dislike for.
 * @returns {int} Status code describing what state like/dislike should be in.
 */
export const getLikeStatus = (component, accounts, username, post) => {
    // TODO: accounts will be replaced with an API call to GET like/dislike status of the post.
    console.log(accounts)
    // according to the likes of the user, decide whether or not to toggle like/dislike buttons on/off
    const account = accounts.find((account) => account.userName === username);
    const liked = account.likes.filter((curr) => (  // this should only ever return 0 or 1 post
        curr[1].getTime() === post.datePosted.getTime() && curr[0] === post.userName
    ))

    if (liked.length > 0) {  // user either liked of disliked this post
        // if status is 1, user liked the post, otherwise, it's 0 -> user disliked the post
        return liked[0][2];
    } else {
        // liked and disliked both stay inactive
        return -1
    }
}
