import { lazy, Suspense } from "react";
import { Navigate, useParams } from "react-router-dom";
import { tools } from "../../lib/dashboardData";
import ErrorBoundary from "../../components/ErrorBoundary";

// Lazy-load every tool — each becomes its own chunk, loaded on demand
const toolComponentMap = {
  // productivity
  "ai-resume-analyzer": lazy(() => import("./productivity/AIResume")),
  "ai-pdf-summarizer": lazy(() => import("./productivity/AIPdf")),
  "task-breakdown-ai": lazy(() => import("./productivity/TaskBreakdown")),

  // web
  "ai-seo-keyword-generator": lazy(() => import("./web/AISeoGen")),
  "ai-website-builder": lazy(() => import("./web/AIWeb")),
  "repo-review-ai": lazy(() => import("./web/AIRepoRev")),
  "landing-page-copy-generator": lazy(() => import("./web/AILandingPageCopy")),

  // business
  "business-idea-generator": lazy(() => import("./business/BusinessIdea")),
  "cold-email-writer": lazy(() => import("./business/EmailWriter")),
  "pricing-strategy-tool": lazy(() => import("./business/AIPricing")),
  "competitor-analysis": lazy(() => import("./business/AICompetitor")),

  // social media
  "youtube-thumbnail-generator": lazy(() => import("./social/YTThumbnail")),
  "shorts-script-generator": lazy(() => import("./social/ScriptGen")),
  "content-repurposer": lazy(() => import("./social/ContentRepurser")),
  "youtube-seo-optimizer": lazy(() => import("./social/YTSeoOptimize")),

  // life optimization
  "ai-daily-planner": lazy(() => import("./lifeOptimization/AIDailyPlanner")),
  "ai-habit-coach": lazy(() => import("./lifeOptimization/AIHabitCoach")),
  "ai-decision-maker": lazy(
    () => import("./lifeOptimization/AIDecisionMaker"),
  ),
};

/** Skeleton shown while a tool chunk is loading */
const ToolSkeleton = () => (
  <div className="flex-1 overflow-y-auto bg-gray-50 min-h-screen">
    <div className="max-w-5xl mx-auto px-6 py-8 animate-pulse">
      <div className="h-8 w-48 bg-gray-200 rounded-xl mb-3" />
      <div className="h-4 w-72 bg-gray-100 rounded-lg mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
          <div className="h-3 w-24 bg-gray-100 rounded" />
          <div className="h-10 bg-gray-50 rounded-xl" />
          <div className="h-10 bg-gray-50 rounded-xl" />
          <div className="h-10 bg-gray-50 rounded-xl" />
          <div className="h-11 bg-gray-200 rounded-xl" />
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 min-h-96 flex items-center justify-center">
          <div className="h-16 w-16 bg-gray-100 rounded-2xl" />
        </div>
      </div>
    </div>
  </div>
);

const ToolPage = () => {
  const { slug } = useParams();

  const allTools = tools.flatMap((c) => c.tools);
  const toolData = allTools.find((t) => t.slug === slug);

  const ToolComponent = toolComponentMap[slug];

  if (!toolData || !ToolComponent) {
    return <Navigate to="*" replace />;
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={<ToolSkeleton />}>
        <ToolComponent toolData={toolData} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default ToolPage;
