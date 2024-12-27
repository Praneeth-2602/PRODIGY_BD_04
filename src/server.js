const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');  // MongoDB database connection
const { connectRedis } = require('./config/redis');  // Redis connection
const userRoutes = require('./routes/userRoutes');  // Import user routes

dotenv.config();  // Load environment variables

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware setup
app.use(express.json());

// Connect to MongoDB and Redis
connectDB();
connectRedis();

// API routes
app.use('/api', userRoutes);  // Use the routes with '/api' prefix

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
