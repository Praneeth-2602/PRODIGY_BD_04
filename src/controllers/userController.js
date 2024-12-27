const User = require('../models/userModel');  // Your User model
const { setCache, getCache } = require('../config/redis');

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error('Error getting users:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getUserById = async (req, res) => {
    const { userId } = req.params;
    try {
        // Check cache first
        const cachedUser = await getCache(userId);
        if (cachedUser) {
            return res.json(JSON.parse(cachedUser));
        }

        // Fetch user data from DB
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Cache the user data in Redis
        await setCache(userId, JSON.stringify(user), 3600);  // Cache for 1 hour

        res.json(user);
    } catch (err) {
        console.error('Error getting user:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update cache
        await setCache(userId, JSON.stringify(updatedUser), 3600);  // Cache for 1 hour

        res.json(updatedUser);
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Remove from cache
        await setCache(userId, null, 0);  // Remove from cache

        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
