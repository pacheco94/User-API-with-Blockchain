const contract = require('../config/ethers');
const UserModel = require('../model/userModel');
const serializeUser = require('../utils/serializeUser');

// Create a new user
const createUser = async (req, res) => {
    try {
        const { name, email, addressWallet } = req.body;

        // Validate input
        if (!name || !email || !addressWallet) {
            return res.status(400).json({ error: 'Name, email and addressWallet are required' });
        }

        try {
            // Execute transaction to create a new user
            const tx = await contract.creteUser(name, email, addressWallet);
            console.log('Transaction sent:', tx.hash);
            
            const receipt = await tx.wait();
            console.log('Transaction receipt:', receipt);

            // Find the UserCreate event
            const event = receipt.logs.map(log => {
                try {
                    return contract.interface.parseLog(log);
                } catch (error) {
                    return null;
                }
            }).find(parsed => parsed && parsed.name === 'UserCreate');

            if (!event) {
                return res.status(500).json({ error: 'UserCreate event not emitted' });
            }

            const { id, name: eventName } = event.args;
            
            // Store user data in the database
            console.log('Creating user in MongoDB with data:', {
                id: id.toString(),
                name: eventName,
                email,
                addressWallet
            });

            const user = new UserModel({
                id: id.toString(),
                name: eventName,
                email,
                addressWallet
            });

            console.log('Attempting to save user to MongoDB...');
            const savedUser = await user.save();
            console.log('User saved successfully:', savedUser);

            res.status(201).json({
                message: 'User created successfully',
                txHash: tx.hash,
                blockNumber: receipt.blockNumber,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    addressWallet: user.addressWallet
                }
            });

        } catch (contractError) {
            console.error('Contract error:', contractError);
            
            // Check if it's a wallet already used error
            if (contractError.reason === 'Wallet already used!') {
                return res.status(400).json({ 
                    error: 'This wallet address is already registered' 
                });
            }

            throw contractError; // Re-throw other contract errors
        }

    } catch (error) {
        console.error('Error creating user:', error);
        
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Duplicate email or wallet address' });
        }

        // Handle other errors
        res.status(500).json({ 
            error: error.reason || error.message || 'Internal server error'
        });
    }
};

// Get user by Id
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findOne({ id });
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.status(200).json({ user });

    } catch (error) {
        console.error('Error getting user:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all users from the database
const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        if (!users || users.length === 0) {
            return res.status(404).json({error: 'No users found' });
        }

        res.status(200).json({ users });

    } catch (error) {
        console.error('Error getting users:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update user by Id
const updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const user = await UserModel.findOne({ id });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const tx = await contract.updateUser(id, name);
        const receipt = await tx.wait();

        user.name = name;
        await user.save();

        res.status(200).json({
            message: 'User updated successfully',
            txHash: tx.hash,
            blockNumber: receipt.blockNumber,
            user
        });
         
    } catch (error) {
        console.error('Error updating user:', error.message);
        res.status(400).json({ error: error.reason || error.message });
    }
};

// Delete user by Id
const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const user = await UserModel.findOne({ id });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const tx = await contract.deleteUser(id);
        const receipt = await tx.wait();

        await UserModel.deleteOne({ id });

        res.status(200).json({
            message: 'User deleted successfully',
            txHash: tx.hash,
            blockNumber: receipt.blockNumber
        });
    } catch (error) {
        console.error('Error deleting user:', error.message);
        res.status(500).json({ error: error.reason || error.message });
    }
};

module.exports = {
    createUser,
    getUserById,
    getAllUsers,
    updateUserById,
    deleteUserById
};