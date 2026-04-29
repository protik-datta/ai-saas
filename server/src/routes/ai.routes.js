const express = require("express");
const multer = require("multer");
const {
  competitorAnalysisTool,
  pricingStrategyTool,
  emailWriterTool,
  businessIdeaTool,
} = require("../controller/businessTool.controller");

const {
  resumeAnalyzerTool,
  pdfSummarizerTool,
  taskBreakdownTool,
} = require("../controller/productiveTool.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const generateMiddleware = require("../middlewares/generate.middleware");

const {
  DailyPlannerTool,
  HabitCoachTool,
  DecisionMakerTool,
} = require("../controller/lifeOpt.controller");

const {
  generateThumbnailTool,
  seoOptimizationTool,
  scriptGenTool,
  contentRepurposerTool,
} = require("../controller/socialMedia.controller");

const {
  landingPageCopyTool,
  repoReviewTool,
  seoKeywordTool,
  websiteBuilderTool,
} = require("../controller/web.controller");

const router = express.Router();
const upload = multer();

// ------------------ business tools ------------------ //

router.post(
  "/competitor-analysis",
  authMiddleware,
  generateMiddleware,
  upload.none(),
  competitorAnalysisTool,
);
router.post(
  "/pricing-strategy",
  authMiddleware,
  generateMiddleware,
  upload.none(),
  pricingStrategyTool,
);
router.post(
  "/email-writer",
  authMiddleware,
  generateMiddleware,
  upload.none(),
  emailWriterTool,
);
router.post(
  "/business-idea",
  authMiddleware,
  generateMiddleware,
  upload.none(),
  businessIdeaTool,
);

// ------------------ productivity tools ------------------ //

router.post(
  "/resume-analyzer",
  authMiddleware,
  generateMiddleware,
  upload.single("file"),
  resumeAnalyzerTool,
);
router.post(
  "/pdf-summarizer",
  authMiddleware,
  generateMiddleware,
  upload.single("file"),
  pdfSummarizerTool,
);
router.post(
  "/task-breakdown",
  authMiddleware,
  generateMiddleware,
  upload.none(),
  taskBreakdownTool,
);

// ------------------ life optimization tools ------------------ //

router.post(
  "/daily-planner",
  authMiddleware,
  generateMiddleware,
  upload.none(),
  DailyPlannerTool,
);
router.post(
  "/habit-coach",
  authMiddleware,
  generateMiddleware,
  upload.none(),
  HabitCoachTool,
);
router.post(
  "/decision-maker",
  authMiddleware,
  generateMiddleware,
  upload.none(),
  DecisionMakerTool,
);

// ------------------ social media tools ------------------ //

router.post(
  "/thumbnail-generator",
  authMiddleware,
  generateMiddleware,
  upload.none(),
  generateThumbnailTool,
);
router.post(
  "/seo-optimization",
  authMiddleware,
  generateMiddleware,
  upload.none(),
  seoOptimizationTool,
);

router.post(
  "/script-generator",
  authMiddleware,
  generateMiddleware,
  upload.none(),
  scriptGenTool,
);

router.post(
  "/content-repurposer",
  authMiddleware,
  generateMiddleware,
  upload.none(),
  contentRepurposerTool,
);

// ------------------ web tools ------------------ //

router.post(
  "/landing-page-copy",
  authMiddleware,
  generateMiddleware,
  upload.none(),
  landingPageCopyTool,
);

router.post(
  "/repo-reviewer",
  authMiddleware,
  generateMiddleware,
  upload.none(),
  repoReviewTool,
);

router.post(
  "/seo-keyword-generator",
  authMiddleware,
  generateMiddleware,
  upload.none(),
  seoKeywordTool,
);

router.post(
  "/website-builder",
  authMiddleware,
  generateMiddleware,
  upload.none(),
  websiteBuilderTool,
);

module.exports = router;
