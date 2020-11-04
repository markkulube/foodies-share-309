/* New cleaned up version of App.js */
import React from 'react';

// Importing react-router-dom to use the React Router
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';

// Importing the Queue and our simple Home Page
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import Home from './components/Home';
import Timeline from './components/Timeline';
import AccountInfo from './components/AccountInfo/AccountInfo';
import Admin from './components/Admin/Admin';
import PostRecipePage from "./components/PostRecipePage";

// Imports for profile pictures of posts and reviews.
import eddie from "./images/eddie.jpg";
import mark from "./images/mark.png";
import keren from "./images/keren.png";
import brandon from "./images/brandon.png";
import profilePic from "./images/profile.png";

class App extends React.Component {

  // a 'global' state that you can pass through to any child componenets of App.
  state = {
    accounts: [
      {
        userName: "user",
        profilePic: profilePic,
        password: "user",
        age: "404",
        favMeal: "Filet Mignon",
        posts: userPosts,
        isLoggedIn: false,
        isAdmin: false
      },
      {
        userName: "admin",
        profilePic: profilePic,
        password: "admin",
        age: "30",
        favMeal: "Sliced Oranges",
        posts: [],
        isLoggedIn: false,
        isAdmin: true
      },
      {
        userName: "Eddie",
        profilePic: eddie,
        password: "password",
        age: "20",
        favMeal: "Pho",
        posts: eddiePosts,
        isLoggedIn: false,
        isAdmin: false
      },
      {
        userName: "Mark",
        profilePic: mark,
        password: "password",
        age: "23",
        favMeal: "Apple Pie",
        posts: markPosts,
        isLoggedIn: false,
        isAdmin: false
      },
      {
        userName: "Keren",
        profilePic: keren,
        password: "password",
        age: "21",
        favMeal: "Japanese Curry",
        posts: kerenPosts,
        isLoggedIn: false,
        isAdmin: false
      },
      {
        userName: "Brandon",
        profilePic: brandon,
        password: "password",
        age: "22",
        favMeal: "Cheeseburger",
        posts: brandonPosts,
        isLoggedIn: false,
        isAdmin: false
      }
    ],
    posts: [],
    currentUser: null
  }

  render() {
    return (
        <div>
        <BrowserRouter>
          <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */ }
            { /* Each Route below shows a different component depending on the exact path in the URL  */ }
            <Route exact path='/' render={() => 
                            (<Home appState={this.state}/>)}/>
            <Route exact path='/SignUp' render={() => 
                            (<SignUp appState={this.state}/>)}/>
            <Route exact path='/LogIn' render={() => 
                            (<LogIn appState={this.state}/>)}/>
            <Route exact path='/Timeline' render={() => 
                            (<Timeline appState={this.state}/>)}/>
            <Route exact path='/AccountInfo' render={() => 
                            (<AccountInfo appState={this.state}/>)}/>
            <Route exact path='/Admin' render={() => 
                            (<Admin appState={this.state}/>)}/>
            <Route exact path='/PostRecipePage' render={() =>
                            (<PostRecipePage appState={this.state}/>)}/>
          </Switch>
        </BrowserRouter>
      </div>
    );  
  }
}

export default App;

// TODO: below statements contain mock data - remove once API is implemented
const eddiePosts = [{
  username: "Eddie",
  profilePic: eddie,
  title: "Blueberry Pancakes",
  category: "breakfast",
  desc: "This is a great recipe that I found in my Grandma's recipe book. Judging from the weathered look of " +
      "this recipe card, this was a family favorite.",
  datePosted: new Date(2020, 9, 10, 3, 24, 0, 14),
  ingredients: [
    "1 and 1/2 cups flour",
    "3 and 1/2 teaspoons baking powder",
    "1 teaspoon salt",
    "1 tablespoon white sugar",
    "1 and 1/4 cups milk",
    "1 egg",
    "3 teaspoons melted butter"
  ],
  steps: [
    "In a large bowl, sift together the flour, baking powder, salt and sugar. Make a well in the " +
    "center and pour in the milk, egg and melted butter; mix until smooth.",
    "Heat a lightly oiled griddle or frying pan over medium-high heat. Pour or scoop the batter onto the " +
    "griddle, using approximately 1/4 cup for each pancake. Brown on both sides and serve hot."
  ],
  reviews: [
    {username: "user", profilePic: profilePic, content: "This is my review on this dish.", rating: 4},
    {username: "Keren", profilePic: keren, content: "Very tasty and light, I didn't feel groggy after eating.", rating: 4},
    {username: "Mark", profilePic: mark, content: "This dish is seriously lacking some taste...", rating: 2},
    {username: "Brandon", profilePic: brandon, content: "Wow, this dish is amazing. Please lend me the recipe!", rating: 5}
  ]
}]

