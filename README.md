# Foodies Web App
# Instructions

## Installation
To use the Foodies web app, please run a local development server with React. Afterwards you may either sign-up or log in to the web application.
- git clone https://github.com/csc309-fall-2020/team53.git  
- cd team53/client  
- npm install  
- npm start  

## Sign Up
To sign up, press the "Sign Up" button and you will directed to a new page where you can enter credentials such as a username, password, age and favourite meal. After you sign up, you will be redirected to the main timeline.


## Log In
To log in, press the "Log In" button and you will directed to a new page where you can enter log in credentials, which is the username and password.  

For Phase 1, you can only log in using the defualt user and default admin accounts. After you log in, you will be redirected to the main timeline.  

For user -> username: user, password: user  
For admin -> username: admin, password: admin

# Features of Web Application (User)
The web app is a social-media style interaction-based feed that revolves around users posting recipes, searching for recipes, rating/commenting on recipes and saving recipes.

### Posting a Recipe
Users can post their own unique recipes to the timeline with a title, description, category, ingredients and instructions. To do this, a user just has to click the "Post a Recipe" button on the main timeline and they will be redirected to another page where they can input their information for a recipe. Note: please put comments between instruction steps and ingredients (ex. 1 egg, 1 cup cocoa, etc)  

After you press the "Post it on Foodies" button, the recipe will be posted on the main timeline and will redirect you back to the main timeline as well.

### Search Bar
Users can search for specific recipes on the timeline using keywords and the timeline will update according to the keywords/characters typed in.

### Recipe Category Pages
Similar to Twitter’s side navigation bar, users can look for a category of recipes like Dinner, Dessert, Breakfast, etc. All the user has to do is click a button corresponding to a category and the timeline will update accordingly.

### My Posts page
USers can view their own recipes that they've created along with any posts that they have saved. Users can view these recipes by clicking the "My Posts" button on the side, which will redirect them to the UserTimeline page.

### Save a Recipe Post
Users can save posts to their account and view them in the "My Posts" page. Users can do this by clicking the "Save to Favourites" button that can be found on each post.

### Like/Dislike a Recipe Post
Users can like/dislike posts. Users can do this by clicking the "Like/Dislike" buttons that can be found on each post. After they press the Like/Dislike button, the post will update.

### Review a Recipe Post
Users can leave a review on a post. Users can do this by typing a review on the "write a review" textarea after pressing the "Reviews" button. Users can also leave a 1-5 star rating on the post.

### Edit/Delete a Recipe Post
Users can edit/delete their own posts. Users can delete a recipe by clicking the "Delete" button, which will remove the recipe from their account. Users can edit their recipes by clicking the "Edit" button, which will alow the user to edit the title, description, category, ingredients and instructions. They can then save these changes and the timeline will be updated.

### Edit Account Info
Users can edit/delete their own accounts. Users can edit their account information by clicking the "Edit" button, which will alow the user to edit their username, password, age and favourite meal. When they click save, the new account info will replace the old account info.

# Features of Web Application (Admin)
Admin's have access to the same functionality as users, but they also have access to the "Admin" page where they can edit and view accounts as well as their posts.

### Search for users
Admins can search for users by username in the user table. The admin just needs to type in a username into the search bar.

### Add/Edit/Delete users
Admins can add users by typing in account info on the user table and pressing "Add Row". Admins can change a user's account info by pressing "Edit" and editing the credentials in the table (and then pressing save). Admins can delete a user from the webpage by pressing "Delete" next to a user in the user table.

### View a user's timeline
Admins can view a specific user's timeline, including their posts and saved posts by clicking the "Timeline" button next to the user.

### Review posts on a user's timeline
Admins can review posts on a specific user's timeline, including their posts and saved posts. However, they will review posts as if they are the user, not the admin. This means the review will be from the user they are viewing.

### Search/Delete Posts
Admins can add search for posts in the Post table and delete posts by clicking the "Delete" button next to a post.  

# Third-party libraries
- react  
- react-collapse  
- react-uid  
- react-router-dom  
- material-ui  
