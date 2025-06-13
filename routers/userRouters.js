const express = require('express');
const router = express.Router();
const validateAddress = require('../middleware/validateAddress');
const { createUser, getUserById, getAllUsers, deleteUserById, updateUserById } = require('../controller/userController');


//Get all users
router.get('/users', getAllUsers);

//Create user
router.post('/', validateAddress, createUser);

//Get user by Id
router.get('/:id', getUserById);



//Update user by Id
router.put('/:id', updateUserById);

//Delete user by Id
router.delete('/:id', deleteUserById);

module.exports = router;