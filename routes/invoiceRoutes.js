import express from 'express';
import InvoiceController from '../controllers/invoiceControllers.js';

const router = express.Router();

// Create a new invoice
router.post('/invoices', InvoiceController.createInvoice);

// Get all invoices
router.get('/invoices', InvoiceController.getInvoices);

// Get an invoice by ID
router.get('/invoices/:id', InvoiceController.getInvoiceById);

// Update an invoice
router.put('/invoices/:id', InvoiceController.updateInvoice);

// Delete an invoice
router.delete('/invoices/:id', InvoiceController.deleteInvoice);

export default router;
