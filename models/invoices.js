import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
  projectID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project', // Reference to the Project model for the associated project
    required: true,
  },
  clientName: {
    type: String,
    required: true,
  },
  clientEmail: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending',
  },
  paymentDate: {
    type: Date,
    default: null,
  },
  paymentMethod: String,
  transactionID: String,
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

export default Invoice;
