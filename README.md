# Foodies Web App
#
# URL for the Webpage

https://foodies309.herokuapp.com/

# Instructions

## Sign Up
To sign up, press the "Sign Up" button and you will be directed to a new page where you can enter credentials such as a username, password, age and favourite meal. After you sign up, you will be redirected to the user log in page. If you do not enter the correct credentials (for example, a string value for Age) then you will be given an error message and must try again. 


## Log In
To log in, press the "Log In" button and you will directed to a new page where you can enter log in credentials, which is the username and password.  

For Phase 2, you can log in using any username and associated password in our database. If you enter the wrong combination, you will be given an error message to try again. After you log in, you will be redirected to the main timeline.  

For user -> username: user, password: user  
For admin -> username: admin, password: admin

The above examples are for TA use.

# Features of Web Application (User)
The web app is a social-media style interaction-based feed that revolves around users posting recipes, searching for recipes, rating/commenting on recipes and saving recipes.

### Posting a Recipe
Users can post their own unique recipes to the timeline with a title, description, category, ingredients and instructions. To do this, a user just has to click the "Post a Recipe" button on the main timeline and they will be redirected to another page where they can input their information for a recipe. Note: please put comments between instruction steps and ingredients (ex. 1 egg, 1 cup cocoa, etc).

After you press the "Post it on Foodies" button, the recipe will be posted on the main timeline and will redirect you back to the main timeline as well. The recipe will also be saved to the database.

### Search Bar
Users can search for specific recipes on the timeline using keywords and the timeline (or the user timeline) will update according to the keywords/characters typed in.

### Recipe Category Pages
Similar to Twitter’s side navigation bar, users can look for a category of recipes like Dinner, Dessert, Breakfast, etc. All the user has to do is click a button corresponding to a category and the timeline will update accordingly.

### My Posts page
Users can view their own recipes that they've created along with any posts that they have saved. Users can view these recipes by clicking the "My Posts" button on the side, which will redirect them to the UserTimeline page.

### Save a Recipe Post
Users can save posts to their account and view them in the "My Posts" page. Users can do this by clicking the "Save to Favourites" button that can be found on each post.

### Like/Dislike a Recipe Post
Users can like/dislike posts. Users can do this by clicking the "Like/Dislike" buttons that can be found on each post. After they press the Like/Dislike button, the post will update.

### Review a Recipe Post
Users can leave a review on a post. Users can do this by typing a review on the "write a review" textarea after pressing the "Reviews" button. Users can also leave a 1-5 star rating on the post.

### Edit/Delete a Recipe Post
Users can edit/delete their own posts. Users can delete a recipe by clicking the "Delete" button, which will remove the recipe from their account. Users can edit their recipes by clicking the "Edit" button, which will allow the user to edit the title, description, category, ingredients and instructions. They can then save these changes and the timeline will be updated.

### Edit Account Info
Users can edit their own accounts. Users can press the "Account" button which will lead them to the Account Info page. Users can then edit their account information by clicking the "Edit" button, which will allow the user to edit their username, password, age and favourite meal. When they click update, the new account info will replace the old account info.

# Features of Web Application (Admin)
Admin's have access to the same functionality as users, but they also have access to the "Admin" page where they can edit and view accounts as well as their posts.

### Search for users
Admins can search for users by username in the user table. The admin just needs to type in a username into the search bar.

### Add/Edit/Delete users
Admins can add users by typing in account info on the user table and pressing "Add Row". Admins can change a user's account info by pressing "Edit" and editing the credentials in the table (and then pressing save). Admins can delete a user from the webpage by pressing "Delete" next to a user in the user table.

### View a user's timeline
Admins can view a specific user's timeline, including their posts and saved posts by clicking the "Timeline" button next to the user.

### Review posts on a user's timeline
Admins can review posts on a specific user's timeline, including their posts and saved posts. The review will be from the admin.

### Search/Delete Posts
Admins can add search for posts in the Post table and delete posts by clicking the "Delete" button next to a post.  

# Changes for Phase 2

### Users will all have the same Profile Picture
In Phase 2, we decided all users will have the same profile picture because we did not have time to implement a feature that allows users to upload profile pictures.

### Viewing another Person's Profile
In Phase 2, we implemented the feature that allows users to look at the profiles and recipes of other users on the app. All the user has to do is click on another user's profile picture on the timeline and a modal box will pop up showing that user's recipes. You can also close off of it easily by pressing "Close" and you will be able to view the timeline again.

# Routes Overview

### POST @ /user/login
Log's in the user with the given credentials.
requires: {
    "userName": String,  
    "password": String  
}

### GET @ /api/logout
Log's out a user by destroying the session

### GET @ /user/check-session
A route to check if a user is logged in on the session.
requires: {
    user: Object
}

### GET @ /api/all
A route that retrieves all existing data from server as a test.

### GET @ /api/user
Retrieves the currently authenticated user.

