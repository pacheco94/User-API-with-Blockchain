const express = require('express');
const connectDB = require('./config/dbConnect');
const cors = require('cors');
const userRouter = require('./routers/userRouters');
require('dotenv').config();
const contract = require('./config/ethers');

const startServer = async () => {
    try {
        // Connect to MongoDB first
        await connectDB();
        console.log('MongoDB connection successful');

        const app = express();
        app.use(cors());
        app.use(express.json());

        // Mount API routers
        app.use('/api/users', userRouter);

        // Root endpoint
        app.get('/', (req, res) => {
            res.send('API create user with blockchain');
        });

        // Subscribe to contract events at startup
        contract.on('UserCreate', (id, name) => {
            console.log(`User created -> id= ${id.toString()}, name= ${name}`);
        });

        contract.on('UserUpdated', (id, newName) => {
            console.log(`User updated -> id= ${id.toString()}, newName= ${newName}`);
        });

        contract.on('UserDeleted', (id) => {
            console.log(`User deleted -> id= ${id.toString()}`);
        });

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();