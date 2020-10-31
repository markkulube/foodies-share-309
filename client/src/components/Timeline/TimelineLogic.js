/* Logic files for the Timeline component. */

// TODO: figure out how to store "link" to image in posts array and import at runtime
import eddie from "../../images/eddie.jpg";
import brandon from "../../images/brandon.png";
import keren from "../../images/keren.png";
import mark from "../../images/mark.png";

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

// TODO: Mock data - remove once API calls are implemented below
export const posts = [
    {
        username: "Eddie",
        profilePic: eddie,
        title: "Blueberry Pancakes",
        desc: "This is a great recipe that I found in my Grandma's recipe book. Judging from the weathered look of " +
            "this recipe card, this was a family favorite.",
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
        ]
    },
    {
        username: "Mark",
        profilePic: mark,
        title: "Steak Sandwich",
        desc: "I tried for years to make a cheese steak as good as the takeout sub shops of southeastern " +
            "Massachusetts. I think this is about as close as you can come at home. Freezing the steak the day " +
            "before makes it easy to cut into very thin slices.",
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
        ]
    },
    {
        username: "Keren",
        profilePic: keren,
        title: "Chicken Parmesan",
        desc: "My version of chicken parmesan is a little different than what they do in the restaurants, with less " +
            "sauce and a crispier crust.",
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
        ]
    },
    {
        username: "Brandon",
        profilePic: brandon,
        title: "Apple Pie",
        desc: "",
        ingredients: [
            "1/2 cup sugar",
            "1/2 cup packed brown sugar",
            "3 tablespoons all-purpose flour",
            "1 teaspoon ground cinnamon",
            "1/4 teaspoon ground ginger",
            "1/4 teaspoon ground nutmeg",
            "6 to 7 cups thinly sliced peeled tart apples",
            "1 tablespoon lemon juice",
            "Pastry for double-crust pie",
            "1 tablespoon butter",
            "1 large egg white",
            "Additional sugar"
        ],
        steps: [
            "In a small bowl, combine the sugars, flour and spices; set aside. In a large bowl, toss apples with " +
            "lemon juice. Add sugar mixture; toss to coat.",
            "Line a 9-in. pie plate with bottom crust; trim even with edge. Fill with apple mixture; dot with " +
            "butter. Roll remaining crust to fit top of pie; place over filling. Trim, seal and flute edges. Cut " +
            "slits in crust.",
            "Beat egg white until foamy; brush over crust. Sprinkle with sugar. Cover edges loosely with foil.",
            "Bake at 375° for 25 minutes. Remove foil and bake until crust is golden brown and filling is bubbly, " +
            "20-25 minutes longer. Cool on a wire rack."
        ]
    }
]
