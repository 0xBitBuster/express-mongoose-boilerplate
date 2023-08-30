const { RateLimiterMemory, RateLimiterRedis } = require("rate-limiter-flexible");
const AppError = require("./AppError")

const redisClient = require("../lib/redis")

const allRateLimiterMemory = new RateLimiterMemory({
    points: 12, // 12 requests per 30min
    duration: 30,
});
exports.allRateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    points: 50, // 50 requests per 60min
    duration: 60, 
    insuranceLimiter: allRateLimiterMemory,
});

const loginRateLimiterMemory = new RateLimiterMemory({
    points: 4, // 4 requests per 30min
    duration: 30,
});
exports.loginRateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    points: 6, // 6 requests per 60min
    duration: 60, 
    insuranceLimiter: loginRateLimiterMemory,
});

exports.rateLimiterMiddleware = (rateLimiter) => (req, res, next) => {
    rateLimiter.consume(req.ip)
        .then(() => next())
        .catch(() => {
            return next(new AppError("Too Many Requests. Please try again later", 429))
        });
};
  
