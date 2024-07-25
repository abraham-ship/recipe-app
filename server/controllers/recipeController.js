import Recipe from '../models/recipe.js';
import User from '../models/user.js';

// Create a new recipe
export const createRecipe = async (req, res) => {
  try {
    const newRecipe = await Recipe.create({ ...req.body, createdBy: req.user.id });
    await User.findByIdAndUpdate(req.user.id, { $push: { createdRecipes: newRecipe.id } });
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all recipes
export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Save a recipe
// export const saveRecipe = async (req, res) => {
//   try {
//     const { id: recipeID } = req.params;
//     const userID = req.user.id;
//     console.log('recipe id: ', recipeID)
//     console.log('user id:', userID)

//     const recipe = await Recipe.findById(recipeID);
//     const user = await User.findById(userID);

//     if (!recipe) {
//         return res.status(404).json({ message: 'Recipe not found' });
//     }

//     if (recipe.savedBy.includes(userID) || user.savedRecipes.includes(recipeID)) {
//         return res.status(400).json({ message: 'Recipe already saved' });
//     }

//     recipe.savedBy.push(user.id);
//     user.savedRecipes.push(recipe.id);

//     await recipe.save();
//     await user.save();

//     res.json({ message: 'Recipe saved successfully' });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: err.message });
//     }
// }

// unsave a recipe
// export const unsaveRecipe = async (req, res) => {
//   try {
//     const { userId, recipeId } = req.params;

//     const recipe = await Recipe.findById(recipeId);
//     const user = await User.findById(userId);

//     if (!recipe) {
//         return res.status(404).json({ message: 'Recipe not found' });
//     }

//     // Remove user from recipe's savedBy list
//     const savedByIndex = recipe.savedBy.indexOf(userId);
//     if (savedByIndex > -1) {
//         recipe.savedBy.splice(savedByIndex, 1);
//     }

//     // Remove recipe from user's savedRecipes list
//     const savedRecipeIndex = user.savedRecipes.indexOf(recipeId);
//     if (savedRecipeIndex > -1) {
//         user.savedRecipes.splice(savedRecipeIndex, 1);
//     }

//     await recipe.save();
//     await user.save();

//     res.json({ message: 'Recipe unsaved successfully' });
//   } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: 'Internal server error' });
//   }
// };

// get saved recipes
// export const getSavedRecipes = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     console.log('fetching saved recipes for: ', userId);
//     const user = await User.findById(userId).populate('savedRecipes');
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.json(user.savedRecipes);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// Get a single recipe by ID
export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get recipes by user
export const getUserRecipes = async (req, res) => {
  try {
      const userId = req.user.id;
      console.log("fetching recipes for:", userId);
      const recipes = await Recipe.find({ createdBy: userId });
      res.json(recipes);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

// Update a recipe by ID
export const updateRecipe = async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json(updatedRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a recipe by ID
export const deleteRecipe = async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!deletedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json({ message: 'Recipe deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
