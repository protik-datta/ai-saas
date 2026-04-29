const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");
const History = require("../models/history.model");

// get all history
const getHistory = asyncHandler(async (req, res) => {
  const user = req.user;
  const { page = 1, limit = 20, tool } = req.query;

  const filter = { userId: user._id };
  if (tool) filter.tool = tool;

  const skip = (Number(page) - 1) * Number(limit);

  const [history, total] = await Promise.all([
    History.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .lean(),
    History.countDocuments(filter),
  ]);

  return res.status(200).json({
    success: true,
    data: history,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    },
  });
});

// delete single history item
const deleteHistoryItem = asyncHandler(async (req, res) => {
  const { historyId } = req.params;
  const user = req.user;

  const item = await History.findOneAndDelete({
    _id: historyId,
    userId: user._id,
  });

  if (!item) {
    throw new AppError(404, "History item not found");
  }

  return res.status(200).json({
    success: true,
    message: "History item deleted",
  });
});

// clear all history
const clearAllHistory = asyncHandler(async (req, res) => {
  const user = req.user;

  const result = await History.deleteMany({ userId: user._id });

  return res.status(200).json({
    success: true,
    message: `Deleted ${result.deletedCount} history items`,
  });
});

// delete history by tool
const deleteHistoryByTool = asyncHandler(async (req, res) => {
  const { tool } = req.params;
  const user = req.user;

  const result = await History.deleteMany({
    userId: user._id,
    tool,
  });

  if (result.deletedCount === 0) {
    throw new AppError(404, `No history found for tool: ${tool}`);
  }

  return res.status(200).json({
    success: true,
    message: `Deleted ${result.deletedCount} history item(s) for ${tool}`,
  });
});

module.exports = {
  getHistory,
  deleteHistoryItem,
  clearAllHistory,
  deleteHistoryByTool,
};
