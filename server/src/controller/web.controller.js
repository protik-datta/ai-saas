const fetchRepo = require("../helpers/fetchRepo");
const { generateFromGemini } = require("../provider/gemini.provider");
const { instructions } = require("../services/instructions.service");
const ApiError = require("../utils/ApiError");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const { prompts } = require("../utils/prompts");
const safeJson = require("../utils/safeJson");
const { saveHistory, creditMeta } = require("../utils/tool");

const landingPageCopyTool = asyncHandler(async (req, res) => {
  const { productName, productDesc, audience, framework, tone } = req.body;

  const user = req.user;
  const limit = req.creditLimit;

  if (!productName) {
    throw new AppError(400, "Product name is required");
  }

  if (!productDesc) {
    throw new AppError(400, "Product description is required");
  }

  const prompt = prompts.landingPageCopyPrompt({
    productName,
    productDesc,
    audience,
    framework: framework || "AIDA",
    tone: tone || "Professional",
  });

  let raw;
  try {
    raw = await generateFromGemini({
      systemInstruction: instructions.landingPageCopyInstructions,
      prompt,
      temperature: 0.4,
    });
  } catch (err) {
    throw ApiError(err);
  }

  const data = safeJson(raw);

  await saveHistory(user, {
    input: `${productName} — ${productDesc.slice(0, 100)}`,
    output: data,
    tool: "landing-page-copy-generator",
  });

  return res.status(200).json({
    success: true,
    data,
    meta: req.creditMeta,
  });
});

const repoReviewTool = asyncHandler(async (req, res) => {
  const { repoUrl, codeSnippet, language, reviewFocus } = req.body;

  const user = req.user;
  const limit = req.creditLimit;

  if (!codeSnippet && !repoUrl) {
    throw new AppError(400, "Either code snippet or GitHub URL is required");
  }

  let finalCode = codeSnippet;
  let repoMeta = null;

  if (repoUrl && !codeSnippet) {
    repoMeta = await fetchRepo(repoUrl);
    finalCode = repoMeta.code;
  }

  const prompt = prompts.repoReviewPrompt({
    language: language || "JavaScript",
    reviewFocus: reviewFocus || [],
    repoUrl: repoMeta
      ? `${repoMeta.repoName} (${repoMeta.fileCount} files fetched)`
      : repoUrl,
    codeSnippet: finalCode,
  });

  let raw;
  try {
    raw = await generateFromGemini({
      systemInstruction: instructions.repoReviewInstructions,
      prompt,
      temperature: 0.2,
    });
  } catch (err) {
    throw ApiError(err);
  }

  const data = safeJson(raw);

  await saveHistory(user, {
    input: repoUrl || codeSnippet.slice(0, 200),
    output: data,
    tool: "repo-review-ai",
  });

  return res.status(200).json({
    success: true,
    data,
    meta: req.creditMeta,
  });
});

const seoKeywordTool = asyncHandler(async (req, res) => {
  const { topic, niche } = req.body;

  const user = req.user;
  const limit = req.creditLimit;

  if (!topic) {
    throw new AppError(400, "Core topic is required");
  }

  const prompt = prompts.seoKeywordPrompt({ topic, niche });

  let raw;
  try {
    raw = await generateFromGemini({
      systemInstruction: instructions.seoKeywordInstructions,
      prompt,
      temperature: 0.3,
    });
  } catch (err) {
    throw ApiError(err);
  }

  const data = safeJson(raw);

  await saveHistory(user, {
    input: niche ? `${topic} | ${niche}` : topic,
    output: data,
    tool: "ai-seo-keyword-generator",
  });

  return res.status(200).json({
    success: true,
    data,
    meta: req.creditMeta,
  });
});

const websiteBuilderTool = asyncHandler(async (req, res) => {
  const { description, siteType, theme } = req.body;

  const user = req.user;
  const limit = req.creditLimit;

  if (!description) {
    throw new AppError(400, "Site description is required");
  }

  const prompt = prompts.websiteBuilderPrompt({
    siteType: siteType || "SaaS Landing Page",
    description,
    primaryColor: theme?.primary || "#2563eb",
  });

  let raw;
  try {
    raw = await generateFromGemini({
      systemInstruction: instructions.websiteBuilderInstructions,
      prompt,
      temperature: 0.3,
    });
  } catch (err) {
    throw ApiError(err);
  }

  let html = raw.replace(/```html|```/g, "").trim();

  if (html.startsWith('"') && html.endsWith('"')) {
    try {
      html = JSON.parse(html);
    } catch {
      html = html.slice(1, -1);
    }
  }

  html = html
    .replace(/\\n/g, "\n")
    .replace(/\\t/g, "\t")
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .replace(/\\\\/g, "\\");

  if (!html.trimStart().startsWith("<!DOCTYPE")) {
    const start = html.indexOf("<!DOCTYPE");
    if (start !== -1) html = html.slice(start);
  }

  await saveHistory(user, {
    input: `${siteType || "SaaS Landing Page"} — ${description.slice(0, 150)}`,
    output: html.slice(0, 500),
    tool: "ai-website-builder",
  });

  return res.status(200).json({
    success: true,
    data: html,
    meta: req.creditMeta,
  });
});

module.exports = {
  landingPageCopyTool,
  repoReviewTool,
  seoKeywordTool,
  websiteBuilderTool,
};
