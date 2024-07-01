import Recipe from '../models/recipe.js';
import User from '../models/user.js';

// Create a new recipe
export const createRecipe = async (req, res) => {
  try {
    const newRecipe = await Recipe.create({ ...req.body, createdBy: req.user._id });
    await User.findByIdAndUpdate(req.user._id, { $push: { createdRecipes: newRecipe._id } });
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
export const saveRecipe = async (res, req) => {
  try {

      const recipe = await Recipe.findById(req.params.id);
      const user = await User.findById(req.params.id);

      if (!recipe) {
          return res.status(404).json({ message: 'Recipe not found' });
      }

      if (recipe.savedBy.includes(user.id) || user.savedRecipes.includes(recipe.id)) {
          return res.status(400).json({ message: 'Recipe already saved' });
      }

      recipe.savedBy.push(user.id);
      user.savedRecipes.push(recipe.id);

      await recipe.save();
      await user.save();

      res.json({ message: 'Recipe saved successfully' });
    } catch (err) {
      console.error(err);
      // res.status(500).json({ message: err.message });
    }
}

// unsave a recipe
export const unsaveRecipe = async (req, res) => {
  try {
      const user = await User.findById(req.user.id);
      user.savedRecipes = user.savedRecipes.filter(
          (recipeId) => recipeId.toString() !== req.params.id
      );
      await user.save();
      res.status(200).json({ message: 'Recipe unsaved successfully' });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

// get saved recipes
export const getSavedRecipes = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log('fetching saved recipes for: ', userId);
    const user = await User.findById(userId).populate('savedRecipes');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.savedRecipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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
