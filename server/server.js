const mongoSanitize = require("express-mongo-sanitize");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const xss = require("xss-clean");
const morgan = require("morgan")
const path = require("path");
const cors = require("cors");
const hpp = require("hpp");

const { allRateLimiter, rateLimiterMiddleware } = require("./utils/rateLimiters")
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./utils/globalErrorHandler');
const connectMongoDB = require("./lib/mongodb");
const homeRoutes = require("./routes/homeRoutes");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

// Configure App
dotenv.config();
app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(compression());
app.use(rateLimiterMiddleware(allRateLimiter));
if (process.env.NODE_ENV == "development") {
    app.use(morgan("dev"));
}

app.use("/api/", homeRoutes);
app.use("/api/blog/", blogRoutes);
app.all("*", (req, res, next) => {
    next(new AppError("This route does not exist.", 404));
});

app.use(globalErrorHandler);

// Connect to MongoDB, then start the server
let server;
const PORT = process.env.PORT || 3000;
connectMongoDB().then(() => {
    server = app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`);
    });
});

// Listen for unexpected Errors
process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION! Shutting down...");
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

process.on("unhandledRejection", (err) => {
    console.log("UNHANDLED REJECTION! Shutting down...");
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

process.on("SIGTERM", () => {
    console.log("SIGTERM RECEIVED! Shutting down gracefully");
    server.close(() => {
        console.log("Process terminated!");
    });
});
