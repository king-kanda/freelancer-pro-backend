import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  city: String,
  state: String,
  zipcode: String
});

const clientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: addressSchema,
    companyName: { type: String, required: true },
    companyContact: String,
    companyWebsite: String,
    status: {
      type: String,
      enum: ['lead', 'negotiation', 'lost', 'contract', 'closed'],
      default: 'lead'
    },
    freelancerId: { type: String, required: true }, 
    projectIds: { type: [String], maxlength: 10 } 
  },
  { timestamps: true }
);

const Client = mongoose.model('Client', clientSchema);

export default Client;
