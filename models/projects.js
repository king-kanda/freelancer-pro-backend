import mongoose from 'mongoose';

const freelancerSchema = new mongoose.Schema({
  freelancerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model for freelancers
    required: true,
  },
  role: {
    type: String,
    enum: ['lead', 'sub-contractor'],
    default: 'sub-contractor',
  },
});

const projectSchema = new mongoose.Schema({
  freelanceId : String ,
  projectName: String,
  projectDesc: String,
  start_date: Date,
  end_date: Date,
  budget: Number,
  status: {
    type: String,
    enum: ['on track', 'completed', 'suspended', 'awaiting payment'],
    default: 'on track',
  },
  freelancers: [freelancerSchema], // Array of freelancers
  clientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: false,
    default: null,
  },
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
