const mongoose = require("mongoose");
const logger = require('../utils/logger');

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger.info("Database Connected");
  } catch (error) {
    logger.error("Database connection error: " + error.message);
    throw error; // Rethrow to let index.js handle it
  }
}

module.exports = connectDB;
