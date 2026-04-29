import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Sparkles, Copy, Check, RefreshCw, Tag } from "lucide-react";

import Loader from "../../../utils/Loader";
import { useSeoOptimization } from "../../../hooks/toolsApi.hook";

export default function YTSeoOptimize() {
  const [topic, setTopic] = useState("");
  const [outline, setOutline] = useState("");
  const [result, setResult] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState(0);
  const [copied, setCopied] = useState(null);

  const { mutate: optimizeSeo, isPending, isError } = useSeoOptimization();

  const handleOptimize = () => {
    if (!topic) return;
    setResult(null);

    optimizeSeo(
      { topic, outline },
      {
        onSuccess: (res) => {
          const data = res?.data || res;
          if (data) {
            setResult(data);
            setSelectedTitle(0);
          }
        },
        onError: () => {},
      },
    );
  };

  const copyText = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const chaptersText =
    result?.chapters?.map((c) => `${c.time} ${c.title}`).join("\n") || "";
  const tagsText = result?.tags?.join(", ") || "";

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center">
              <TrendingUp size={16} className="text-red-600" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              YouTube SEO Optimizer
            </h1>
          </div>
          <p className="text-sm text-gray-500 ml-10">
            Rank higher before you hit upload
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Input */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">
                Video Details
              </label>

              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">
                  Video Topic or Draft Title{" "}
                  <span className="text-red-400">*</span>
                </label>
                <input
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. How to start a podcast in 2025..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-50 transition-all"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">
                  Video Outline{" "}
                  <span className="text-gray-300">
                    (optional — for chapter timestamps)
                  </span>
                </label>
                <textarea
                  value={outline}
                  onChange={(e) => setOutline(e.target.value)}
                  placeholder="Paste your content outline or key sections..."
                  rows={4}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-50 transition-all resize-none"
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleOptimize}
                disabled={!topic || isPending}
                className="w-full py-3 rounded-xl bg-red-600 text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                {isPending ? (
                  <>
                    <Loader size="sm" /> Optimizing...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} /> Optimize Metadata
                  </>
                )}
              </motion.button>
            </div>

            {result && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Quick Copy
                </p>
                <button
                  onClick={() =>
                    copyText(result.titles[selectedTitle]?.title, "title")
                  }
                  className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-all"
                >
                  {copied === "title" ? (
                    <Check size={14} />
                  ) : (
                    <Copy size={14} />
                  )}{" "}
                  Copy Selected Title
                </button>
                <button
                  onClick={() => copyText(result.description, "desc")}
                  className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-all"
                >
                  {copied === "desc" ? (
                    <Check size={14} className="text-emerald-500" />
                  ) : (
                    <Copy size={14} />
                  )}{" "}
                  Copy Description
                </button>
                <button
                  onClick={() => copyText(tagsText, "tags")}
                  className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-all"
                >
                  {copied === "tags" ? (
                    <Check size={14} className="text-emerald-500" />
                  ) : (
                    <Copy size={14} />
                  )}{" "}
                  Copy All Tags
                </button>
                <button
                  onClick={() => copyText(chaptersText, "chapters")}
                  className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-all"
                >
                  {copied === "chapters" ? (
                    <Check size={14} className="text-emerald-500" />
                  ) : (
                    <Copy size={14} />
                  )}{" "}
                  Copy Chapters
                </button>
                <button
                  onClick={handleOptimize}
                  className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-500 text-sm font-medium hover:bg-gray-50 transition-all"
                >
                  <RefreshCw size={14} /> Regenerate
                </button>
              </div>
            )}
          </div>

          {/* Output */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {!result && !isPending && !isError && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center justify-center text-center min-h-96"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
                    <TrendingUp size={28} className="text-gray-300" />
                  </div>
                  <p className="text-sm font-semibold text-gray-400">
                    Optimized metadata will appear here
                  </p>
                  <p className="text-xs text-gray-300 mt-1">
                    Title variants, description, tags & chapters
                  </p>
                </motion.div>
              )}

              {isPending && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center justify-center min-h-96"
                >
                  <div className="relative w-16 h-16 mb-4">
                    <div className="absolute inset-0 rounded-full border-4 border-red-100" />
                    <div className="absolute inset-0 rounded-full border-4 border-red-500 border-t-transparent animate-spin" />
                    <TrendingUp
                      size={18}
                      className="absolute inset-0 m-auto text-red-500"
                    />
                  </div>
                  <p className="text-sm font-semibold text-gray-600">
                    Analyzing search signals...
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Generating SEO-optimized metadata
                  </p>
                </motion.div>
              )}

              {isError && !isPending && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl border border-red-50 shadow-sm p-8 flex flex-col items-center justify-center text-center min-h-96"
                >
                  <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
                    <RefreshCw size={28} className="text-red-400" />
                  </div>
                  <p className="text-sm font-semibold text-gray-800">
                    Failed to optimize metadata
                  </p>
                  <button
                    onClick={handleOptimize}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold"
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
                  {/* Title Picker */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                      Title Variants — Pick One
                    </p>
                    <div className="space-y-2">
                      {result.titles?.map((t, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedTitle(i)}
                          className={`w-full flex items-start gap-3 p-3 rounded-xl border text-left transition-all ${selectedTitle === i ? "bg-red-50 border-red-200" : "bg-gray-50 border-gray-100 hover:border-gray-300"}`}
                        >
                          <div
                            className={`mt-0.5 w-5 h-5 shrink-0 rounded-full border-2 flex items-center justify-center ${selectedTitle === i ? "border-red-500 bg-red-500" : "border-gray-300"}`}
                          >
                            {selectedTitle === i && (
                              <div className="w-2 h-2 rounded-full bg-white" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">
                              {t.title}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              {t.reason}
                            </p>
                          </div>
                          <span
                            className={`shrink-0 text-xs font-bold px-2 py-0.5 rounded-full ${t.score >= 85 ? "bg-emerald-50 text-emerald-600" : t.score >= 75 ? "bg-amber-50 text-amber-600" : "bg-gray-50 text-gray-500"}`}
                          >
                            {t.score}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                        Description
                      </p>
                    </div>
                    <pre className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap font-sans max-h-40 overflow-y-auto">
                      {result.description}
                    </pre>
                  </div>

                  {/* Tags + Chapters */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                        Tags ({result.tags?.length})
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {result.tags?.map((tag, i) => (
                          <span
                            key={i}
                            className="text-[10px] px-2 py-1 rounded-lg bg-gray-50 border border-gray-100 text-gray-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                        Chapters
                      </p>
                      <div className="space-y-1.5">
                        {result.chapters?.map((c, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold text-red-600 w-10 shrink-0">
                              {c.time}
                            </span>
                            <span className="text-xs text-gray-700">
                              {c.title}
                            </span>
                          </div>
                        ))}
                      </div>
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
