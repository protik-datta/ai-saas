import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, RefreshCw, TrendingUp, TrendingDown, Minus } from "lucide-react";

import Loader from "../../../utils/Loader";
import { useCompetitorAnalysis } from "../../../hooks/toolsApi.hook";

export default function AICompetitor() {
  const [niche, setNiche] = useState("");
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const { mutate: analyzeCompetitors, isPending, isError } = useCompetitorAnalysis();

  const handleAnalyze = () => {
    if (!niche) return;
    setResult(null);

    analyzeCompetitors(
      { niche },
      {
        onSuccess: (res) => {
          const data = res?.data || res;
          if (data) {
            setResult(data);
            setActiveTab(0);
          }
        },
        onError: () => {},
      },
    );
  };

  const scoreColor = result
    ? result.opportunityScore >= 75
      ? "text-emerald-600"
      : result.opportunityScore >= 55
        ? "text-amber-500"
        : "text-red-500"
    : "";

  const compColor = {
    Low: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Medium: "bg-amber-50 text-amber-700 border-amber-200",
    High: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-rose-50 flex items-center justify-center">
              <Search size={16} className="text-rose-600" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              AI Competitor Analysis
            </h1>
          </div>
          <p className="text-sm text-gray-500 ml-10">
            Know your market before you build
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Input */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">
                Market Research
              </label>

              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">
                  Product idea or niche <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  placeholder="e.g. AI writing assistant for marketing teams, no-code website builder for restaurants..."
                  rows={4}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-50 transition-all resize-none"
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleAnalyze}
                disabled={!niche || isPending}
                className="w-full py-3 rounded-xl bg-rose-600 text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-rose-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                {isPending ? (
                  <>
                    <Loader size="sm" /> Analyzing
                    Market...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} /> Analyze Market
                  </>
                )}
              </motion.button>
            </div>

            {result && (
              <>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Market Overview
                  </p>
                  <div className="text-center py-2">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">
                      Opportunity Score
                    </p>
                    <p className={`text-5xl font-black ${scoreColor}`}>
                      {result.opportunityScore}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">out of 100</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between py-2 border-t border-gray-50">
                      <span className="text-xs text-gray-500">Competition</span>
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full border ${compColor[result.competitionLevel] || "bg-gray-50 text-gray-600 border-gray-200"}`}
                      >
                        {result.competitionLevel}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-t border-gray-50">
                      <span className="text-xs text-gray-500">Market Size</span>
                      <span className="text-xs font-bold text-gray-800">
                        {result.estimatedMarketSize}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <button
                    onClick={handleAnalyze}
                    className="w-full flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-all"
                  >
                    <RefreshCw size={14} /> Re-analyze
                  </button>
                </div>
              </>
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
                    <Search size={28} className="text-gray-300" />
                  </div>
                  <p className="text-sm font-semibold text-gray-400">
                    Competitor landscape will appear here
                  </p>
                  <p className="text-xs text-gray-300 mt-1">
                    Top 5 competitors with SWOT breakdowns
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
                    <div className="absolute inset-0 rounded-full border-4 border-rose-100" />
                    <div className="absolute inset-0 rounded-full border-4 border-rose-500 border-t-transparent animate-spin" />
                    <Search
                      size={18}
                      className="absolute inset-0 m-auto text-rose-500"
                    />
                  </div>
                  <p className="text-sm font-semibold text-gray-600">
                    Scanning market landscape...
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Profiling top 5 competitors
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
                    Failed to analyze competitors
                  </p>
                  <button
                    onClick={handleAnalyze}
                    className="mt-4 px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold"
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
                  className="space-y-3"
                >
                  {/* Tabs */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-2 flex gap-1 flex-wrap">
                    {result.competitors?.map((c, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveTab(i)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${activeTab === i ? "bg-rose-600 text-white" : "text-gray-500 hover:bg-gray-50"}`}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>

                  {result.competitors?.[activeTab] && (
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-base font-bold text-gray-900">
                            {result.competitors[activeTab].name}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {result.competitors[activeTab].description}
                          </p>
                        </div>
                        <div className="text-right shrink-0 ml-3">
                          <p className="text-[10px] text-gray-400">Pricing</p>
                          <p className="text-xs font-bold text-gray-800">
                            {result.competitors[activeTab].pricing}
                          </p>
                        </div>
                      </div>

                      <div className="text-xs text-gray-500 bg-gray-50 rounded-xl px-3 py-2">
                        <span className="font-semibold text-gray-700">
                          Target:{" "}
                        </span>
                        {result.competitors[activeTab].targetMarket}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-emerald-50 rounded-xl p-3">
                          <div className="flex items-center gap-1.5 mb-2">
                            <TrendingUp
                              size={12}
                              className="text-emerald-600"
                            />
                            <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                              Strengths
                            </p>
                          </div>
                          <div className="space-y-1">
                            {result.competitors[activeTab].strengths?.map(
                              (s, i) => (
                                <p key={i} className="text-xs text-gray-700">
                                  • {s}
                                </p>
                              ),
                            )}
                          </div>
                        </div>
                        <div className="bg-red-50 rounded-xl p-3">
                          <div className="flex items-center gap-1.5 mb-2">
                            <TrendingDown size={12} className="text-red-500" />
                            <p className="text-[10px] font-bold text-red-600 uppercase tracking-wider">
                              Weaknesses
                            </p>
                          </div>
                          <div className="space-y-1">
                            {result.competitors[activeTab].weaknesses?.map(
                              (w, i) => (
                                <p key={i} className="text-xs text-gray-700">
                                  • {w}
                                </p>
                              ),
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Gap + Positioning */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                        Market Gap
                      </p>
                      <p className="text-xs text-gray-700 leading-relaxed">
                        {result.marketGap}
                      </p>
                    </div>
                    <div className="bg-rose-50 rounded-2xl border border-rose-100 p-4">
                      <p className="text-xs font-bold text-rose-600 uppercase tracking-widest mb-2">
                        Your Positioning
                      </p>
                      <p className="text-xs text-gray-700 leading-relaxed">
                        {result.positioningRecommendation}
                      </p>
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
