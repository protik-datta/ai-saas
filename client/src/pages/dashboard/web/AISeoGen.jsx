import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, TrendingUp, Target, FileText, Link2, Tag, ChevronDown, ChevronUp, Copy, Check, BarChart2, Lightbulb, ArrowRight, RefreshCw } from "lucide-react";

import Loader from "../../../utils/Loader";
const intentColors = {
  Informational: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-100",
    dot: "bg-blue-500",
  },
  Transactional: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-100",
    dot: "bg-emerald-500",
  },
  Navigational: {
    bg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-100",
    dot: "bg-purple-500",
  },
  Commercial: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-100",
    dot: "bg-amber-500",
  },
};

const CopyBtn = ({ text }) => {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
    >
      {copied ? (
        <>
          <Check size={11} className="text-emerald-500" />
          <span className="text-emerald-500">Copied</span>
        </>
      ) : (
        <>
          <Copy size={11} />
          Copy
        </>
      )}
    </button>
  );
};

const ClusterCard = ({ cluster, index }) => {
  const [open, setOpen] = useState(index === 0);
  const intent = intentColors[cluster.intent] || intentColors.Informational;
  const allKeywords = [
    cluster.primaryKeyword,
    ...(cluster.longTailVariants || []),
  ].join(", ");
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors text-left"
      >
        <div className={`w-2 h-2 rounded-full ${intent.dot} shrink-0`} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-gray-800 truncate">
            {cluster.primaryKeyword}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            {cluster.longTailVariants?.length || 0} long-tail variants
          </p>
        </div>
        <span
          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border ${intent.bg} ${intent.text} ${intent.border} shrink-0`}
        >
          {cluster.intent}
        </span>
        <CopyBtn text={allKeywords} />
        {open ? (
          <ChevronUp size={14} className="text-gray-400 shrink-0" />
        ) : (
          <ChevronDown size={14} className="text-gray-400 shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-gray-50 space-y-4">
          <div className="pt-4">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
              Long-tail Variants
            </p>
            <div className="flex flex-wrap gap-2">
              {cluster.longTailVariants?.map((kw, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 bg-gray-50 text-gray-600 text-xs rounded-xl border border-gray-100"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
              Content Title Ideas
            </p>
            <div className="space-y-1.5">
              {cluster.contentTitles?.map((title, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 py-1.5 border-b border-gray-50 last:border-0"
                >
                  <FileText
                    size={12}
                    className="text-violet-400 mt-0.5 shrink-0"
                  />
                  <span className="text-xs text-gray-700">{title}</span>
                </div>
              ))}
            </div>
          </div>
          {cluster.internalLinkingSuggestion && (
            <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-xl">
              <Link2 size={13} className="text-blue-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-[11px] font-bold text-blue-600 mb-0.5">
                  Internal Linking Opportunity
                </p>
                <p className="text-xs text-blue-700">
                  {cluster.internalLinkingSuggestion}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

import { useSeoKeywordGenerator } from "../../../hooks/toolsApi.hook";

export default function AISeoGen() {
  const [topic, setTopic] = useState("");
  const [niche, setNiche] = useState("");
  const [result, setResult] = useState(null);

  const { mutate: generateKeywords, isPending, isError } = useSeoKeywordGenerator();

  const handleGenerate = () => {
    if (!topic) return;
    setResult(null);

    generateKeywords(
      { topic, niche },
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

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-violet-50 flex items-center justify-center">
              <Search size={16} className="text-violet-600" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              AI SEO Keyword Generator
            </h1>
          </div>
          <p className="text-sm text-gray-500 ml-10">
            Find keywords your competitors are missing — clustered by search
            intent with content ideas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Input */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">
                Keyword Research
              </label>
              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">
                  Core Topic <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                  placeholder="e.g. content marketing, MERN stack, yoga for beginners"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-50 transition-all"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">
                  Niche / Industry{" "}
                  <span className="text-gray-300">(optional)</span>
                </label>
                <input
                  type="text"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  placeholder="e.g. SaaS, e-commerce, health & wellness"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-50 transition-all"
                />
              </div>

              <div className="p-3 bg-gray-50 rounded-xl space-y-2">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  What you'll get
                </p>
                {[
                  "5 keyword clusters by search intent",
                  "Long-tail variants for each cluster",
                  "Content title ideas ready to use",
                  "Internal linking suggestions",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-violet-400 shrink-0" />
                    <span className="text-xs text-gray-600">{item}</span>
                  </div>
                ))}
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleGenerate}
                disabled={!topic || isPending}
                className="w-full py-3 rounded-xl bg-violet-600 text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                {isPending ? (
                  <>
                    <Loader size="sm" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Generate Keywords
                  </>
                )}
              </motion.button>
            </div>

            {/* Intent Legend */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">
                Intent Legend
              </p>
              <div className="space-y-2">
                {Object.entries(intentColors).map(([intent, cfg]) => (
                  <div key={intent} className="flex items-center gap-2.5">
                    <div
                      className={`w-2 h-2 rounded-full ${cfg.dot} shrink-0`}
                    />
                    <span className="text-xs font-semibold text-gray-700 w-24">
                      {intent}
                    </span>
                    <span className="text-xs text-gray-400">
                      {intent === "Informational"
                        ? "How/What/Why questions"
                        : intent === "Transactional"
                          ? "Buy/Hire/Get keywords"
                          : intent === "Navigational"
                            ? "Brand + examples searches"
                            : "Best/Top/Compare keywords"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Output */}
          <div className="lg:col-span-3 space-y-4 mb-30">
            <AnimatePresence mode="wait">
              {!result && !isPending && !isError && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center justify-center text-center min-h-105"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
                    <BarChart2 size={28} className="text-gray-300" />
                  </div>
                  <p className="text-sm font-semibold text-gray-400">
                    Keyword clusters will appear here
                  </p>
                  <p className="text-xs text-gray-300 mt-1">
                    Enter a topic and click Generate
                  </p>
                </motion.div>
              )}

              {isPending && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center justify-center min-h-105"
                >
                  <div className="relative w-16 h-16 mb-4">
                    <div className="absolute inset-0 rounded-full border-4 border-violet-100" />
                    <div className="absolute inset-0 rounded-full border-4 border-violet-500 border-t-transparent animate-spin" />
                    <Search
                      size={18}
                      className="absolute inset-0 m-auto text-violet-500"
                    />
                  </div>
                  <p className="text-sm font-semibold text-gray-600">
                    Clustering keywords by intent...
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Analyzing search patterns
                  </p>
                </motion.div>
              )}

              {isError && !isPending && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl border border-red-50 shadow-sm p-8 flex flex-col items-center justify-center text-center min-h-105"
                >
                  <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
                    <RefreshCw size={28} className="text-red-400" />
                  </div>
                  <p className="text-sm font-semibold text-gray-800">
                    Failed to generate keywords
                  </p>
                  <button
                    onClick={handleGenerate}
                    className="mt-4 px-4 py-2 bg-violet-600 text-white rounded-xl text-xs font-bold"
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
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <TrendingUp size={15} className="text-violet-500" />
                        <span className="text-sm font-bold text-gray-800">
                          "{topic}"
                        </span>
                      </div>
                      <span className="text-xs bg-violet-50 text-violet-700 px-2.5 py-1 rounded-full font-semibold border border-violet-100">
                        {result.totalKeywords} keywords
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {result.topicOverview}
                    </p>
                  </div>
                  {result.clusters?.map((cluster, i) => (
                    <ClusterCard key={i} cluster={cluster} index={i} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
