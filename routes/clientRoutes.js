import express from 'express';
const router = express.Router();
import {
  addClient,
  listClients,
  updateClient,
  getClient,
  deleteClient
} from '../controllers/clientController.js';

// Add New Client
router.post('/clients', addClient);

// List All Clients
router.get('/clients', listClients);

// Edit/Update Client's Details
router.put('/clients/:id', updateClient);

// View Client's Details
router.get('/clients/:id', getClient);



// Delete Client
router.delete('/clients/:id', deleteClient);

export default router;
