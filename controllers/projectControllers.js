import mongoose from 'mongoose'

import Project from '../models/projects.js'

const addProject = async (req, res) => {
    try {
      const {
        projectName,
        projectDesc,
        start_date,
        end_date,
        budget,
        freelancers,
        
      } = req.body;
  
      const project = new Project({
        projectName,
        projectDesc,
        start_date,
        end_date,
        budget,
        freelancers,
       
      });
  
      await project.save();
      res.status(201).json({ message: 'Project created successfully', project });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const getAllProjects = async (req, res) => {
    try {
      const projects = await Project.find();
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
      const project = await Project.findById(projectId);

      if (!project) {
          return res.status(404).json({ error: 'Project not found' });
      }

      res.status(200).json(project);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};


export default{ addProject,getAllProjects , getProjectById}