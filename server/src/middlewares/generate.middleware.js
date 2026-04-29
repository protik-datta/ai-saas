const AppError = require("../utils/AppError");
const User = require("../models/user.model");

const PLAN_CREDITS = {
  FREE: parseInt(process.env.FREE_CREDITS) || 5,
  PRO: parseInt(process.env.PRO_CREDITS) || 500,
  TEAM: parseInt(process.env.TEAM_CREDITS) || 2000,
};

const generateMiddleware = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) return next(new AppError(404, "User not found"));

    const today = new Date().toDateString();
    const lastReset = user.lastResetDate
      ? new Date(user.lastResetDate).toDateString()
      : null;

    if (today !== lastReset) {
      user.dailyGenerateCount = 0;
      user.lastResetDate = new Date();
      await user.save();
    }

    const plan = user.plan ?? "FREE";
    const limit = PLAN_CREDITS[plan] ?? PLAN_CREDITS.FREE;

    if (user.dailyGenerateCount >= limit) {
      return next(
        new AppError(
          429,
          `Daily limit reached. Your ${plan} plan allows ${limit} generations/day.`,
        ),
      );
    }

    req.creditLimit = limit;

    req.creditMeta = {
      plan: user.plan ?? "FREE",
      used: user.dailyGenerateCount,
      limit,
      remaining: limit - user.dailyGenerateCount,
    };

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = generateMiddleware;
