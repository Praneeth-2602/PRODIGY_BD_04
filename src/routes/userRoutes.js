const express = require('express');
const { getUsers, createUser, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const { cache, cacheMiddleware } = require('../middleware/cache'); // Corrected import

const router = express.Router();

router.get('/users', cache, getUsers); // Use cache for fetching users
router.post('/users', createUser);

// Add routes for updating and deleting users...
router.get('/:userId', cacheMiddleware, getUserById); // Use cacheMiddleware for fetching user by ID
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);

module.exports = router;
