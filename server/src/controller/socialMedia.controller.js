const uploadBufferToCloudinary = require("../helpers/buffer2Cloudinary");
const generateImageBuffer = require("../helpers/imageBuffer");
const { generateFromGroq } = require("../provider/groq.provider");
const { instructions } = require("../services/instructions.service");
const ApiError = require("../utils/ApiError");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const { prompts } = require("../utils/prompts");
const safeJson = require("../utils/safeJson");
const { saveHistory, creditMeta } = require("../utils/tool");

const generateThumbnailTool = asyncHandler(async (req, res) => {
  const {
    title,
    prompt,
    text_overlay,
    color_scheme,
    style,
    aspect_ratio,
    emotion,
  } = req.body;

  if (!title && !prompt) {
    throw new AppError("Title or Prompt one is required", 400);
  }

  const finalPrompt = prompts.buildThumbnailPrompt({
    title,
    prompt,
    text_overlay,
    color_scheme,
    style,
    aspect_ratio,
    emotion,
  });

  let imageBuffer;
  try {
    imageBuffer = await generateImageBuffer(finalPrompt);
  } catch (err) {
    throw ApiError(err);
  }

  const user = req.user;
  const limit = req.creditLimit;

  const cloudinaryResult = await uploadBufferToCloudinary(
    imageBuffer,
    "youtube-thumbnail",
    `thumb_${user._id}_${Date.now()}`,
  );

  await saveHistory(user, {
    input: `Title: ${title} | Prompt: ${prompt}`,
    output: cloudinaryResult.secure_url,
    tool: "youtube-thumbnail-generator",
  });

  return res.status(200).json({
    success: true,
    data: cloudinaryResult.secure_url,
    meta: req.creditMeta,
  });
});

const seoOptimizationTool = asyncHandler(async (req, res) => {
  const { topic, outline } = req.body;

  const user = req.user;
  const limit = req.creditLimit;

  if (!topic) {
    throw new AppError(400, "Video topic is required");
  }

  const prompt = prompts.ytSeoOptimizePrompt({ topic, outline });

  let raw;
  try {
    raw = await generateFromGroq({
      systemInstruction: instructions.ytSeoOptimizeInstructions,
      prompt,
      temperature: 0.2,
    });
  } catch (err) {
    throw ApiError(err);
  }

  const data = safeJson(raw);

  await saveHistory(user, {
    input: topic,
    output: data,
    tool: "youtube-seo-optimizer",
  });

  return res.status(200).json({
    success: true,
    data,
    meta: req.creditMeta,
  });
});

const scriptGenTool = asyncHandler(async (req, res) => {
  const { topic, platform, length } = req.body;

  const user = req.user;
  const limit = req.creditLimit;

  if (!topic) {
    throw new AppError(400, "Video topic is required");
  }

  if (!platform) {
    throw new AppError(400, "Platform is required");
  }

  if (!length) {
    throw new AppError(400, "Script length is required");
  }

  const prompt = prompts.scriptGenPrompt({ topic, platform, length });

  let raw;
  try {
    raw = await generateFromGroq({
      systemInstruction: instructions.scriptGenInstructions,
      prompt,
      temperature: 0.5,
    });
  } catch (err) {
    throw ApiError(err);
  }

  const data = safeJson(raw);

  await saveHistory(user, {
    input: `${platform} | ${length} | ${topic}`,
    output: data,
    tool: "shorts-script-generator",
  });

  return res.status(200).json({
    success: true,
    data,
    meta: req.creditMeta,
  });
});

const contentRepurposerTool = asyncHandler(async (req, res) => {
  const { sourceContent, selectedFormats } = req.body;

  const user = req.user;
  const limit = req.creditLimit;

  if (!sourceContent) {
    throw new AppError(400, "Source content is required");
  }

  if (!selectedFormats || !selectedFormats.length) {
    throw new AppError(400, "At least one output format must be selected");
  }

  const prompt = prompts.contentRepurposerPrompt({
    sourceContent,
    selectedFormats,
  });

  let raw;
  try {
    raw = await generateFromGroq({
      systemInstruction: instructions.contentRepurposerInstructions,
      prompt,
      temperature: 0.4,
    });
  } catch (err) {
    throw ApiError(err);
  }

  const data = safeJson(raw);

  await saveHistory(user, {
    input: sourceContent.slice(0, 200),
    output: data,
    tool: "content-repurposer",
  });

  return res.status(200).json({
    success: true,
    data,
    meta: req.creditMeta,
  });
});

module.exports = {
  generateThumbnailTool,
  seoOptimizationTool,
  scriptGenTool,
  contentRepurposerTool,
};
