import Recipe from '../models/recipe.js';
import User from '../models/user.js';

// Create a new recipe
export const createRecipe = async (req, res) => {
  try {
    const newRecipe = await Recipe.create({ ...req.body, createdBy: req.user._id });
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

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
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
