import express from 'express';
const router = express.Router();
import authMiddleware from '../middleware/authMiddleware.js';
import {createRecipe, getAllRecipes, getRecipeById, updateRecipe, deleteRecipe, getUserRecipes} from '../controllers/recipeController.js';

// Protected routes
router.post('/create', authMiddleware, createRecipe);
router.put('/update/:id', authMiddleware, updateRecipe);
router.delete('/delete/:id', authMiddleware, deleteRecipe);
router.get('/user/:id', authMiddleware, getUserRecipes);

// Public routes
router.get('/', getAllRecipes);
router.get('/:id', getRecipeById);

export default router;
