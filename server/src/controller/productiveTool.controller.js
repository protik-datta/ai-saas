const { generateFromGroq } = require("../provider/groq.provider");
const { instructions } = require("../services/instructions.service");
const ApiError  = require("../utils/ApiError");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const { fileParse } = require("../utils/fileParse");
const { prompts } = require("../utils/prompts");
const safeJson = require("../utils/safeJson");
const { saveHistory, creditMeta } = require("../utils/tool");

const resumeAnalyzerTool = asyncHandler(async (req, res) => {
  const { jobTitle, jobDescription } = req.body;
  const file = req.file;

  if (!file) throw new AppError(400, "Resume file is required");
  if (!jobTitle) throw new AppError(400, "Job title is required");

  const user = req.user;
  const limit = req.creditLimit;

  let resumeText;

  try {
    const parsed = await fileParse(file);
    resumeText = parsed?.text || "";
  } catch (error) {
    throw new AppError(500, "Failed to parse resume file");
  }

  if (!resumeText || resumeText.trim().length < 30) {
    throw new AppError(400, "Could not extract meaningful resume content");
  }

  const prompt = prompts.resumeAnalyzerPrompt({
    jobTitle,
    jobDescription,
    fileName: file.originalname,
    resumeText: resumeText || "Content could not be extracted.",
  });

  let raw
  try {
    raw = await generateFromGroq({
      systemInstruction: instructions.resumeAnalyzerInstructions,
      prompt,
      temperature: 0.2,
    });
  } catch (err) {
    throw ApiError(err);
  }

  const data = safeJson(raw);

  await saveHistory(user, {
    input: `Resume: ${file.originalname} | Role: ${jobTitle}`,
    output: data,
    tool: "ai-resume-analyzer",
  });

  res.status(200).json({
    success: true,
    data,
    meta: req.creditMeta,
  });
});

const pdfSummarizerTool = asyncHandler(async (req, res) => {
  const { summaryLength, language, focus } = req.body;
  const file = req.file;

  const user = req.user;
  const limit = req.creditLimit;

  if (!summaryLength || !language) {
    throw new AppError(400, "Summary Length and Language is required");
  }

  if (!file) {
    throw new AppError(400, "PDF File is required");
  }

  const isPdf =
    file.mimetype === "application/pdf" &&
    file.originalname?.toLowerCase().endsWith(".pdf");

  if (!isPdf) {
    throw new AppError(400, "Only PDF files are allowed");
  }

  let pdfText;

  try {
    pdfText = (await fileParse(file))?.text || "";
  } catch (error) {
    throw new AppError(500, "Failed to parse pdf file");
  }

  if (!pdfText || pdfText.trim().length < 50) {
    throw new AppError(400, "Could not extract PDF content");
  }

  const prompt = prompts.pdfSummarizerPrompt({
    summaryLength,
    language,
    focus,
    fileName: file.originalname,
    pdfText,
  });

  let raw
  try {
     raw = await generateFromGroq({
      systemInstruction: instructions.pdfSummarizerInstructions,
      prompt,
      temperature: 0.2,
    });
  } catch (err) {
    throw ApiError(err);
  }

  const data = safeJson(raw);

  await saveHistory(user, {
    input: `PDF: ${file.originalname} | Focus: ${focus || "general"}`,
    output: data,
    tool: "ai-pdf-summarizer",
  });

  return res.status(200).json({
    success: true,
    data,
    meta: req.creditMeta,
  });
});

const taskBreakdownTool = asyncHandler(async (req, res) => {
  const { projectName, description, timeline, teamSize, complexity } = req.body;

  const user = req.user;
  const limit = req.creditLimit;

  if (!projectName || !description || !timeline || !teamSize || !complexity) {
    throw new AppError(400, "Input fields are required");
  }

  const prompt = prompts.taskBreakdownPrompt({
    projectName,
    description,
    timeline,
    teamSize,
    complexity,
  });

  let raw;
  try {
     raw = await generateFromGroq({
      systemInstruction: instructions.taskBreakdownInstructions,
      prompt,
      temperature: 0.2,
    });
  } catch (err) {
    throw ApiError(err);
  }

  const data = safeJson(raw);

  await saveHistory(user, {
    input: `${projectName}`,
    output: data,
    tool: "task-breakdown-ai",
  });

  return res.status(200).json({
    success: true,
    data,
    meta: req.creditMeta,
  });
});

module.exports = { resumeAnalyzerTool, pdfSummarizerTool, taskBreakdownTool };
