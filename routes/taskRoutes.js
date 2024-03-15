import express from 'express';
import TaskController from '../controllers/taskController.js';

const router = express.Router();

// Create a new task
router.post('/tasks', TaskController.createTask);

// Get all tasks
router.get('/tasks', TaskController.getTasks);

// Get a task by ID
router.get('/tasks/:id', TaskController.getTaskById);

// Update a task
router.put('/tasks/:id', TaskController.updateTask);

// Delete a task
router.delete('/tasks/:id', TaskController.deleteTask);

export default router;
