import ProjectFile from '../models/projectFile.js';
import fs from 'fs';
import multer from 'multer';

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage }).single('file');

// Controller to handle file upload and save file data to the database
const uploadFile = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    try {
      const { fileName, userId , projectId} = req.body;
      const fileLocation = req.file.path;
      const projectFile = new ProjectFile({
        fileName,
        fileLocation,
        userId,
        projectId
      });
      await projectFile.save();
      res.status(201).json(projectFile);
    } catch (error) {
      // If there was an error saving to the database, delete the uploaded file
      fs.unlinkSync(req.file.path);
      res.status(500).json({ error: error.message });
    }
  });
};

const getFiles = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    // Find project files with matching projectId
    const projectFiles = await ProjectFile.find({ projectId });
    res.status(200).json(projectFiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to delete a file
const deleteFile = async (req, res) => {
  try {
    const fileId = req.params.id;
    const projectFile = await ProjectFile.findById(fileId);
    if (!projectFile) {
      return res.status(404).json({ message: 'File not found' });
    }
    // Delete file from disk
    fs.unlinkSync(projectFile.fileLocation);
    // Delete file from database
    await ProjectFile.findByIdAndDelete(fileId);
    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export default { 
    uploadFile,
    getFiles,
    deleteFile
}