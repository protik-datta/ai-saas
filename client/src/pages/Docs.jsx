import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Zap,
  Key,
  Layers,
  ArrowRight,
  ChevronRight,
  Menu,
  X,
  Clock,
  CheckCircle,
} from "lucide-react";
import { assets } from "../assets/assets";
import {
  Badge,
  SectionTitle,
  SubTitle,
  Param,
} from "../helpers/docsHelper.jsx";
import Container from '../components/common/Container.jsx';

const CodeBlock = ({ children }) => (
  <pre className="mt-3 p-4 rounded-xl bg-[#1E1E2E] text-[#CDD6F4] text-[13px] leading-relaxed overflow-x-auto font-mono">
    <code>{children}</code>
  </pre>
);

const TOOL_IDS = [
  "ai-resume-analyzer",
  "ai-pdf-summarizer",
  "task-breakdown-ai",
  "ai-seo-keyword-generator",
  "ai-website-builder",
  "repo-review-ai",
  "landing-page-copy-generator",
  "business-idea-generator",
  "cold-email-writer",
  "pricing-strategy-tool",
  "competitor-analysis",
  "youtube-thumbnail-generator",
  "shorts-script-generator",
  "content-repurposer",
  "youtube-seo-optimizer",
  "ai-daily-planner",
  "ai-habit-coach",
  "ai-decision-maker",
];

const toTitle = (toolId) =>
  toolId
    ? toolId
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    : "";

const sections = [
  {
    id: "getting-started",
    label: "Getting Started",
    icon: Zap,
    subsections: [
      { id: "introduction", label: "Introduction" },
      { id: "quick-start", label: "Quick Start" },
    ],
  },
  {
    id: "tools",
    label: "AI Tools",
    icon: Layers,
    subsections: TOOL_IDS.map((id) => ({
      id: `tool-${id}`,
      label: toTitle(id),
    })),
  },
  {
    id: "api",
    label: "API Reference",
    icon: Key,
    subsections: [
      { id: "api-history-get", label: "GET /history" },
      { id: "api-history-delete-one", label: "DELETE /history/:id" },
      { id: "api-history-clear", label: "DELETE /history/clear" },
      { id: "api-history-tool", label: "DELETE /history/tool/:tool" },
    ],
  },
];

