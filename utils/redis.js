// Import the Redis client library
import redis from 'redis';

// Define the RedisClient class
class RedisClient {
  constructor() {
    // Create a new Redis client
    this.client = redis.createClient();

    // Log any errors from the Redis client
    this.client.on('error', (err) => {
      console.error('Redis client error:', err);
    });
  }

  // Check if the connection to Redis is alive
  isAlive() {
    return this.client.connected;
  }

  // Get a value from Redis based on the provided key
  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, reply) => {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }

  // Set a value in Redis with a specified expiration time
  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.setex(key, duration, value, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  // Delete a value from Redis based on the provided key
  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

// Create and export an instance of RedisClient
const redisClient = new RedisClient();
export default redisClient;
