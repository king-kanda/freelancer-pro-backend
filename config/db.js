// config/database.js
import mongoose from 'mongoose'

async function connect() {
    try {
        // const uri = "mongodb://localhost:27017/freelancer-pro";
        const uri = "mongodb+srv://okanda:1234@freelancerpro.dsxw4nh.mongodb.net/?retryWrites=true&w=majority&appName=freelancerPro";
        const db = await mongoose.connect(uri);
        console.log(`mongodb is connected ${db.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}

export default {connect} ;