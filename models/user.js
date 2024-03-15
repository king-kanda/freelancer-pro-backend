import mongoose from 'mongoose'
// sending data to db
const addressSchema = new mongoose.Schema({
    street: String,
    city: String,
    state: String,
    zipCode: String,
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    fullName: { type: String, required: true },
    userType: { type: String, enum: ['freelancer', 'client'], required: true },
    address: addressSchema, // Embed the address schema
  });

const User = mongoose.model('user', userSchema);

export default User ;