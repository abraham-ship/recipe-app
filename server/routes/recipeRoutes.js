import express from 'express';
const router = express.Router();
import authMiddleware from '../middleware/authMiddleware.js';
import {createRecipe, getAllRecipes, getRecipeById, updateRecipe, deleteRecipe, saveRecipe, getUserRecipes, unsaveRecipe, getSavedRecipes} from '../controllers/recipeController.js';

// Protected routes
router.post('/', authMiddleware, createRecipe);
router.put('/edit/:id', authMiddleware, updateRecipe);
router.delete('/:id', authMiddleware, deleteRecipe);
router.post('/save/:id', authMiddleware, saveRecipe);
router.get('/user/:id', authMiddleware, getUserRecipes);
router.post('/unsave/:id', authMiddleware, unsaveRecipe);
router.get('/user/:id/savedRecipes', authMiddleware, getSavedRecipes);

// Public routes
router.get('/', getAllRecipes);
router.get('/:id', getRecipeById);

export default router;
