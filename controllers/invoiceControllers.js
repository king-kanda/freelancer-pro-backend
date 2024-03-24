import Invoice from '../models/invoices.js';
import Client from '../models/clientModel.js'; // Import the Client model

const createInvoice = async (req, res) => {
  try {
    const {
      clientID,
      freelancerID,
      invoiceNote,
      items,
      invoiceTotal,
      status,
      paymentDate,
      dueDate, // Added dueDate field
    } = req.body;

    const invoice = new Invoice({
      clientID,
      freelancerID,
      invoiceNote,
      items,
      invoiceTotal,
      status,
      paymentDate,
      dueDate, // Assigning dueDate from request body
      
    });

    await invoice.save();
    console.log("done")
    res.status(201).json({ message: 'Invoice created successfully', invoice });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

const getInvoices = async (req, res) => {
  try {
    const userId = req.query.userId; // Extract userId from query parameters

    // Check if userId is provided
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }
    // Fetch invoice data along with client's name and email
    const invoices = await Invoice.find().populate('clientID', 'name email');

    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getInvoiceById = async (req, res) => {
  try {
    const invoiceId = req.params.id;
    const invoice = await Invoice.findById(invoiceId).populate('clientID', 'name email address company website');
    
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    const userId = req.query.userId;
    if (userId && project.freelanceId !== userId) {
        return res.status(403).json({ error: 'Unauthorized access to project' });
    }
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateInvoice = async (req, res) => {
  try {
    const invoiceId = req.params.id;
    const updates = req.body;
    const options = { new: true }; // Return the updated document

    const updatedInvoice = await Invoice.findByIdAndUpdate(invoiceId, updates, options);

    if (!updatedInvoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    res.json({ message: 'Invoice updated successfully', invoice: updatedInvoice });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteInvoice = async (req, res) => {
  try {
    const invoiceId = req.params.id;
    const deletedInvoice = await Invoice.findByIdAndDelete(invoiceId);

    if (!deletedInvoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    res.json({ message: 'Invoice deleted successfully', invoice: deletedInvoice });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// New method to get paid invoices
const getPaidInvoices = async (req, res) => {
  try {
    const paidInvoices = await Invoice.find({ status: 'paid' });
    res.json(paidInvoices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// New method to get pending invoices
const getPendingInvoices = async (req, res) => {
  try {
    const pendingInvoices = await Invoice.find({ status: 'pending' });
    res.json(pendingInvoices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default { 
    createInvoice, 
    getInvoices, 
    getInvoiceById, 
    updateInvoice, 
    deleteInvoice,
    getPaidInvoices,
    getPendingInvoices,
};