// ── SidebarContent — Docs এর বাইরে define ──────────────────────
const SidebarContent = ({
  activeSection,
  expandedGroup,
  setExpandedGroup,
  scrollTo,
}) => (
  <nav className="space-y-1">
    {sections.map((group) => {
      const Icon = group.icon;
      const isExpanded = expandedGroup === group.id;
      return (
        <div key={group.id}>
          <button
            onClick={() => setExpandedGroup(isExpanded ? null : group.id)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-[13px] font-semibold text-[#3B3B3B] hover:bg-[rgba(80,68,229,0.06)] transition-colors"
          >
            <div className="flex items-center gap-2">
              <Icon size={14} className="text-[#5044E5]" />
              {group.label}
            </div>
            <ChevronRight
              size={13}
              className={`text-[#AEAEAE] transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
            />
          </button>
          {isExpanded && (
            <div className="ml-5 mt-0.5 space-y-0.5 border-l border-[#EFEFEF] pl-3">
              {group.subsections.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => scrollTo(sub.id)}
                  className={`w-full text-left px-2 py-1.5 rounded-md text-[12px] transition-colors ${
                    activeSection === sub.id
                      ? "text-[#5044E5] font-medium bg-[rgba(80,68,229,0.07)]"
                      : "text-[#727272] hover:text-[#3B3B3B]"
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          )}
        </div>
      );
    })}
  </nav>
);

// ── Main Page ───────────────────────────────────────────────────
const Docs = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("introduction");
  const [expandedGroup, setExpandedGroup] = useState("getting-started");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-80px 0px -70% 0px" },
    );
    document.querySelectorAll("[id]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
      setMobileSidebarOpen(false);
    }
  };

  const sidebarProps = {
    activeSection,
    expandedGroup,
    setExpandedGroup,
    scrollTo,
  };

  return (
    <div
      className="min-h-screen py-20 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.3), rgba(255,255,255,0.3)), url(${assets.gradientBackground})`,
      }}
    >
      <Container>
        {/* Mobile Header */}
        <div className="lg:hidden sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-[#EFEFEF] px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen size={16} className="text-[#5044E5]" />
            <span className="text-[14px] font-semibold text-[#3B3B3B]">
              Documentation
            </span>
          </div>
          <button
            onClick={() => setMobileSidebarOpen((v) => !v)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100"
          >
            {mobileSidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile Sidebar */}
        {mobileSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-30 bg-black/20 backdrop-blur-sm">
            <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-2xl p-6 overflow-y-auto">
              <SidebarContent {...sidebarProps} />
            </div>
            <div
              className="absolute right-0 top-0 bottom-0 left-72"
              onClick={() => setMobileSidebarOpen(false)}
            />
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-8 xl:px-12 py-10">
          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-60 xl:w-64 shrink-0">
              <div className="sticky top-24 rounded-2xl bg-[rgba(253,253,254,0.80)] backdrop-blur-md shadow-[0_4px_30px_0_rgba(0,0,0,0.08)] p-4 max-h-[calc(100vh-6rem)] overflow-y-auto">
                <div className="flex items-center gap-2 mb-5 px-2">
                  <div className="w-7 h-7 rounded-lg bg-[#5044E5] flex items-center justify-center">
                    <BookOpen size={13} className="text-white" />
                  </div>
                  <span className="text-[14px] font-semibold text-[#3B3B3B]">
                    Docs
                  </span>
                </div>
                <SidebarContent {...sidebarProps} />
              </div>
            </aside>

            {/* Main Content */}
            <main
              ref={contentRef}
              className="flex-1 min-w-0 rounded-2xl bg-[rgba(253,253,254,0.80)] backdrop-blur-md shadow-[0_4px_30px_0_rgba(0,0,0,0.08)] p-7 sm:p-10"
            >
              {/* Introduction */}
              <SectionTitle id="introduction">Introduction</SectionTitle>
              <p className="text-[15px] text-[#727272] leading-relaxed">
                Welcome to the Quick.ai documentation. This guide covers
                everything you need to use CopyAI's AI-powered tools, understand
                the generation history system, and integrate with the backend
                API.
              </p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    icon: Zap,
                    title: "AI Tools",
                    desc: "From resume analysis to competitor research",
                  },
                  {
                    icon: Clock,
                    title: "History Tracking",
                    desc: "Every generation is saved and searchable",
                  },
                  {
                    icon: Key,
                    title: "REST API",
                    desc: "Full CRUD on your generation history",
                  },
                ].map(({ icon: Icon, title, desc }) => (
                  <div
                    key={title}
                    className="p-4 rounded-xl bg-[rgba(80,68,229,0.04)] border border-[#EEEDFE]"
                  >
                    <Icon size={18} className="text-[#5044E5] mb-2" />
                    <p className="text-[14px] font-semibold text-[#3B3B3B]">
                      {title}
                    </p>
                    <p className="text-[12px] text-[#9A9A9A] mt-0.5">{desc}</p>
                  </div>
                ))}
              </div>

              {/* Quick Start */}
              <SectionTitle id="quick-start">Quick Start</SectionTitle>
              <p className="text-[14px] text-[#727272] leading-relaxed mb-4">
                Get up and running in under 2 minutes:
              </p>
              {[
                {
                  step: "1",
                  title: "Choose a tool",
                  desc: "Navigate to any tool from the Tools section or the homepage.",
                },
                {
                  step: "2",
                  title: "Fill in the fields",
                  desc: "Each tool has 2–3 targeted input fields. The more context you give, the better the output.",
                },
                {
                  step: "3",
                  title: "Generate & copy",
                  desc: "Click Generate and wait a few seconds. Copy the result and use it directly.",
                },
              ].map(({ step, title, desc }) => (
                <div
                  key={step}
                  className="flex gap-4 mb-4 p-4 rounded-xl bg-[#F8F8FB]"
                >
                  <div className="w-7 h-7 shrink-0 rounded-full bg-[#5044E5] text-white text-[12px] font-bold flex items-center justify-center mt-0.5">
                    {step}
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-[#3B3B3B]">
                      {title}
                    </p>
                    <p className="text-[13px] text-[#727272] mt-1 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}

              {/* AI Tools */}
              <SectionTitle id="tools">AI Tools</SectionTitle>
              <p className="text-[14px] text-[#727272] leading-relaxed mb-6">
                Each tool has a unique route at{" "}
                <code className="text-[#5044E5] bg-[#EEEDFE] px-1.5 py-0.5 rounded text-[12px]">
                  /tool/:toolId
                </code>
                .
              </p>
              {TOOL_IDS.map((toolId) => (
                <div
                  key={toolId}
                  id={`tool-${toolId}`}
                  className="scroll-mt-24"
                >
                  <div className="flex items-center gap-3 mt-8 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#5044E5]/10 shrink-0">
                      <span className="text-[11px] font-bold text-[#5044E5]">
                        {toolId.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <h4 className="text-[16px] font-semibold text-[#3B3B3B]">
                      {toTitle(toolId)}
                    </h4>
                    <code className="ml-auto text-[11px] font-mono text-[#AEAEAE] bg-[#F5F5F5] px-2 py-0.5 rounded hidden sm:block">
                      /dashboard/tools/{toolId}
                    </code>
                  </div>
                  <button
                    onClick={() => navigate(`/dashboard/tools/${toolId}`)}
                    className="mt-1 flex items-center gap-1.5 text-[12px] text-[#5044E5] font-medium hover:underline"
                  >
                    Open {toTitle(toolId)} <ArrowRight size={12} />
                  </button>
                </div>
              ))}

              {/* API Reference */}
              <SectionTitle id="api">API Reference</SectionTitle>
              <p className="text-[14px] text-[#727272] leading-relaxed">
                All endpoints require authentication via{" "}
                <code className="text-[#5044E5] bg-[#EEEDFE] px-1.5 py-0.5 rounded text-[12px]">
                  req.userData
                </code>
                .
              </p>
              <CodeBlock>{`// Success\n{ "success": true, "data": [...], "pagination": { ... } }\n\n// Error\n{ "success": false, "message": "Error description" }`}</CodeBlock>

              <SubTitle id="api-history-get">GET /api/history</SubTitle>
              <p className="text-[13px] text-[#727272] mb-3">
                Returns paginated history for the authenticated user.
              </p>
              <div className="rounded-xl border border-[#EFEFEF] overflow-hidden mb-3">
                <div className="bg-[#F8F8FB] px-4 py-2.5 border-b border-[#EFEFEF]">
                  <p className="text-[11px] font-semibold text-[#AEAEAE] uppercase tracking-wider">
                    Query Parameters
                  </p>
                </div>
                <div className="divide-y divide-[#F0F0F0]">
                  <Param
                    name="page"
                    type="number"
                    required={false}
                    desc="Page number (default: 1)"
                  />
                  <Param
                    name="limit"
                    type="number"
                    required={false}
                    desc="Items per page (default: 20)"
                  />
                  <Param
                    name="tool"
                    type="string"
                    required={false}
                    desc="Filter by tool ID e.g. ai-resume-analyzer"
                  />
                </div>
              </div>
              <CodeBlock>{`// GET /api/history?page=1&limit=12&tool=ai-resume-analyzer\n{\n  "success": true,\n  "data": [...],\n  "pagination": { "total": 48, "page": 1, "limit": 12, "totalPages": 4 }\n}`}</CodeBlock>

              <SubTitle id="api-history-delete-one">
                DELETE /api/history/:historyId
              </SubTitle>
              <p className="text-[13px] text-[#727272] mb-3">
                Deletes a single item. Returns 404 if not found.
              </p>
              <CodeBlock>{`{ "success": true, "message": "History item deleted" }`}</CodeBlock>

              <SubTitle id="api-history-clear">
                DELETE /api/history/clear
              </SubTitle>
              <p className="text-[13px] text-[#727272] mb-3">
                Deletes all history for the authenticated user.
              </p>
              <CodeBlock>{`{ "success": true, "message": "Deleted 48 history items" }`}</CodeBlock>

              <SubTitle id="api-history-tool">
                DELETE /api/history/tool/:tool
              </SubTitle>
              <p className="text-[13px] text-[#727272] mb-3">
                Deletes all history for a specific tool.
              </p>
              <div className="rounded-xl border border-[#EFEFEF] overflow-hidden mb-3">
                <div className="bg-[#F8F8FB] px-4 py-2.5 border-b border-[#EFEFEF]">
                  <p className="text-[11px] font-semibold text-[#AEAEAE] uppercase tracking-wider">
                    URL Parameters
                  </p>
                </div>
                <Param
                  name="tool"
                  type="string"
                  required={true}
                  desc="Tool ID e.g. ai-resume-analyzer"
                />
              </div>
              <CodeBlock>{`{ "success": true, "message": "Deleted 12 history item(s) for ai-resume-analyzer" }`}</CodeBlock>

              {/* Error Codes */}
              <SectionTitle id="errors">Error Codes</SectionTitle>
              <div className="rounded-xl border border-[#EFEFEF] overflow-hidden">
                {[
                  {
                    code: "400",
                    color: "yellow",
                    desc: "Bad request — missing or invalid parameters",
                  },
                  {
                    code: "401",
                    color: "red",
                    desc: "Unauthorized — user is not authenticated",
                  },
                  {
                    code: "404",
                    color: "yellow",
                    desc: "Not found — resource does not exist",
                  },
                  { code: "500", color: "red", desc: "Internal server error" },
                ].map(({ code, color, desc }) => (
                  <div
                    key={code}
                    className="flex items-start gap-4 px-4 py-3 border-b border-[#F0F0F0] last:border-0"
                  >
                    <Badge color={color}>{code}</Badge>
                    <p className="text-[13px] text-[#727272]">{desc}</p>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-12 p-5 rounded-xl bg-[rgba(80,68,229,0.04)] border border-[#EEEDFE] flex gap-3">
                <CheckCircle
                  size={18}
                  className="text-[#5044E5] shrink-0 mt-0.5"
                />
                <div>
                  <p className="text-[14px] font-semibold text-[#3B3B3B]">
                    That's everything!
                  </p>
                  <p className="text-[13px] text-[#727272] mt-1 leading-relaxed">
                    Questions?{" "}
                    <a href="#" className="text-[#5044E5] hover:underline">
                      support@copyai.com
                    </a>
                  </p>
                </div>
              </div>
            </main>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Docs;
