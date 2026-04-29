import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Repeat2, Sparkles, Copy, Check, RefreshCw } from "lucide-react";

import Loader from "../../../utils/Loader";
const outputFormats = [
  {
    id: "twitter",
    label: "Twitter / X Thread",
    color: "bg-sky-50 text-sky-700 border-sky-200",
  },
  {
    id: "linkedin",
    label: "LinkedIn Post",
    color: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    id: "instagram",
    label: "Instagram Caption",
    color: "bg-pink-50 text-pink-700 border-pink-200",
  },
  {
    id: "youtube",
    label: "YouTube Description",
    color: "bg-red-50 text-red-700 border-red-200",
  },
  {
    id: "script",
    label: "Reels / Shorts Script",
    color: "bg-violet-50 text-violet-700 border-violet-200",
  },
];

import { useContentRepurposer } from "../../../hooks/toolsApi.hook";

export default function ContentRepurser() {
  const [sourceContent, setSourceContent] = useState("");
  const [selectedFormats, setSelectedFormats] = useState([
    "twitter",
    "linkedin",
  ]);
  const [results, setResults] = useState(null);
  const [activeTab, setActiveTab] = useState(null);
  const [copiedTab, setCopiedTab] = useState(null);

  const { mutate: repurposeContent, isPending, isError } = useContentRepurposer();

  const toggleFormat = (id) => {
    setSelectedFormats((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  const handleRepurpose = () => {
    if (!sourceContent || !selectedFormats.length) return;
    setResults(null);

    repurposeContent(
      { sourceContent, selectedFormats },
      {
        onSuccess: (res) => {
          const data = res?.data || res;
          if (data) {
            setResults(data);
            setActiveTab(selectedFormats[0]);
          }
        },
        onError: () => {},
      },
    );
  };

  const copyContent = (tabId) => {
    navigator.clipboard.writeText(results[tabId]);
    setCopiedTab(tabId);
    setTimeout(() => setCopiedTab(null), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center">
              <Repeat2 size={16} className="text-emerald-600" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              AI Content Repurposer
            </h1>
          </div>
          <p className="text-sm text-gray-500 ml-10">
            One piece of content. Five formats. Zero extra research.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Input */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">
                Source Content
              </label>

              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">
                  Paste your content <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={sourceContent}
                  onChange={(e) => setSourceContent(e.target.value)}
                  placeholder="Paste your blog post, video transcript, newsletter, or any long-form content here..."
                  rows={7}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50 transition-all resize-none"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-2 block">
                  Output Formats
                </label>
                <div className="space-y-1.5">
                  {outputFormats.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => toggleFormat(f.id)}
                      className={`w-full flex items-center gap-2.5 py-2 px-3 rounded-xl text-xs font-medium border transition-all text-left ${selectedFormats.includes(f.id) ? `${f.color} border` : "bg-gray-50 text-gray-500 border-gray-100 hover:border-gray-300"}`}
                    >
                      <div
                        className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center ${selectedFormats.includes(f.id) ? "bg-current border-current" : "border-gray-300"}`}
                      >
                        {selectedFormats.includes(f.id) && (
                          <Check size={9} className="text-white" />
                        )}
                      </div>
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleRepurpose}
                disabled={
                  !sourceContent || !selectedFormats.length || isPending
                }
                className="w-full py-3 rounded-xl bg-emerald-600 text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                {isPending ? (
                  <>
                    <Loader size="sm" />{" "}
                    Repurposing...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} /> Repurpose Content
                  </>
                )}
              </motion.button>
            </div>

            {results && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Actions
                </p>
                <button
                  onClick={handleRepurpose}
                  className="w-full flex items-center gap-2.5 px-4 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-all"
                >
                  <RefreshCw size={15} /> Regenerate All
                </button>
              </div>
            )}
          </div>

          {/* Output */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {!results && !isPending && !isError && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center justify-center text-center min-h-96"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
                    <Repeat2 size={28} className="text-gray-300" />
                  </div>
                  <p className="text-sm font-semibold text-gray-400">
                    Repurposed versions will appear here
                  </p>
                  <p className="text-xs text-gray-300 mt-1">
                    Select formats and paste your content
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
                    <div className="absolute inset-0 rounded-full border-4 border-emerald-100" />
                    <div className="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin" />
                    <Repeat2
                      size={18}
                      className="absolute inset-0 m-auto text-emerald-500"
                    />
                  </div>
                  <p className="text-sm font-semibold text-gray-600">
                    Reformatting your content...
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Adapting to {selectedFormats.length} platform formats
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
                    Failed to repurpose content
                  </p>
                  <button
                    onClick={handleRepurpose}
                    className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
                  >
                    Try Again
                  </button>
                </motion.div>
              )}

              {results && !isPending && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  {/* Tabs */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-2">
                    <div className="flex gap-1 flex-wrap">
                      {selectedFormats
                        .filter((f) => results[f])
                        .map((f) => {
                          const fmt = outputFormats.find((o) => o.id === f);
                          return (
                            <button
                              key={f}
                              onClick={() => setActiveTab(f)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${activeTab === f ? "bg-emerald-600 text-white" : "text-gray-500 hover:bg-gray-50"}`}
                            >
                              {fmt?.label}
                            </button>
                          );
                        })}
                    </div>
                  </div>

                  {activeTab && results[activeTab] && (
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`text-xs font-bold px-2.5 py-1 rounded-full border ${outputFormats.find((o) => o.id === activeTab)?.color}`}
                        >
                          {outputFormats.find((o) => o.id === activeTab)?.label}
                        </span>
                        <button
                          onClick={() => copyContent(activeTab)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-600 hover:bg-gray-100 transition-all"
                        >
                          {copiedTab === activeTab ? (
                            <Check size={11} className="text-emerald-500" />
                          ) : (
                            <Copy size={11} />
                          )}
                          {copiedTab === activeTab ? "Copied!" : "Copy"}
                        </button>
                      </div>
                      <pre className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap font-sans">
                        {results[activeTab]}
                      </pre>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
