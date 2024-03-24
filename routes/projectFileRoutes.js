import express from 'express';
import projectFilesController from '../controllers/projectFilesController.js';

const router = express.Router();

router.post('/files', projectFilesController.uploadFile);
router.get('/files/:projectId' , projectFilesController.getFiles)
router.delete('/files/:id', projectFilesController.deleteFile);

export default router;
