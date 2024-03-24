import express from 'express';
import projectController  from '../controllers/projectControllers.js'

const router = express.Router()

router.post('/projects',projectController.addProject)
router.get('/projects', projectController.getAllProjects);
router.get('/projects/:id', projectController.getProjectById);
router.put('/projects/:id', projectController.editProject); // Add route for editing project
router.delete('/projects/:id', projectController.deleteProject); // Add route for deleting project


export default router ;