const markPosts = [{
  username: "Mark",
  profilePic: mark,
  title: "Steak Sandwich",
  category: "lunch",
  desc: "I tried for years to make a cheese steak as good as the takeout sub shops of southeastern " +
      "Massachusetts. I think this is about as close as you can come at home. Freezing the steak the day " +
      "before makes it easy to cut into very thin slices.",
  datePosted: new Date(2020, 9, 10, 14, 20, 10, 200),
  ingredients: [
    "2 tablespoons butter",
    "1/4 medium onion, sliced",
    "4 large fresh mushrooms, sliced",
    "1/4 green bell pepper, sliced into long strips",
    "1 (1/2 pound) well-marbled beef steak of any type, sliced as thinly as possible",
    "3 tablespoons chopped pickled hot peppers",
    "1 teaspoon hot pepper sauce",
    "2 slices sharp Cheddar cheese",
    "salt and pepper to taste",
    "1/3 French baguette, cut in half lengthwise"
  ],
  steps: [
    "Melt 1 tablespoon of butter in a large skillet over medium heat. Add the onion; cook and stir until " +
    "tender. Push onion to the side of the pan, and add the mushrooms. Cook and stir until softened, then " +
    "add the bell pepper and cook just until tender, about 3 minutes. Remove from the pan with a slotted " +
    "spoon, and set aside.",
    "Add the remaining butter to the skillet. No need to clean the pan, just let it heat up a little bit. " +
    "Place the steak in the skillet along with the pickled peppers. Season with salt and pepper. The steak " +
    "cooks really fast, just a couple of minutes. Once the steak is mostly browned, return the onion and " +
    "pepper to the pan. Cook until heated through.",
    "Turn off the heat, and place the slices of cheese over the top of the pile so they can melt. Scoop the " +
    "whole pile into the awaiting bread, making sure to pour some of the juices onto that wonderful sandwich."
  ],
  reviews: [
    {username: "user", profilePic: profilePic, content: "This is my review on this dish.", rating: 4},
    {username: "Keren", profilePic: keren, content: "Very tasty and light, I didn't feel groggy after eating.", rating: 4},
    {username: "Eddie", profilePic: eddie, content: "This dish is seriously lacking some taste...", rating: 2},
    {username: "Brandon", profilePic: brandon, content: "Wow, this dish is amazing. Please lend me the recipe!", rating: 5}
  ]
}]

const kerenPosts = [{
  username: "Keren",
  profilePic: keren,
  title: "Chicken Parmesan",
  category: "dinner",
  desc: "My version of chicken parmesan is a little different than what they do in the restaurants, with less " +
      "sauce and a crispier crust.",
  datePosted: new Date(2020, 10, 25, 8, 55, 23, 411),
  ingredients: [
    "4 skinless, boneless chicken breast halves",
    "salt and freshly ground black pepper to taste",
    "2 eggs",
    "1 cup panko bread crumbs, or more as needed",
    "1/2 cup grated Parmesan cheese",
    "2 tablespoons all-purpose flour, or more if needed",
    "1 cup olive oil for frying",
    "1/2 cup prepared tomato sauce",
    "1/4 cup fresh mozzarella, cut into small cubes",
    "1/4 cup chopped fresh basil",
    "1/2 cup grated provolone cheese",
    "1/4 cup grated Parmesan cheese",
    "1 tablespoon olive oil"
  ],
  steps: [
    "Preheat an oven to 450 degrees F (230 degrees C).",
    "Place chicken breasts between two sheets of heavy plastic (resealable freezer bags work well) on a " +
    "solid, level surface. Firmly pound chicken with the smooth side of a meat mallet to a thickness of " +
    "1/2-inch. Season chicken thoroughly with salt and pepper.",
    "Beat eggs in a shallow bowl and set aside.",
    "Mix bread crumbs and 1/2 cup Parmesan cheese in a separate bowl, set aside.",
    "Place flour in a sifter or strainer; sprinkle over chicken breasts, evenly coating both sides.",
    "Dip flour coated chicken breast in beaten eggs. Transfer breast to breadcrumb mixture, pressing the " +
    "crumbs into both sides. Repeat for each breast. Set aside breaded chicken breasts for about 15 minutes.",
    "Heat 1 cup olive oil in a large skillet on medium-high heat until it begins to shimmer. Cook chicken " +
    "until golden, about 2 minutes on each side. The chicken will finish cooking in the oven.",
    "Place chicken in a baking dish and top each breast with about 1/3 cup of tomato sauce. Layer each " +
    "chicken breast with equal amounts of mozzarella cheese, fresh basil, and provolone cheese. Sprinkle 1 " +
    "to 2 tablespoons of Parmesan cheese on top and drizzle with 1 tablespoon olive oil.",
    "Bake in the preheated oven until cheese is browned and bubbly, and chicken breasts are no longer pink " +
    "in the center, 15 to 20 minutes. An instant-read thermometer inserted into the center should read at " +
    "least 165 degrees F (74 degrees C)."
  ],
  reviews: [
    {username: "user", profilePic: profilePic, content: "This is my review on this dish.", rating: 4},
    {username: "Eddie", profilePic: eddie, content: "Very tasty and light, I didn't feel groggy after eating.", rating: 4},
    {username: "Mark", profilePic: mark, content: "This dish is seriously lacking some taste...", rating: 2},
    {username: "Brandon", profilePic: brandon, content: "Wow, this dish is amazing. Please lend me the recipe!", rating: 5}
  ]
}]

