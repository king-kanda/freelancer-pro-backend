import express from 'express';
import userController from '../controllers/userController.js'

const router = express.Router()

// Your existing routes
router.post('/users', userController.createUser);
router.get('/users', userController.getUsers);

// New route for updating a user
router.put('/users/:id', userController.updateUser);

export default router ;