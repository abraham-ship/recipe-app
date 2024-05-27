import express from 'express';
const router = express.Router();
import authMiddleware from '../middleware/authMiddleware.js';
import {createRecipe, getAllRecipes, getRecipeById, updateRecipe, deleteRecipe} from '../controllers/recipeController.js';

// Protected routes
router.post('/', authMiddleware, createRecipe);
router.put('/:id', authMiddleware, updateRecipe);
router.delete('/:id', authMiddleware, deleteRecipe);

// Public routes
router.get('/', getAllRecipes);
router.get('/:id', getRecipeById);

export default router;
