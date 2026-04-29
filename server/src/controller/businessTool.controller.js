const { generateFromGemini } = require("../provider/gemini.provider");
const { instructions } = require("../services/instructions.service");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const { prompts } = require("../utils/prompts");
const safeJson = require("../utils/safeJson");
const User = require("../models/user.model");
const { saveHistory } = require("../utils/tool");
const ApiError = require("../utils/ApiError");

const competitorAnalysisTool = asyncHandler(async (req, res) => {
  const { niche } = req.body;

  if (!niche) {
    throw new AppError(400, "Niche / Project Idea cannot be empty");
  }

  const user = req.user; // from generate middleware
  const limit = req.creditLimit;

  const prompt = prompts.competitorAnalysisPrompt(niche);

  let raw;
  try {
    raw = await generateFromGemini({
      systemInstruction: instructions.competitorAnalysisInstructions,
      prompt,
      temperature: 0.3,
    });
  } catch (err) {
    throw ApiError(err);
  }

  const data = safeJson(raw);

  await saveHistory(user, {
    input: niche,
    output: data,
    tool: "competitor-analysis",
  });

  res.status(200).json({
    success: true,
    data: data,
    meta: req.creditMeta,
  });
});

const pricingStrategyTool = asyncHandler(async (req, res) => {
  const { product, description, customer, cost } = req.body;

  if (!product || !description || !customer) {
    throw new AppError(
      400,
      "Product, Description and Customer fields cannot be empty",
    );
  }

  const user = req.user;
  const limit = req.creditLimit;

  const prompt = prompts.pricingStrategyPrompt({
    product,
    description,
    customer,
    cost,
  });

  let raw;
  try {
    raw = await generateFromGemini({
      systemInstruction: instructions.pricingStrategyInstructions,
      prompt,
      temperature: 0.3,
    });
  } catch (err) {
    throw ApiError(err);
  }

  const data = safeJson(raw);

  await saveHistory(user, {
    input: `${product} | ${description}`,
    output: data,
    tool: "pricing-strategy-tool",
  });

  res.status(200).json({
    success: true,
    data: data,
    meta: req.creditMeta,
  });
});

const emailWriterTool = asyncHandler(async (req, res) => {
  const { prospect, name, company, role, offering, goal, websiteUrl } = req.body;

  const finalName = prospect || name;

  if (!finalName || !offering) {
    throw new AppError(400, "Prospect name and Offering cannot be empty");
  }

  const user = req.user;
  const limit = req.creditLimit;

  const prompt = prompts.coldEmailPrompt({
    name: finalName,
    company,
    role,
    offering,
    goal,
    websiteUrl,
  });

  let raw;
  try {
    raw = await generateFromGemini({
      systemInstruction: instructions.coldEmailInstructions,
      prompt,
      temperature: 0.3,
    });
  } catch (err) {
    throw ApiError(err);
  }

  const data = safeJson(raw);

  await saveHistory(user, {
    input: `${offering}`,
    output: data,
    tool: "cold-email-writer",
  });

  res.status(200).json({
    success: true,
    data: data,
    meta: req.creditMeta,
  });
});

const businessIdeaTool = asyncHandler(async (req, res) => {
  const { niche, audience, model } = req.body;

  if (!niche || !audience || !model) {
    throw new AppError(400, "Niche, Audience and Model cannot be empty");
  }

  const user = req.user;
  const limit = req.creditLimit;

  const prompt = prompts.businessIdeasPrompt({ niche, audience, model });

  let raw;
  try {
    raw = await generateFromGemini({
      systemInstruction: instructions.businessIdeasInstructions,
      prompt,
      temperature: 0.3,
    });
  } catch (err) {
    throw ApiError(err);
  }

  const data = safeJson(raw);

  await saveHistory(user, {
    input: `${niche} | ${audience} | ${model}`,
    output: data,
    tool: "business-idea-generator",
  });

  res.status(200).json({
    success: true,
    data: data,
    meta: req.creditMeta,
  });
});

module.exports = {
  competitorAnalysisTool,
  pricingStrategyTool,
  emailWriterTool,
  businessIdeaTool,
};
