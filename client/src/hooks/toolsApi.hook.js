import { useMutation } from "@tanstack/react-query";
import {
  businessIdea,
  competitorAnalysis,
  contentRepurposer,
  dailyPlanner,
  decisionMaker,
  emailWriter,
  habitCoach,
  landingPageCopy,
  pdfSummarizer,
  pricingStrategy,
  repoReviewer,
  resumeAnalyzer,
  scriptGenerator,
  seoKeywordGenerator,
  seoOptimization,
  taskBreakdown,
  thumbnailGenerator,
  websiteBuilder,
} from "../services/toolsApi.js";

// LIFE OPTIMIZATION

export const useDailyPlanner = () => {
  return useMutation({
    mutationFn: dailyPlanner,
  });
};

export const useHabitCoach = () => {
  return useMutation({
    mutationFn: habitCoach,
  });
};

export const useDecisionMaker = () => {
  return useMutation({
    mutationFn: decisionMaker,
  });
};

// PRODUCTIVITY

export const useResumeAnalyzer = () => {
  return useMutation({
    mutationFn: resumeAnalyzer,
  });
};

export const usePdfSummarizer = () => {
  return useMutation({
    mutationFn: pdfSummarizer,
  });
};

export const useTaskBreakdown = () => {
  return useMutation({
    mutationFn: taskBreakdown,
  });
};

// SOCIAL MEDIA

export const useThumbnailGenerator = () => {
  return useMutation({
    mutationFn: thumbnailGenerator,
  });
};

export const useSeoOptimization = () => {
  return useMutation({
    mutationFn: seoOptimization,
  });
};

export const useScriptGenerator = () => {
  return useMutation({
    mutationFn: scriptGenerator,
  });
};

export const useContentRepurposer = () => {
  return useMutation({
    mutationFn: contentRepurposer,
  });
};

// WEB TOOLS

export const useLandingPageCopy = () => {
  return useMutation({
    mutationFn: landingPageCopy,
  });
};

export const useRepoReviewer = () => {
  return useMutation({
    mutationFn: repoReviewer,
  });
};

export const useSeoKeywordGenerator = () => {
  return useMutation({
    mutationFn: seoKeywordGenerator,
  });
};

export const useWebsiteBuilder = () => {
  return useMutation({
    mutationFn: websiteBuilder,
  });
};

// BUSINESS TOOLS

export const useCompetitorAnalysis = () => {
  return useMutation({
    mutationFn: competitorAnalysis,
  });
};

export const usePricingStrategy = () => {
  return useMutation({
    mutationFn: pricingStrategy,
  });
};

export const useEmailWriter = () => {
  return useMutation({
    mutationFn: emailWriter,
  });
};

export const useBusinessIdea = () => {
  return useMutation({
    mutationFn: businessIdea,
  });
};
