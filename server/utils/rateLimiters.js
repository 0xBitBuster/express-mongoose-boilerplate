const { RateLimiterMemory, RateLimiterRedis } = require("rate-limiter-flexible");

const redisClient = require("../lib/redis")

const allRateLimiterMemory = new RateLimiterMemory({
    points: 12, // 60 / 5 if there are 5 processes at all
    duration: 60,
});
exports.allRateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    points: 60, // Number of points
    duration: 60, // Per 60 seconds
    insuranceLimiter: allRateLimiterMemory,
});

const loginRateLimiterMemory = new RateLimiterMemory({
    points: 2, // 10 / 5 if there are 5 processes at all
    duration: 3600,
});
exports.loginRateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    points: 10, // Number of points
    duration: 3600, // Per 1 hour
    insuranceLimiter: loginRateLimiterMemory,
});

exports.rateLimiterMiddleware = (rateLimiter) => (req, res, next) => {
    rateLimiter.consume(req.ip)
        .then(() => {
            console.log("TOOK IP")
            next();
        })
        .catch(() => {
            return res.status(429).send('Too Many Requests. Please try again later');
        });
};
  