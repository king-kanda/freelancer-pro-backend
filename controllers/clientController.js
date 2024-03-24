// Add New Client
import Client from '../models/clientModel.js';


export const addClient = async (req, res) => {
  try {
    const { freelancerId, companyName, companyContact, companyWebsite, name, email, phone,  city , state , zipcode  } = req.body;
    const client = new Client({
      freelancerId,
      companyName,
      companyContact,
      companyWebsite,
      name,
      email,
      phone,
      address: { city, state, zipcode }
    });
    console.log(req.body)
    await client.save();
    res.status(201).json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// List All Clients
export const listClients = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    const clients = await Client.find({ freelancerId: userId });
    res.status(200).json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Edit/Update Client's Details
export const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { freelanceId, companyName, companyContact, companyWebsite, name, email, phone,  city , state , zipcode  } = req.body;
    await Client.findByIdAndUpdate(id, {
      freelanceId,
      companyName,
      companyContact,
      companyWebsite,
      name,
      email,
      phone,
      address: { city, state, zipcode }
    });
    res.status(200).json({ message: 'Client details updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// View Client's Details
export const getClient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    const { userId } = req.query;
    if (userId && client.freelancerId !== userId) {
        return res.status(403).json({ error: 'Unauthorized access to client' });
    }

    res.status(200).json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




// Delete Client
export const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    await Client.findByIdAndDelete(id);
    res.status(200).json({ message: 'Client deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
