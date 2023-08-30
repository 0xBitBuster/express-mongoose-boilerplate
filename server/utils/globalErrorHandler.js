const AppError = require("./AppError");

const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

    const message = `${value} is already in use, please try another.`;
    return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {  
    const message = err.errors[Object.keys(err.errors)[0]]?.message;
    return new AppError(message, 400);
};

const sendErrorDev = (err, req, res) => {
    return res.status(err.statusCode).json({
        ok: false,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};

const sendErrorProd = (err, req, res) => {
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            ok: false,
            msg: err.message,
        });
    }

    console.error("ERROR: ", err);
    return res.status(500).json({
        ok: false,
        msg: "Something went very wrong!",
    });
};

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    if (process.env.NODE_ENV === "development") {
        sendErrorDev(err, req, res);
    } else if (process.env.NODE_ENV === "production") {
        let error = { ...err };
        error.name = err.name
        error.message = err.message;

        if (error.name === "CastError") error = handleCastErrorDB(error);
        if (error.code === 11000) error = handleDuplicateFieldsDB(error);
        if (error.name === "ValidationError") error = handleValidationErrorDB(error);

        sendErrorProd(error, req, res);
    }
};