### POST @ /api/user
Create a new user with the given request data.
requires : {
    userName: String,
    profilePic: String (directs to a profile picture png in another directory),
    password: String,
    age: Int,
    favMeal: String,
}

### DELETE @ /api/user/:id
Delete the given user from the database 
requires : {  
    _id: ObjectID  
}  
  
example : {  
    _id: "5fd314a76a1a4904cbea3569",  
}  
  
output : {  
    "_id": ObjectID,  
    "savedPosts":[ObjectID],  
    "likedPosts":[ObjectID],  
    "dislikedPosts":[ObjectID],  
    "userName":String,  
    "profilePic":String,  
    "password":String,  
    "age":Int,  
    "favMeal":String,  
    "isAdmin":Boolean,  
    "__v":Int  
}  
  
example : {  
    "_id": "5fd314a76a1a4904cbea3569",  
    "savedPosts":[],  
    "likedPosts":[],  
    "dislikedPosts":[],  
    "userName":"user41",  
    "profilePic":"/static/media/profile.8813c39a.png",  
    "password":"$2a$10$a..0cqAN7YK.a7LQfWICgOZKwTsQVVSNCcZS7SIWv/4CPazULKdUO",  
    "age":45,  
    "favMeal":"Beef Burgundy",  
    "isAdmin":false,  
    "__v":0  
} 
 
### PATCH @ /api/account/:id
Update the given user from the database.  
requires : {  
    user_id: ObjectID  
    userName: String,  
    password: String,  
    age: Int,  
    favMeal: String  
}  
  
example: {  
  "_id": "5fd314a76a1a4904cbea3569",  
  "userName": "user41",  
  "password": "newpass124",  
  "age": 41,  
  "favMeal": "Lasagna & Wine",  
}  
  
output : {  
    "_id": ObjectID,  
    "savedPosts":[ObjectID],  
    "likedPosts":[ObjectID],  
    "dislikedPosts":[ObjectID],  
    "userName":String,  
    "profilePic":String,  
    "password":String,  
    "age":Int,  
    "favMeal":String,  
    "isAdmin":Boolean,  
    "__v":Int  
}  
  
example : {  
    "_id": "5fd314a76a1a4904cbea3569",  
    "savedPosts":[],  
    "likedPosts":[],  
    "dislikedPosts":[],  
    "userName":"user41",  
    "profilePic":"/static/media/profile.8813c39a.png",  
    "password":"$2a$10$a..0cqAN7YK.a7LQfWICgOZKwTsQVVSNCcZS7SIWv/4CPazULKdUO",  
    "age":45,  
    "favMeal":"Beef Burgundy",  
    "isAdmin":false, 
    "__v":0  
}  

### POST @ /api/post
A POST route to *create* a post
requires : {
    userName: String,
    profilePic: String (directs to a profile picture png in another directory),
    title: String,
    category: String,
    desc: String,
    datePosted: Date,
    ingredients: [String],
    steps: [String],
    reviews: [Objects],
    likes: Int,
    dislikes: Int,
    creator: ObjectID 
}

### PATCH @ /api/post/:id
Update the given post from the database.
requires : {
    userName: String,
    profilePic: String (directs to a profile picture png in another directory),
    title: String,
    category: String,
    desc: String,
    datePosted: Date,
    ingredients: [String],
    steps: [String],
    reviews: [Objects],
    likes: Int,
    dislikes: Int,
    creator: ObjectID 
}

### GET @ /api/timeline/post
Sends an array of all existing posts.

### GET @ /api/timeline/post
Sends an array of all existing posts.

### DELETE @ /api/timeline/post
Deletes the requested post.
requires: {
    creator: ObjectID,  // The ID of the user who created the post.
    postId: ObjectID  // The ID of the post to delete.
}

### POST @ /api/timeline/like
Likes the requested post. If the post is already liked, undo the like. If the post has previously been disliked, remove the dislike.
requires: {
    postId: ObjectID  // The ID of the post to like.
}

### POST @ /api/timeline/dislike
Dislikes the requested post. If the post is already disliked, undo the dislike. If the post has previously been liked, remove the like.
requires: {
    postId: ObjectID  // The ID of the post to dislike.
}

### POST @ /api/timeline/save
Save the requested post to the current user's favourite posts.
requires: {
    postId: ObjectID  // The ID of the post to save.
}

### GET @ /api/timeline/review/:postId
Get all reviews on the post with the given ID.
wildcard: postId - The ID of the post to get reviews for.

### POST @ /api/timeline/review
Create a new review for the requested post.
requires: {
    content: string  // The content of the review.
    rating: number  // The rating for the review from 1-5.
    postId: ObjectID  // The ID of the post to write the review for.
}

### DELETE @ /api/timeline/review
Delete the requested review from the requested post.
requires: {
    postId: ObjectID  // The ID of the post to delete the review from.
    reviewId: ObjectID  // The ID of the review to delete.
}


# Third-party libraries
- react
- react-collapse
- react-uid
- react-router-dom
- material-ui

