const User = require("../models/user.model");

const PLAN_CREDITS = {
  FREE: parseInt(process.env.FREE_CREDITS) || 5,
  PRO: parseInt(process.env.PRO_CREDITS) || 500,
  TEAM: parseInt(process.env.TEAM_CREDITS) || 2000,
};

const creditMiddleware = async (req, res, next) => {
  const user = req.user;

  const today = new Date().toDateString();
  const lastReset = user.lastResetDate
    ? new Date(user.lastResetDate).toDateString()
    : null;

  // reset logic
  if (today !== lastReset) {
    user.dailyGenerateCount = 0;
    user.lastResetDate = new Date();
    await user.save();
  }

  const plan = user.plan ?? "FREE";
  const limit = PLAN_CREDITS[plan] ?? PLAN_CREDITS.FREE;

  req.creditMeta = {
    plan,
    used: user.dailyGenerateCount,
    limit,
    remaining: limit - user.dailyGenerateCount,
  };



  next();
};

module.exports = creditMiddleware;
