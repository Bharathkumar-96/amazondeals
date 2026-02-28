const redis = require('redis');

// Create Redis client
const client = redis.createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  socket: {
    reconnectStrategy: (retries) => Math.min(retries * 50, 500),
  },
});

// Handle Redis connection events
client.on('error', (err) => {
  console.error('Redis Client Error:', err);
});

client.on('connect', () => {
  console.log('✓ Connected to Redis');
});

client.on('reconnecting', () => {
  console.log('↻ Reconnecting to Redis...');
});

// Connect to Redis
async function connectRedis() {
  try {
    await client.connect();
    console.log('Redis connection established');
  } catch (err) {
    console.error('Failed to connect to Redis:', err);
    // Continue running without Redis if connection fails
  }
}

/**
 * Get value from Redis cache
 * @param {string} key - Cache key
 * @returns {Promise<object|null>} - Cached value or null
 */
async function getCache(key) {
  try {
    const value = await client.get(key);
    return value ? JSON.parse(value) : null;
  } catch (err) {
    console.warn('Cache get error:', err);
    return null;
  }
}

/**
 * Set value in Redis cache with optional expiry
 * @param {string} key - Cache key
 * @param {*} value - Value to cache
 * @param {number} expirySeconds - Expiry time in seconds (default: 3600 = 1 hour)
 * @returns {Promise<boolean>} - Success status
 */
async function setCache(key, value, expirySeconds = 3600) {
  try {
    await client.setEx(key, expirySeconds, JSON.stringify(value));
    return true;
  } catch (err) {
    console.warn('Cache set error:', err);
    return false;
  }
}

/**
 * Delete cache key
 * @param {string} key - Cache key
 * @returns {Promise<boolean>} - Success status
 */
async function deleteCache(key) {
  try {
    await client.del(key);
    return true;
  } catch (err) {
    console.warn('Cache delete error:', err);
    return false;
  }
}

/**
 * Clear all cache
 * @returns {Promise<boolean>} - Success status
 */
async function clearCache() {
  try {
    await client.flushDb();
    return true;
  } catch (err) {
    console.warn('Cache clear error:', err);
    return false;
  }
}

/**
 * Increment a counter in Redis
 * @param {string} key - Counter key
 * @returns {Promise<number>} - New counter value
 */
async function incrementCounter(key) {
  try {
    return await client.incr(key);
  } catch (err) {
    console.warn('Counter increment error:', err);
    return 0;
  }
}

/**
 * Get a counter value
 * @param {string} key - Counter key
 * @returns {Promise<number>} - Counter value
 */
async function getCounter(key) {
  try {
    const value = await client.get(key);
    return value ? parseInt(value, 10) : 0;
  } catch (err) {
    console.warn('Counter get error:', err);
    return 0;
  }
}

module.exports = {
  connectRedis,
  getCache,
  setCache,
  deleteCache,
  clearCache,
  incrementCounter,
  getCounter,
  client,
};
