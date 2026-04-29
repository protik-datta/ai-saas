const { generateFromGroq } = require("../provider/groq.provider");
const { instructions } = require("../services/instructions.service");
const ApiError = require("../utils/ApiError");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const { prompts } = require("../utils/prompts");
const safeJson = require("../utils/safeJson");
const { saveHistory } = require("../utils/tool");

const DailyPlannerTool = asyncHandler(async (req, res) => {
  let { tasks, energyPattern, availableHours, startTime } = req.body;

  if (typeof tasks === "string") {
    try {
      tasks = JSON.parse(tasks);
    } catch {
      tasks = tasks
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    }
  }

  if (typeof availableHours === "string") {
    availableHours = Number(availableHours);
  }

  if (
    !Array.isArray(tasks) ||
    tasks.length === 0 ||
    !energyPattern ||
    typeof availableHours !== "number" ||
    isNaN(availableHours) ||
    !startTime
  ) {
    throw new AppError(400, "Invalid input fields");
  }

  const user = req.user;
  const limit = req.creditLimit;

  if (limit <= 0) {
    throw new AppError(403, "Credit limit exceeded");
  }

  const prompt = prompts.dailyPlannerPrompt({
    tasks,
    energyPattern,
    availableHours,
    startTime,
  });

  let raw;
  try {
    raw = await generateFromGroq({
      systemInstruction: instructions.dailyPlannerInstructions,
      prompt,
      temperature: 0.2,
    });
  } catch (err) {
    throw ApiError(err);
  }

  const data = safeJson(raw);

  if (!data || typeof data !== "object") {
    throw new AppError(500, "Invalid AI response format");
  }

  await saveHistory(user, {
    input: tasks.join(", "),
    output: data,
    tool: "ai-daily-planner",
  });

  res.status(200).json({
    success: true,
    data,
    meta: req.creditMeta,
  });
});

const HabitCoachTool = asyncHandler(async (req, res) => {
  let { habitGoal, difficulty, habitType, reminderTime } = req.body;

  if (!habitGoal || typeof habitGoal !== "string" || !habitGoal.trim()) {
    throw new AppError(
      400,
      "habitGoal is required and must be a non-empty string",
    );
  }

  const validDifficulties = ["Easy", "Medium", "Hard"];
  if (!difficulty || !validDifficulties.includes(difficulty)) {
    throw new AppError(
      400,
      `difficulty must be one of: ${validDifficulties.join(", ")}`,
    );
  }

  const validHabitTypes = ["Build", "Break", "Improve"];
  if (!habitType || !validHabitTypes.includes(habitType)) {
    throw new AppError(
      400,
      `habitType must be one of: ${validHabitTypes.join(", ")}`,
    );
  }

  if (!reminderTime || typeof reminderTime !== "string") {
    reminderTime = "08:00";
  }

  const user = req.user;
  const limit = req.creditLimit;

  const prompt = prompts.habitCoachPrompt({
    habitGoal: habitGoal.trim(),
    difficulty,
    habitType,
    reminderTime,
  });

  let raw;
  try {
    raw = await generateFromGroq({
      systemInstruction: instructions.habitCoachInstructions,
      prompt,
      temperature: 0.3,
    });
  } catch (err) {
    throw ApiError(err);
  }

  const data = safeJson(raw);

  if (!data || typeof data !== "object") {
    throw new AppError(500, "Invalid AI response format");
  }

  await saveHistory(user, {
    input: habitGoal,
    output: data,
    tool: "ai-habit-coach",
  });

  res.status(200).json({
    success: true,
    data,
    meta: req.creditMeta,
  });
});

const DecisionMakerTool = asyncHandler(async (req, res) => {
  let { decision, context, timeframe, stakes } = req.body;

  if (!decision || typeof decision !== "string" || !decision.trim()) {
    throw new AppError(
      400,
      "decision is required and must be a non-empty string",
    );
  }

  const validTimeframes = ["Short-term", "Long-term", "Both"];
  if (!timeframe || !validTimeframes.includes(timeframe)) {
    throw new AppError(
      400,
      `timeframe must be one of: ${validTimeframes.join(", ")}`,
    );
  }

  const validStakes = ["Low", "Medium", "High"];
  if (!stakes || !validStakes.includes(stakes)) {
    throw new AppError(400, `stakes must be one of: ${validStakes.join(", ")}`);
  }

  if (!context || typeof context !== "string") {
    context = "";
  }

  const user = req.user;
  const limit = req.creditLimit;

  const prompt = prompts.decisionMakerPrompt({
    decision: decision.trim(),
    context: context.trim(),
    timeframe,
    stakes,
  });

  let raw;
  try {
    raw = await generateFromGroq({
      systemInstruction: instructions.decisionMakerInstructions,
      prompt,
      temperature: 0.1,
    });
  } catch (err) {
    throw ApiError(err);
  }

  const data = safeJson(raw);

  if (!data || typeof data !== "object") {
    throw new AppError(500, "Invalid AI response format");
  }

  await saveHistory(user, {
    input: decision,
    output: data,
    tool: "ai-decision-maker",
  });

  res.status(200).json({
    success: true,
    data,
    meta: req.creditMeta,
  });
});

module.exports = { DailyPlannerTool, HabitCoachTool, DecisionMakerTool };
