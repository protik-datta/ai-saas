import React from "react";
import Container from "../common/Container";
import {
  CalendarDays,
  Target,
  GitBranch,
  FileSearch,
  FileText,
  ListChecks,
  Image,
  TrendingUp,
  Film,
  RefreshCw,
  SquarePen,
  Code2,
  Hash,
  Globe,
  BarChart2,
  Tag,
  Mail,
  Lightbulb,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ToolPage = () => {
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  const aiTools = [
    {
      id: "daily-planner",
      title: "Daily Planner",
      description:
        "Organize your day with AI-generated schedules tailored to your goals, energy levels, and priorities for maximum productivity.",
      icon: CalendarDays,
      bg: { from: "#3588F2", to: "#0BB0D7" },
    },
    {
      id: "habit-coach",
      title: "Habit Coach",
      description:
        "Build lasting habits with personalized coaching plans, accountability strategies, and science-backed routines designed for your lifestyle.",
      icon: Target,
      bg: { from: "#10B981", to: "#06B6D4" },
    },
    {
      id: "decision-maker",
      title: "Decision Maker",
      description:
        "Make confident decisions faster with AI-powered pros and cons analysis, risk assessment, and structured thinking frameworks.",
      icon: GitBranch,
      bg: { from: "#F59E0B", to: "#EF4444" },
    },
    {
      id: "resume-analyzer",
      title: "Resume Analyzer",
      description:
        "Get instant feedback on your resume with ATS optimization tips, keyword suggestions, and actionable improvements to land more interviews.",
      icon: FileSearch,
      bg: { from: "#B153EA", to: "#E549A3" },
    },
    {
      id: "pdf-summarizer",
      title: "PDF Summarizer",
      description:
        "Upload any PDF and get a concise, structured summary in seconds — perfect for research papers, reports, and lengthy documents.",
      icon: FileText,
      bg: { from: "#6366F1", to: "#8B5CF6" },
    },
    {
      id: "task-breakdown",
      title: "Task Breakdown",
      description:
        "Turn overwhelming projects into clear, actionable steps with AI-powered task decomposition and milestone planning.",
      icon: ListChecks,
      bg: { from: "#F43F5E", to: "#F97316" },
    },
    {
      id: "thumbnail-generator",
      title: "Thumbnail Generator",
      description:
        "Generate eye-catching YouTube thumbnail ideas and copy concepts that boost click-through rates and grow your channel faster.",
      icon: Image,
      bg: { from: "#3588F2", to: "#6366F1" },
    },
    {
      id: "seo-optimization",
      title: "SEO Optimization",
      description:
        "Optimize your content for search engines with AI-driven suggestions for meta tags, structure, readability, and ranking factors.",
      icon: TrendingUp,
      bg: { from: "#10B981", to: "#3588F2" },
    },
    {
      id: "script-generator",
      title: "Script Generator",
      description:
        "Write compelling video scripts for YouTube, TikTok, and Reels with hooks, storytelling arcs, and strong calls to action.",
      icon: Film,
      bg: { from: "#F59E0B", to: "#B153EA" },
    },
    {
      id: "content-repurposer",
      title: "Content Repurposer",
      description:
        "Transform one piece of content into multiple formats — blog to tweet thread, podcast to newsletter, video to LinkedIn post.",
      icon: RefreshCw,
      bg: { from: "#E549A3", to: "#F43F5E" },
    },
    {
      id: "landing-page-copy",
      title: "Landing Page Copy",
      description:
        "Generate high-converting landing pages in seconds with AI-driven copy that captures attention, communicates value, and boosts conversions.",
      icon: SquarePen,
      bg: { from: "#8B5CF6", to: "#3588F2" },
    },
    {
      id: "repo-reviewer",
      title: "Repo Reviewer",
      description:
        "Get an instant code review of your GitHub repository with AI-powered feedback on structure, best practices, and improvements.",
      icon: Code2,
      bg: { from: "#0BB0D7", to: "#10B981" },
    },
    {
      id: "seo-keyword-generator",
      title: "SEO Keyword Generator",
      description:
        "Discover high-traffic, low-competition keywords tailored to your niche to drive organic growth and outrank your competitors.",
      icon: Hash,
      bg: { from: "#F43F5E", to: "#B153EA" },
    },
    {
      id: "website-builder",
      title: "Website Builder Copy",
      description:
        "Generate complete website copy — from hero to footer — that communicates your brand story and converts visitors into customers.",
      icon: Globe,
      bg: { from: "#6366F1", to: "#10B981" },
    },
    {
      id: "competitor-analysis",
      title: "Competitor Analysis",
      description:
        "Analyze your competitors' strengths, weaknesses, and positioning with structured AI insights to sharpen your market strategy.",
      icon: BarChart2,
      bg: { from: "#F59E0B", to: "#F43F5E" },
    },
    {
      id: "pricing-strategy",
      title: "Pricing Strategy",
      description:
        "Find the perfect pricing model for your product or service with AI-backed analysis of your market, value, and competition.",
      icon: Tag,
      bg: { from: "#B153EA", to: "#6366F1" },
    },
    {
      id: "email-writer",
      title: "Email Writer",
      description:
        "Write engaging email campaigns, newsletters, and cold outreach sequences that connect with your audience and improve open rates.",
      icon: Mail,
      bg: { from: "#3588F2", to: "#F59E0B" },
    },
    {
      id: "business-idea",
      title: "Business Idea Generator",
      description:
        "Generate validated business ideas tailored to your skills and interests with market size estimates, and first steps to launch.",
      icon: Lightbulb,
      bg: { from: "#10B981", to: "#F59E0B" },
    },
  ];

  const visibleTools = showAll ? aiTools : aiTools.slice(0, 6);

  return (
    <Container>
      <section className="py-14 sm:py-16 md:py-10" id='tools'>
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto px-2">
          <h1 className="text-3xl sm:text-4xl md:text-[42px] font-semibold text-[#3B3B3B] leading-tight">
            Powerful <span className="text-[#5044E5]">AI Tools</span> to
            Supercharge Your Content
          </h1>

          <p className="mt-4 text-gray-600 text-base sm:text-lg leading-relaxed">
            From landing pages to social posts, create high-converting content
            faster with intelligent AI tools designed to save time and boost
            your marketing results.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 mt-12">
          {visibleTools.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="group p-6 sm:p-7 md:p-8 rounded-xl bg-[rgba(253,253,254,0.60)] backdrop-blur-md shadow-[0_4px_30px_0_rgba(0,0,0,0.10)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Icon */}
                <div
                  className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl text-white mb-4 sm:mb-5"
                  style={{
                    background: `linear-gradient(135deg, ${item.bg.from}, ${item.bg.to})`,
                  }}
                >
                  <Icon size={20} />
                </div>

                {/* Title */}
                <h3 className="text-[18px] font-semibold text-[#3E3E3E] leading-snug mb-2">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-[#9A9A9A] text-[14px] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Show More / Show Less Button */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="px-8 py-3 rounded-lg border border-[#5044E5] text-[#5044E5] text-[14px] font-medium
              hover:bg-[#5044E5] hover:text-white transition-all duration-200 active:scale-95"
          >
            {showAll ? "Show Less" : `Show More (${aiTools.length - 6} more)`}
          </button>
        </div>
      </section>
    </Container>
  );
};

export default ToolPage;
