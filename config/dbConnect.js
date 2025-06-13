// This code connects to a MongoDB database using Mongoose. It exports a function that attempts to connect to the database using the URI stored in an environment variable.

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1); // Exit process with failure
    }
}

module.exports = connectDB;
