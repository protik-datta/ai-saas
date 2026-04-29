const mongoose = require("mongoose");
const logger = require('../utils/logger');

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger.error("Database Connected");
  } catch (error) {
    logger.error("Database connection error", error.message);
  }
}

module.exports = connectDB;