const brandonPosts = [{
  username: "Brandon",
  profilePic: brandon,
  title: "Starfruit Pie",
  category: "dessert",
  desc: "",
  datePosted: new Date(2020, 10, 8, 8, 55, 23, 0),
  ingredients: [
    "1/2 cup sugar",
    "1/2 cup packed brown sugar",
    "3 tablespoons all-purpose flour",
    "1 teaspoon ground cinnamon",
    "1/4 teaspoon ground ginger",
    "1/4 teaspoon ground nutmeg",
    "6 to 7 cups thinly sliced peeled starfruit",
    "1 tablespoon lemon juice",
    "Pastry for double-crust pie",
    "1 tablespoon butter",
    "1 large egg white",
    "Additional sugar"
  ],
  steps: [
    "In a small bowl, combine the sugars, flour and spices; set aside. In a large bowl, toss starfruit with " +
    "lemon juice. Add sugar mixture; toss to coat.",
    "Line a 9-in. pie plate with bottom crust; trim even with edge. Fill with starfruit mixture; dot with " +
    "butter. Roll remaining crust to fit top of pie; place over filling. Trim, seal and flute edges. Cut " +
    "slits in crust.",
    "Beat egg white until foamy; brush over crust. Sprinkle with sugar. Cover edges loosely with foil.",
    "Bake at 375° for 25 minutes. Remove foil and bake until crust is golden brown and filling is bubbly, " +
    "20-25 minutes longer. Cool on a wire rack."
  ],
  reviews: [
    {username: "user", profilePic: profilePic, content: "This is my review on this dish.", rating: 4},
    {username: "Keren", profilePic: keren, content: "Very tasty and light, I didn't feel groggy after eating.", rating: 4},
    {username: "Mark", profilePic: mark, content: "This dish is seriously lacking some taste...", rating: 2},
    {username: "Eddie", profilePic: eddie, content: "Wow, this dish is amazing. Please lend me the recipe!", rating: 5}
  ]
}]

const userPosts = [{
  userName: "user",
  profilePic: profilePic,
  title: "My Recipe",
  category: "lunch",
  desc: "This is the description of my recipe.",
  datePosted: new Date(2020, 11, 1, 12, 1, 45, 991),
  ingredients: [
      "These are the",
      "ingredients required to",
      "follow my recipe."
  ],
  steps: [
      "These are the",
      "steps to follow",
      "when using my recipe."
  ],
  reviews: [
    {username: "Eddie", profilePic: eddie, content: "This is my review on this dish.", rating: 4},
    {username: "Keren", profilePic: keren, content: "Very tasty and light, I didn't feel groggy after eating.", rating: 4},
    {username: "Mark", profilePic: mark, content: "This dish is seriously lacking some taste...", rating: 2},
    {username: "Brandon", profilePic: brandon, content: "Wow, this dish is amazing. Please lend me the recipe!", rating: 5}
  ]
}]
