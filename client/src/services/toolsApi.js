import { axiosInstance } from "../lib/axios";
import { showError } from "../utils/toast";

// life optimization
export const dailyPlanner = async (payload) => {
  try {
    const res = await axiosInstance.post("/ai/daily-planner", payload);
    return res.data;
  } catch (error) {
    showError(error.response?.data?.message || "Failed to generate daily plan");
    throw error;
  }
};

export const habitCoach = async (payload) => {
  try {
    const res = await axiosInstance.post("/ai/habit-coach", payload);
    return res.data;
  } catch (error) {
    showError(error.response?.data?.message || "Failed to generate habit plan");
    throw error;
  }
};

export const decisionMaker = async (payload) => {
  try {
    const res = await axiosInstance.post("/ai/decision-maker", payload);
    return res.data;
  } catch (error) {
    showError(error.response?.data?.message || "Failed to analyze decision");
    throw error;
  }
};

// productivity
export const resumeAnalyzer = async (payload) => {
  try {
    const res = await axiosInstance.post("/ai/resume-analyzer", payload);
    return res.data;
  } catch (error) {
    showError(error.response?.data?.message || "Failed to analyze resume");
    throw error;
  }
};

export const pdfSummarizer = async (payload) => {
  try {
    const res = await axiosInstance.post("/ai/pdf-summarizer", payload);
    return res.data;
  } catch (error) {
    showError(error.response?.data?.message || "Failed to summarize PDF");
    throw error;
  }
};

export const taskBreakdown = async (payload) => {
  try {
    const res = await axiosInstance.post("/ai/task-breakdown", payload);
    return res.data;
  } catch (error) {
    showError(
      error.response?.data?.message || "Failed to generate task breakdown",
    );
    throw error;
  }
};

// social media
export const thumbnailGenerator = async (payload) => {
  try {
    const res = await axiosInstance.post("/ai/thumbnail-generator", payload);
    return res.data;
  } catch (error) {
    showError(error.response?.data?.message || "Failed to generate thumbnail");
    throw error;
  }
};

export const seoOptimization = async (payload) => {
  try {
    const res = await axiosInstance.post("/ai/seo-optimization", payload);
    return res.data;
  } catch (error) {
    showError(
      error.response?.data?.message || "Failed to optimize SEO metadata",
    );
    throw error;
  }
};

export const scriptGenerator = async (payload) => {
  try {
    const res = await axiosInstance.post("/ai/script-generator", payload);
    return res.data;
  } catch (error) {
    showError(error.response?.data?.message || "Failed to generate script");
    throw error;
  }
};

export const contentRepurposer = async (payload) => {
  try {
    const res = await axiosInstance.post("/ai/content-repurposer", payload);
    return res.data;
  } catch (error) {
    showError(error.response?.data?.message || "Failed to repurpose content");
    throw error;
  }
};

// web tools
export const landingPageCopy = async (payload) => {
  try {
    const res = await axiosInstance.post("/ai/landing-page-copy", payload);
    return res.data;
  } catch (error) {
    showError(
      error.response?.data?.message || "Failed to generate landing page copy",
    );
    throw error;
  }
};

export const repoReviewer = async (payload) => {
  try {
    const res = await axiosInstance.post("/ai/repo-reviewer", payload);
    return res.data;
  } catch (error) {
    showError(error.response?.data?.message || "Failed to review repository");
    throw error;
  }
};

export const seoKeywordGenerator = async (payload) => {
  try {
    const res = await axiosInstance.post("/ai/seo-keyword-generator", payload);
    return res.data;
  } catch (error) {
    showError(error.response?.data?.message || "Failed to generate keywords");
    throw error;
  }
};

export const websiteBuilder = async (payload) => {
  try {
    const res = await axiosInstance.post("/ai/website-builder", payload);
    return res.data;
  } catch (error) {
    showError(error.response?.data?.message || "Failed to generate website");
    throw error;
  }
};

// business
export const competitorAnalysis = async (payload) => {
  try {
    const res = await axiosInstance.post("/ai/competitor-analysis", payload);
    return res.data;
  } catch (error) {
    showError(error.response?.data?.message || "Failed to analyze competitors");
    throw error;
  }
};

export const pricingStrategy = async (payload) => {
  try {
    const res = await axiosInstance.post("/ai/pricing-strategy", payload);
    return res.data;
  } catch (error) {
    showError(
      error.response?.data?.message || "Failed to generate pricing strategy",
    );
    throw error;
  }
};

export const emailWriter = async (payload) => {
  try {
    const res = await axiosInstance.post("/ai/email-writer", payload);
    return res.data;
  } catch (error) {
    showError(error.response?.data?.message || "Failed to generate email");
    throw error;
  }
};

export const businessIdea = async (payload) => {
  try {
    const res = await axiosInstance.post("/ai/business-idea", payload);
    return res.data;
  } catch (error) {
    showError(
      error.response?.data?.message || "Failed to generate business ideas",
    );
    throw error;
  }
};

// history
export const getHistory = async (params = {}) => {
  try {
    const res = await axiosInstance.get("/auth/history", { params });
    return res.data;
  } catch (error) {
    showError(error.response?.data?.message || "Failed to fetch history");
    throw error;
  }
};

export const deleteHistoryItem = async (historyId) => {
  try {
    const res = await axiosInstance.delete(`/auth/history/${historyId}`);
    return res.data;
  } catch (error) {
    showError(error.response?.data?.message || "Failed to delete item");
    throw error;
  }
};

export const clearAllHistory = async () => {
  try {
    const res = await axiosInstance.delete("/auth/history");
    return res.data;
  } catch (error) {
    showError(error.response?.data?.message || "Failed to clear history");
    throw error;
  }
};

export const deleteHistoryByTool = async (tool) => {
  try {
    const res = await axiosInstance.delete(`/auth/history/tool/${tool}`);
    return res.data;
  } catch (error) {
    showError(error.response?.data?.message || "Failed to delete tool history");
    throw error;
  }
};
