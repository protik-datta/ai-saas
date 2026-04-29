import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scale, Sparkles, ThumbsUp, ThumbsDown, ChevronDown, ChevronUp, AlertTriangle, TrendingUp, Clock, Gauge, Lightbulb, BarChart3, RefreshCw } from "lucide-react";

import Loader from "../../../utils/Loader";
import CopyButton from "../../../components/ui/CopyButton";

const ProConItem = ({ item, type, index }) => (
  <motion.div
    initial={{ opacity: 0, x: type === "pro" ? -8 : 8 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.05 }}
    className={`flex items-start gap-2.5 py-2.5 border-b last:border-0 ${type === "pro" ? "border-emerald-50" : "border-red-50"}`}
  >
    <div
      className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${type === "pro" ? "bg-emerald-50" : "bg-red-50"}`}
    >
      {type === "pro" ? (
        <ThumbsUp size={9} className="text-emerald-500" />
      ) : (
        <ThumbsDown size={9} className="text-red-400" />
      )}
    </div>
    <div className="flex-1">
      <p className="text-sm text-gray-700 leading-relaxed">{item.point}</p>
      {item.weight && (
        <span
          className={`text-[10px] font-bold px-1.5 py-0.5 rounded mt-1 inline-block ${type === "pro" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}
        >
          {item.weight} impact
        </span>
      )}
    </div>
  </motion.div>
);

const ScoreRing = ({ score, label, color }) => {
  const r = 22;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (score / 10) * circumference;
  const colorMap = {
    emerald: {
      stroke: "#10b981",
      text: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    amber: { stroke: "#f59e0b", text: "text-amber-600", bg: "bg-amber-50" },
    blue: { stroke: "#3b82f6", text: "text-blue-600", bg: "bg-blue-50" },
  };
  const c = colorMap[color];
  return (
    <div className={`${c.bg} rounded-xl p-4 flex flex-col items-center gap-2`}>
      <svg width="56" height="56" viewBox="0 0 56 56">
        <circle
          cx="28"
          cy="28"
          r={r}
          fill="none"
          stroke="#f3f4f6"
          strokeWidth="4"
        />
        <circle
          cx="28"
          cy="28"
          r={r}
          fill="none"
          stroke={c.stroke}
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 28 28)"
          style={{ transition: "stroke-dashoffset 0.8s ease" }}
        />
        <text
          x="28"
          y="33"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill="currentColor"
          className={c.text}
        >
          {score}
        </text>
      </svg>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide text-center">
        {label}
      </p>
    </div>
  );
};

import { useDecisionMaker } from "../../../hooks/toolsApi.hook";

