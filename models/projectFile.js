import mongoose from 'mongoose';

const projectFileSchema = new mongoose.Schema({
  fileName: String,
  fileLocation: String,
  userId: String,
  projectId: { // New field for project id
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project' // Assuming your project model is named 'Project'
  }
});

const ProjectFile = mongoose.model('ProjectFile', projectFileSchema);

export default ProjectFile;
