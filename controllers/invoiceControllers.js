import Invoice from '../models/invoices.js';

const createInvoice = async (req, res) => {
  try {
    const {
      projectID,
      clientName,
      clientEmail,
      amount,
      dueDate,
      paymentMethod,
      transactionID
    } = req.body;

    const invoice = new Invoice({
      projectID,
      clientName,
      clientEmail,
      amount,
      dueDate,
      paymentMethod,
      transactionID
    });

    await invoice.save();
    res.status(201).json({ message: 'Invoice created successfully', invoice });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getInvoiceById = async (req, res) => {
  try {
    const invoiceId = req.params.id;
    const invoice = await Invoice.findById(invoiceId);
    
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
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
