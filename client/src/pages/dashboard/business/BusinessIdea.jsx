import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, Sparkles, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";

import { useBusinessIdea } from "../../../hooks/toolsApi.hook";
import Loader from '../../../utils/Loader';

const audienceTypes = ["B2B", "B2C", "Both"];
const modelTypes = [
  "SaaS",
  "Service",
  "Marketplace",
  "Physical Product",
  "Any",
];
const difficultyColors = {
  Low: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  High: "bg-red-50 text-red-700 border-red-200",
};

export default function BusinessIdea() {
  const [niche, setNiche] = useState("");
  const [audience, setAudience] = useState("B2B");
  const [model, setModel] = useState("Any");
  const [ideas, setIdeas] = useState([]);
  const [expanded, setExpanded] = useState(null);

  const { mutate: generateBusinessIdea, isPending, isError } = useBusinessIdea();

  const handleGenerate = () => {
    if (!niche) return;
    setIdeas([]);
    setExpanded(null);

    generateBusinessIdea(
      { niche, audience, model },
      {
        onSuccess: (res) => {
          const data = res?.data || res;
          if (Array.isArray(data)) {
            setIdeas(data);
          }
        },
        onError: () => {},
      },
    );
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center">
              <Lightbulb size={16} className="text-amber-600" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              Business Idea Generator
            </h1>
          </div>
          <p className="text-sm text-gray-500 ml-10">
            From niche to validated startup concept
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Input */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">
                Idea Config
              </label>

              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">
                  Niche, Industry or Skill{" "}
                  <span className="text-red-400">*</span>
                </label>
                <input
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  placeholder="e.g. freelance video editors, real estate agents, e-commerce..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-50 transition-all"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-2 block">
                  Target Audience
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {audienceTypes.map((a) => (
                    <button
                      key={a}
                      onClick={() => setAudience(a)}
                      className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all ${audience === a ? "bg-amber-500 text-white border-amber-500" : "bg-gray-50 text-gray-600 border-gray-100 hover:border-gray-300"}`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-2 block">
                  Business Model
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {modelTypes.map((m) => (
                    <button
                      key={m}
                      onClick={() => setModel(m)}
                      className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all text-left ${model === m ? "bg-amber-500 text-white border-amber-500" : "bg-gray-50 text-gray-600 border-gray-100 hover:border-gray-300"}`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleGenerate}
                disabled={!niche || isPending}
                className="w-full py-3 rounded-xl bg-amber-500 text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                {isPending ? (
                  <>
                    <Loader size="sm" /> Generating
                    Ideas...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} /> Generate 5 Ideas
                  </>
                )}
              </motion.button>
            </div>

            {ideas.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <button
                  onClick={handleGenerate}
                  className="w-full flex items-center gap-2.5 px-4 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-all"
                >
                  <RefreshCw size={15} /> Regenerate Ideas
                </button>
              </div>
            )}
          </div>

          {/* Output */}
          <div className="lg:col-span-3 mb-30">
            <AnimatePresence mode="wait">
              {!ideas.length && !isPending && !isError && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center justify-center text-center min-h-96"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
                    <Lightbulb size={28} className="text-gray-300" />
                  </div>
                  <p className="text-sm font-semibold text-gray-400">
                    5 startup concepts will appear here
                  </p>
                  <p className="text-xs text-gray-300 mt-1">
                    Each with revenue model and validation steps
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
                    <div className="absolute inset-0 rounded-full border-4 border-amber-100" />
                    <div className="absolute inset-0 rounded-full border-4 border-amber-400 border-t-transparent animate-spin" />
                    <Lightbulb
                      size={18}
                      className="absolute inset-0 m-auto text-amber-500"
                    />
                  </div>
                  <p className="text-sm font-semibold text-gray-600">
                    Researching micro-niches...
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Generating 5 validated startup concepts
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
                    Failed to generate ideas
                  </p>
                  <button
                    onClick={handleGenerate}
                    className="mt-4 px-4 py-2 bg-amber-500 text-white rounded-xl text-xs font-bold"
                  >
                    Try Again
                  </button>
                </motion.div>
              )}

              {ideas.length > 0 && !isPending && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  {ideas.map((idea, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                    >
                      <button
                        onClick={() => setExpanded(expanded === i ? null : i)}
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-xl bg-amber-50 text-amber-600 text-xs font-bold flex items-center justify-center shrink-0">
                            {i + 1}
                          </span>
                          <div>
                            <p className="text-sm font-bold text-gray-900">
                              {idea.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {idea.tagline}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-bold px-2 py-1 rounded-full border ${difficultyColors[idea.competitionLevel] || "bg-gray-50 text-gray-500 border-gray-200"}`}
                          >
                            {idea.competitionLevel} competition
                          </span>
                          {expanded === i ? (
                            <ChevronUp size={14} className="text-gray-400" />
                          ) : (
                            <ChevronDown size={14} className="text-gray-400" />
                          )}
                        </div>
                      </button>

                      <AnimatePresence>
                        {expanded === i && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 space-y-3 border-t border-gray-50 pt-4">
                              <div className="grid grid-cols-2 gap-3">
                                <div className="bg-gray-50 rounded-xl p-3">
                                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                                    Problem
                                  </p>
                                  <p className="text-xs text-gray-700">
                                    {idea.problem}
                                  </p>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-3">
                                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                                    Solution
                                  </p>
                                  <p className="text-xs text-gray-700">
                                    {idea.solution}
                                  </p>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-3">
                                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                                    Target User
                                  </p>
                                  <p className="text-xs text-gray-700">
                                    {idea.targetUser}
                                  </p>
                                </div>
                                <div className="bg-amber-50 rounded-xl p-3">
                                  <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-1">
                                    Revenue Model
                                  </p>
                                  <p className="text-xs text-gray-700">
                                    {idea.revenueModel}
                                  </p>
                                </div>
                              </div>
                              <div className="bg-gray-50 rounded-xl p-3">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                                  3-Step Validation
                                </p>
                                <div className="space-y-1.5">
                                  {idea.validation?.map((step, j) => (
                                    <div
                                      key={j}
                                      className="flex items-start gap-2"
                                    >
                                      <span className="shrink-0 w-4 h-4 rounded-full bg-amber-100 text-amber-700 text-[9px] font-bold flex items-center justify-center mt-0.5">
                                        {j + 1}
                                      </span>
                                      <p className="text-xs text-gray-700">
                                        {step}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
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
