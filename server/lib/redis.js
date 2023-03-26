const Redis = require("ioredis");

// Create a redis instance. By default, it will connect to redis:6379
const redisClient = new Redis({ 
	port: 6379,
	host: "redis",
	enableOfflineQueue: false 
});

module.exports = redisClient