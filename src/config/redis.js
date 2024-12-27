const { createClient } = require('redis');

// Creating the Redis client with the provided credentials
const client = createClient({
    username: 'default',
    password: 'L8ecyfCivqXvXMQt6R6uEKHxFZ2Xwgx6',  // Replace with your Redis password
    socket: {
        host: 'redis-14173.c330.asia-south1-1.gce.redns.redis-cloud.com',
        port: 14173
    }
});

client.on('error', (err) => {
    console.log('Redis Client Error', err);
});

const connectRedis = async () => {
    try {
        await client.connect();
        console.log('Connected to Redis');
    } catch (err) {
        console.error('Error connecting to Redis:', err);
    }
};

const getCache = async (key) => {
    try {
        const data = await client.get(key);
        return data;
    } catch (err) {
        console.error('Error fetching data from Redis:', err);
    }
};

const setCache = async (key, value, ttl = 3600) => {
    try {
        await client.setEx(key, ttl, value);
        console.log(`Cache set for ${key}`);
    } catch (err) {
        console.error('Error setting data in Redis:', err);
    }
};

module.exports = { connectRedis, getCache, setCache };
