import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
    street: String,
    city: String,
    state: String,
    zipCode: String,
});

const userSchema = new mongoose.Schema({
    freelanceId: { type: String, unique: true } ,// Add unique freelance ID field
    username: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    fullName: { type: String, required: true },
    userType: { type: String, enum: ['freelancer', 'client'], required: true },
    address: addressSchema,
    freelanceId: { type: String, unique: true } // Add unique freelance ID field
});

const User = mongoose.model('user', userSchema);

export default User;
