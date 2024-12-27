const { getCache, setCache } = require('../config/redis');

const cacheMiddleware = async (req, res, next) => {
    const { userId } = req.params;

    // Check if the data is available in cache
    const cachedData = await getCache(userId);
    if (cachedData) {
        console.log('Cache hit');
        return res.json(JSON.parse(cachedData));  // Send cached data
    }

    // Proceed to next middleware (i.e., controller)
    next();
};

const cache = async (req, res, next) => {
    const url = req.originalUrl;

    // Check if the data is available in cache
    const cachedData = await getCache(url);
    if (cachedData) {
        console.log('Cache hit');
        return res.json(JSON.parse(cachedData));  // Send cached data
    }

    // Proceed to next middleware (i.e., controller)
    next();
}

module.exports = { cache, cacheMiddleware };
