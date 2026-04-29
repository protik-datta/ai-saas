import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitBranch, Sparkles, Shield, AlertTriangle, CheckCircle2, XCircle, Code2, Bug, Zap, RefreshCw, ChevronDown, ChevronUp, Info, Terminal, Copy, Check } from "lucide-react";

import Loader from "../../../utils/Loader";
const severityConfig = {
  Critical: {
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
    icon: XCircle,
    iconColor: "text-red-600",
    badge: "bg-red-100 text-red-700",
  },
  Warning: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    icon: AlertTriangle,
    iconColor: "text-amber-500",
    badge: "bg-amber-100 text-amber-700",
  },
  Info: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    icon: Info,
    iconColor: "text-blue-500",
    badge: "bg-blue-100 text-blue-700",
  },
  Suggestion: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    icon: CheckCircle2,
    iconColor: "text-emerald-500",
    badge: "bg-emerald-100 text-emerald-700",
  },
};

const ReviewItem = ({ item, index }) => {
  const [open, setOpen] = useState(index < 2);
  const cfg = severityConfig[item.severity] || severityConfig.Info;
  const Icon = cfg.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className={`rounded-xl border ${cfg.border} overflow-hidden`}
    >
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-start gap-3 px-4 py-3.5 ${cfg.bg} text-left transition-colors hover:opacity-90`}
      >
        <Icon size={15} className={`${cfg.iconColor} shrink-0 mt-0.5`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-sm font-semibold ${cfg.text}`}>
              {item.issue}
            </span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${cfg.badge}`}
            >
              {item.severity}
            </span>
            {item.line && (
              <span className="text-[10px] text-gray-400 font-mono bg-white/60 px-2 py-0.5 rounded-md">
                Line {item.line}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-600 mt-0.5">{item.file}</p>
        </div>
        {open ? (
          <ChevronUp size={14} className="text-gray-400 shrink-0 mt-0.5" />
        ) : (
          <ChevronDown size={14} className="text-gray-400 shrink-0 mt-0.5" />
        )}
      </button>
      {open && (
        <div className="px-4 py-3 bg-white border-t border-gray-100 space-y-3">
          <p className="text-xs text-gray-700 leading-relaxed">
            {item.description}
          </p>
          {item.fix && (
            <div className="bg-gray-900 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2 border-b border-gray-700">
                <span className="text-[10px] text-gray-400 font-mono">
                  Suggested Fix
                </span>
                <button
                  onClick={() => navigator.clipboard.writeText(item.fix)}
                  className="text-[10px] text-gray-400 hover:text-gray-200 flex items-center gap-1 transition-colors"
                >
                  <Copy size={10} /> Copy
                </button>
              </div>
              <pre className="px-3 py-2.5 text-[11px] text-emerald-400 font-mono leading-relaxed overflow-auto">
                {item.fix}
              </pre>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

const ScoreMeter = ({ label, score, color }) => (
  <div>
    <div className="flex justify-between mb-1.5">
      <span className="text-xs text-gray-500">{label}</span>
      <span className="text-xs font-bold text-gray-700">{score}/10</span>
    </div>
    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={{ width: `${score * 10}%` }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
    </div>
  </div>
);

const focuses = [
  "Security",
  "Performance",
  "Clean Code",
  "Bugs",
  "Architecture",
  "Logic",
];

import { useRepoReviewer } from "../../../hooks/toolsApi.hook";

export default function AIRepoRev() {
  const [repoUrl, setRepoUrl] = useState("");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [language, setLanguage] = useState("TypeScript");
  const [reviewFocus, setReviewFocus] = useState([]);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  const toggleFocus = (f) => {
    setReviewFocus((prev) =>
      prev.includes(f) ? prev.filter((item) => item !== f) : [...prev, f],
    );
  };

  const { mutate: reviewRepo, isPending, isError } = useRepoReviewer();

  const handleReview = () => {
    if (!codeSnippet && !repoUrl) return;
    setResult(null);

    reviewRepo(
      { repoUrl, codeSnippet, language, reviewFocus },
      {
        onSuccess: (res) => {
          const data = res?.data || res;
          if (data) {
            setResult(data);
          }
        },
        onError: () => {},
      },
    );
  };

  const filteredIssues =
    result?.issues?.filter(
      (i) => activeTab === "all" || i.severity.toLowerCase() === activeTab,
    ) || [];

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-gray-900 flex items-center justify-center">
              <GitBranch size={16} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              Repo Reviewer AI
            </h1>
          </div>
          <p className="text-sm text-gray-500 ml-10">
            Automated code reviews — security, performance, anti-patterns
            flagged instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Input */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">
                Code Review Setup
              </label>

              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">
                  GitHub Repo URL{" "}
                  <span className="text-gray-300">(optional)</span>
                </label>
                <div className="relative">
                  <GitBranch
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    placeholder="https://github.com/user/repo"
                    className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-50 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">
                  Paste Code <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute top-0 left-0 right-0 flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-t-xl border border-b-0 border-gray-200">
                    <Terminal size={12} className="text-gray-400" />
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="text-[11px] text-gray-500 bg-transparent border-0 focus:outline-none"
                    >
                      {[
                        "TypeScript",
                        "JavaScript",
                        "Python",
                        "Go",
                        "Rust",
                        "Java",
                      ].map((l) => (
                        <option key={l}>{l}</option>
                      ))}
                    </select>
                  </div>
                  <textarea
                    value={codeSnippet}
                    onChange={(e) => setCodeSnippet(e.target.value)}
                    placeholder={`// Paste your ${language} code here for review...`}
                    rows={8}
                    className="w-full px-3.5 pt-10 pb-3 rounded-xl border border-gray-200 text-xs text-gray-800 placeholder:text-gray-300 font-mono focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-50 transition-all resize-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-2 block">
                  Review Focus
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {focuses.map((f) => (
                    <button
                      key={f}
                      onClick={() => toggleFocus(f)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${reviewFocus.includes(f) ? "bg-gray-900 text-white border-gray-900" : "bg-gray-50 text-gray-600 border-gray-100 hover:border-gray-300"}`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleReview}
                disabled={(!codeSnippet && !repoUrl) || isPending}
                className="w-full py-3 rounded-xl bg-gray-900 text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                {isPending ? (
                  <>
                    <Loader size="sm" />
                    Reviewing Code...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Start Review
                  </>
                )}
              </motion.button>
            </div>
          </div>

          {/* Output */}
          <div className="lg:col-span-3 space-y-4">
            <AnimatePresence mode="wait">
              {!result && !isPending && !isError && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center justify-center text-center min-h-120"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
                    <Shield size={28} className="text-gray-300" />
                  </div>
                  <p className="text-sm font-semibold text-gray-400">
                    Review results will appear here
                  </p>
                  <p className="text-xs text-gray-300 mt-1">
                    Paste code or add a GitHub URL and click Start Review
                  </p>
                </motion.div>
              )}

              {isPending && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center justify-center min-h-120"
                >
                  <div className="relative w-16 h-16 mb-4">
                    <div className="absolute inset-0 rounded-full border-4 border-gray-100" />
                    <div className="absolute inset-0 rounded-full border-4 border-gray-900 border-t-transparent animate-spin" />
                    <Code2
                      size={18}
                      className="absolute inset-0 m-auto text-gray-700"
                    />
                  </div>
                  <p className="text-sm font-semibold text-gray-600">
                    Analyzing code patterns...
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Checking security, performance & quality
                  </p>
                </motion.div>
              )}

              {isError && !isPending && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl border border-red-50 shadow-sm p-8 flex flex-col items-center justify-center text-center min-h-120"
                >
                  <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
                    <RefreshCw size={28} className="text-red-400" />
                  </div>
                  <p className="text-sm font-semibold text-gray-800">
                    Failed to perform code review
                  </p>
                  <button
                    onClick={handleReview}
                    className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-xl text-xs font-bold"
                  >
                    Try Again
                  </button>
                </motion.div>
              )}
              {result && !isPending && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {/* Score Overview */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-xs text-gray-400 mb-0.5">
                          Overall Score
                        </p>
                        <div
                          className={`text-3xl font-black ${result.overallScore >= 75 ? "text-emerald-600" : result.overallScore >= 50 ? "text-amber-500" : "text-red-500"}`}
                        >
                          {result.overallScore}
                          <span className="text-base font-normal text-gray-400">
                            /100
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {Object.entries(result.issueCount).map(
                          ([sev, count]) => {
                            const colors = {
                              critical: "bg-red-100 text-red-700",
                              warning: "bg-amber-100 text-amber-700",
                              info: "bg-blue-100 text-blue-700",
                              suggestion: "bg-emerald-100 text-emerald-700",
                            };
                            return count > 0 ? (
                              <div
                                key={sev}
                                className={`flex flex-col items-center px-2.5 py-2 rounded-xl ${colors[sev]}`}
                              >
                                <span className="text-base font-black">
                                  {count}
                                </span>
                                <span className="text-[9px] font-bold capitalize">
                                  {sev}
                                </span>
                              </div>
                            ) : null;
                          },
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed mb-4 p-3 bg-gray-50 rounded-xl">
                      {result.summary}
                    </p>
                    <div className="space-y-2.5">
                      <ScoreMeter
                        label="Security"
                        score={result.scores.security}
                        color="#ef4444"
                      />
                      <ScoreMeter
                        label="Performance"
                        score={result.scores.performance}
                        color="#f59e0b"
                      />
                      <ScoreMeter
                        label="Code Quality"
                        score={result.scores.codeQuality}
                        color="#3b82f6"
                      />
                      <ScoreMeter
                        label="Maintainability"
                        score={result.scores.maintainability}
                        color="#10b981"
                      />
                    </div>
                  </div>

                  {/* Issues */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Bug size={15} className="text-gray-500" />
                        <span className="text-sm font-bold text-gray-800">
                          Issues Found
                        </span>
                      </div>
                      <div className="flex gap-1 p-1 bg-gray-50 rounded-xl">
                        {[
                          "all",
                          "critical",
                          "warning",
                          "info",
                          "suggestion",
                        ].map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium capitalize transition-all ${activeTab === tab ? "bg-white text-gray-800 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      {filteredIssues.map((issue, i) => (
                        <ReviewItem key={i} item={issue} index={i} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
