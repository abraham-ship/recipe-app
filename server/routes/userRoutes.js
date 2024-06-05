import express from 'express';
const router = express.Router();
import {registerUser, loginUser} from '../controllers/authController.js'
import { getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js';


// Register a new user
router.post('/register', registerUser);
// Login user
router.post('/login', loginUser);

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
