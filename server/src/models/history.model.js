const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    // Using Mixed type to support both plain text and structured JSON data from AI tools
    input: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    output: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    tool: {
      type: String,
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

const historyModel = mongoose.model("History", historySchema);

module.exports = historyModel;
