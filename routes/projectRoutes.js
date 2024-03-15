import express from 'express';
import projectController  from '../controllers/projectControllers.js'

const router = express.Router()

router.post('/projects',projectController.addProject)
router.get('/projects', projectController.getAllProjects);
router.get('/projects/:id', projectController.getProjectById);

export default router ;