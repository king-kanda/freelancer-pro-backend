import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model for the author of the comment
  },
  text: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const taskSchema = new mongoose.Schema({
  projectID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project', // Reference to the Project model for the associated project
    required: true,
  },
  title: String,
  description: String,
  deadline: Date,
  priority: {
    type: String,
    enum: ['high', 'medium', 'low'],
    default: 'medium',
  },
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model for the assignee
    required: false,
    default: null,
  },
  comments: [commentSchema], // Array of comments
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
