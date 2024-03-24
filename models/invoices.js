import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
  clientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  freelancerID: {
    type: String,
    required: true,
  },
  invoiceNote: String,
  items: [{
    itemName: String,
    cost: Number,
    quantity: Number,
    total: Number,
    discounts: Number,
  }],
  invoiceTotal: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'paid' ,'overdue' , 'sent'],
    default: 'pending',
  },
  paymentDate: {
    type: Date,
    default: null,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  dateInvoiced: {
    type: Date,
    default: Date.now, // Set default value to current date/time when an invoice is created
  },
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

export default Invoice;
