const logger = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
  const isProd = process.env.NODE_ENV === "production";

  // Log the error using Winston logger
  logger.error(err.stack || err.message || err);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: isProd && statusCode === 500
      ? "Something went wrong. Please try again later."
      : err.message,
    error: isProd ? undefined : err,
  });
};

const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`
  });
};

module.exports = {
  errorHandler,
  notFoundHandler
};