function AIDecisionMaker() {
  const [decision, setDecision] = useState("");
  const [context, setContext] = useState("");
  const [timeframe, setTimeframe] = useState("Long-term");
  const [stakes, setStakes] = useState("Medium");
  const [result, setResult] = useState(null);
  const [expandedSection, setExpandedSection] = useState("pros-cons");

  const { mutate: analyzeDecision, isPending, isError } = useDecisionMaker();

  const handleAnalyze = () => {
    if (!decision.trim()) return;
    setResult(null);

    analyzeDecision(
      { decision, context, timeframe, stakes },
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

  const toggle = (s) => setExpandedSection(expandedSection === s ? null : s);

  const recColor = {
    Go: "bg-emerald-600",
    "Don't Go": "bg-red-500",
    "Gather More Info": "bg-amber-500",
    Renegotiate: "bg-blue-500",
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-violet-50 flex items-center justify-center">
              <Scale size={16} className="text-violet-600" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              AI Decision Maker
            </h1>
          </div>
          <p className="text-sm text-gray-500 ml-10">
            Stop overthinking. Get structured clarity on any decision.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">
                Decision Details
              </label>

              <div>
                <p className="text-xs text-gray-500 mb-2">
                  What's your decision?
                </p>
                <textarea
                  value={decision}
                  onChange={(e) => setDecision(e.target.value)}
                  rows={3}
                  placeholder="e.g. Should I switch jobs? Accept this freelance project? Move to a new city? Start this business?"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-50 transition-all resize-none"
                />
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-2">
                  Additional Context{" "}
                  <span className="text-gray-300">(optional)</span>
                </p>
                <textarea
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  rows={2}
                  placeholder="e.g. I've been at current job for 2 years, new offer is 30% higher salary but startup risk..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-50 transition-all resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-2">Timeframe Focus</p>
                  <select
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-50 bg-white transition-all"
                  >
                    {["Short-term", "Long-term", "Both"].map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-2">Stakes Level</p>
                  <div className="flex gap-1.5 p-1 bg-gray-50 rounded-xl">
                    {["Low", "Medium", "High"].map((s) => (
                      <button
                        key={s}
                        onClick={() => setStakes(s)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${stakes === s ? "bg-violet-600 text-white shadow-sm" : "text-gray-500 hover:bg-gray-100"}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleAnalyze}
                disabled={!decision.trim() || isPending}
                className="w-full py-3 rounded-xl bg-violet-600 text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                {isPending ? (
                  <>
                    <Loader size="sm" />
                    Analyzing decision...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Analyze Decision
                  </>
                )}
              </motion.button>
            </div>
          </div>

          {/* Output */}
          <div className="space-y-4">
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
                    <BarChart3 size={28} className="text-gray-300" />
                  </div>
                  <p className="text-sm font-semibold text-gray-400">
                    Decision analysis will appear here
                  </p>
                  <p className="text-xs text-gray-300 mt-1">
                    Describe your decision and click Analyze
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
                    <div className="absolute inset-0 rounded-full border-4 border-violet-100" />
                    <div className="absolute inset-0 rounded-full border-4 border-violet-500 border-t-transparent animate-spin" />
                    <Scale
                      size={18}
                      className="absolute inset-0 m-auto text-violet-500"
                    />
                  </div>
                  <p className="text-sm font-semibold text-gray-600">
                    Weighing your options...
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Detecting biases & mapping impact
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
                    Failed to analyze decision
                  </p>
                  <button
                    onClick={handleAnalyze}
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
                  {/* Verdict */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <p className="text-xs text-gray-400 mb-2 truncate">
                      {result.decisionTitle}
                    </p>
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className={`px-4 py-1.5 rounded-xl text-sm font-bold text-white ${recColor[result.recommendation] || "bg-gray-500"}`}
                      >
                        {result.recommendation}
                      </span>
                      <p className="text-xs text-gray-500 flex-1">
                        {result.recommendationReason}
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <ScoreRing
                        score={result.clarityScore}
                        label="Clarity"
                        color="blue"
                      />
                      <ScoreRing
                        score={result.confidenceScore}
                        label="Confidence"
                        color="emerald"
                      />
                      <ScoreRing
                        score={result.riskScore}
                        label="Risk Level"
                        color="amber"
                      />
                    </div>
                  </div>

                  {/* Pros & Cons */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <button
                      onClick={() => toggle("pros-cons")}
                      className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Scale size={15} className="text-violet-500" />
                        <span className="text-sm font-semibold text-gray-800">
                          Pros & Cons
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CopyButton
                          text={[
                            ...result.pros.map((p) => `✓ ${p.point}`),
                            ...result.cons.map((c) => `✗ ${c.point}`),
                          ].join("\n")}
                        />
                        {expandedSection === "pros-cons" ? (
                          <ChevronUp size={14} className="text-gray-400" />
                        ) : (
                          <ChevronDown size={14} className="text-gray-400" />
                        )}
                      </div>
                    </button>
                    {expandedSection === "pros-cons" && (
                      <div className="px-5 pb-5 grid grid-cols-1 gap-4">
                        <div>
                          <p className="text-xs font-bold text-emerald-600 uppercase tracking-wide mb-2">
                            Pros
                          </p>
                          {result.pros.map((p, i) => (
                            <ProConItem key={i} item={p} type="pro" index={i} />
                          ))}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-red-500 uppercase tracking-wide mb-2">
                            Cons
                          </p>
                          {result.cons.map((c, i) => (
                            <ProConItem key={i} item={c} type="con" index={i} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Impact */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <button
                      onClick={() => toggle("impact")}
                      className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <TrendingUp size={15} className="text-blue-500" />
                        <span className="text-sm font-semibold text-gray-800">
                          Impact Analysis
                        </span>
                      </div>
                      {expandedSection === "impact" ? (
                        <ChevronUp size={14} className="text-gray-400" />
                      ) : (
                        <ChevronDown size={14} className="text-gray-400" />
                      )}
                    </button>
                    {expandedSection === "impact" && (
                      <div className="px-5 pb-5 space-y-3">
                        <div className="flex gap-3">
                          <div className="flex-1 p-3 bg-blue-50 rounded-xl border border-blue-100">
                            <div className="flex items-center gap-1.5 mb-1.5">
                              <Clock size={11} className="text-blue-500" />
                              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wide">
                                Short-Term
                              </p>
                            </div>
                            <p className="text-xs text-blue-700">
                              {result.shortTermImpact}
                            </p>
                          </div>
                          <div className="flex-1 p-3 bg-violet-50 rounded-xl border border-violet-100">
                            <div className="flex items-center gap-1.5 mb-1.5">
                              <TrendingUp
                                size={11}
                                className="text-violet-500"
                              />
                              <p className="text-[10px] font-bold text-violet-600 uppercase tracking-wide">
                                Long-Term
                              </p>
                            </div>
                            <p className="text-xs text-violet-700">
                              {result.longTermImpact}
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                            <p className="text-[10px] font-bold text-emerald-600 mb-1">
                              Best Case
                            </p>
                            <p className="text-xs text-emerald-700">
                              {result.bestCase}
                            </p>
                          </div>
                          <div className="p-3 bg-red-50 rounded-xl border border-red-100">
                            <p className="text-[10px] font-bold text-red-500 mb-1">
                              Worst Case
                            </p>
                            <p className="text-xs text-red-600">
                              {result.worstCase}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bias & Key Q */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle size={14} className="text-amber-500" />
                      <span className="text-sm font-semibold text-gray-800">
                        Bias Warnings
                      </span>
                    </div>
                    <div className="space-y-2 mb-4">
                      {result.biasWarnings.map((bias, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 text-xs text-gray-600"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                          {bias}
                        </div>
                      ))}
                    </div>
                    <div className="p-3 bg-violet-50 rounded-xl border border-violet-100">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Lightbulb size={12} className="text-violet-500" />
                        <p className="text-xs text-violet-700 font-medium">
                          Key Question to Answer First
                        </p>
                      </div>
                      <p className="text-xs text-violet-600 italic">
                        "{result.keyQuestion}"
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

export default AIDecisionMaker;
