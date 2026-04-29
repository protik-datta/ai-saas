const History = require("../models/history.model");

const saveHistory = async (user, { input, output, tool }) => {
  await History.create({
    userId: user._id,
    input,
    output,
    tool,
  });

  user.dailyGenerateCount++;
  await user.save();
};

const creditMeta = (user, limit) => ({
  plan: user.plan ?? "FREE",
  used: user.dailyGenerateCount,
  limit,
  remaining: limit - user.dailyGenerateCount,
});

module.exports = { saveHistory, creditMeta };
