import mongoose from 'mongoose'

import Project from '../models/projects.js'
import Client from '../models/clientModel.js';


const addProject = async (req, res) => {
    try {
      const {
        freelanceId,
        projectName,
        projectDesc,
        start_date,
        end_date,
        budget,
        status,
        freelancers,
        clientID
        
      } = req.body;
  
      const project = new Project({
        freelanceId,
        projectName,
        projectDesc,
        start_date,
        end_date,
        budget,
        status,
        freelancers,
        clientID
       
      });
  
      await project.save();
      res.status(201).json({ message: 'Project created successfully', project });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error.message });
    }
  };

  const getAllProjects = async (req, res) => {
    try {
        const userId = req.query.userId; // Extract userId from query parameters

        // Check if userId is provided
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        // Find projects uploaded by the specified user
        const projects = await Project.find({ freelanceId: userId }).populate('clientID', 'name email');;
       
        res.status(200).json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const getProjectById = async (req, res) => {
  try {
      const projectId = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(projectId)) {
          return res.status(400).json({ error: 'Invalid project ID' });
      }

      // Find project by ID
      const project = await Project.findById(projectId).populate('clientID', 'name email');

      if (!project) {
          return res.status(404).json({ error: 'Project not found' });
      }

      const userId = req.query.userId;
      if (userId && project.freelanceId !== userId) {
          return res.status(403).json({ error: 'Unauthorized access to project' });
      }

      res.status(200).json(project);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};


const editProject = async (req, res) => {
  try {
      const projectId = req.params.id;
      const {
          freelanceId,
          projectName,
          projectDesc,
          start_date,
          end_date,
          budget,
          status,
          freelancers,
          clientID
         
      } = req.body;

      // Check if the provided project ID is valid
      if (!mongoose.Types.ObjectId.isValid(projectId)) {
          return res.status(400).json({ error: 'Invalid project ID' });
      }

      // Find the project by ID
      let project = await Project.findById(projectId);

      // If project doesn't exist, return error
      if (!project) {
          return res.status(404).json({ error: 'Project not found' });
      }

      // Update project fields
      project.freelanceId = freelanceId;
      project.projectName = projectName;
      project.projectDesc = projectDesc;
      project.start_date = start_date;
      project.end_date = end_date;
      project.budget = budget;
      project.status = status;
      project.freelancers = freelancers;
      project.clientID = clientID
      

      // Save the updated project
      project = await project.save();

      res.status(200).json({ message: 'Project updated successfully', project });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteProject = async (req, res) => {
  try {
      const projectId = req.params.id;

      // Check if the provided project ID is valid
      if (!mongoose.Types.ObjectId.isValid(projectId)) {
          return res.status(400).json({ error: 'Invalid project ID' });
      }

      // Find the project by ID and delete it
      const project = await Project.findByIdAndDelete(projectId);

      // If project doesn't exist, return error
      if (!project) {
          return res.status(404).json({ error: 'Project not found' });
      }

      res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default{ 
  addProject,
  getAllProjects , 
  getProjectById,
  editProject,
  deleteProject
}