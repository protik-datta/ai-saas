import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DollarSign, Sparkles,  RefreshCw, Check } from "lucide-react";

import Loader from "../../../utils/Loader";
const customerTypes = [
  "Freelancers",
  "SMBs",
  "Enterprises",
  "Consumers",
  "Agencies",
  "Developers",
];
const modelTypes = [
  "Freemium",
  "Usage-based",
  "Tiered",
  "Flat-rate",
  "Per-seat",
];

const tierColors = [
  {
    bg: "bg-gray-50 border-gray-200",
    badge: "bg-gray-100 text-gray-600",
    accent: "text-gray-700",
  },
  {
    bg: "bg-blue-50 border-blue-200",
    badge: "bg-blue-600 text-white",
    accent: "text-blue-700",
  },
  {
    bg: "bg-violet-50 border-violet-200",
    badge: "bg-violet-100 text-violet-700",
    accent: "text-violet-700",
  },
];

import { usePricingStrategy } from "../../../hooks/toolsApi.hook";

export default function AIPricing() {
  const [form, setForm] = useState({
    product: "",
    description: "",
    customer: "SMBs",
    cost: "",
  });
  const [result, setResult] = useState(null);

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const { mutate: generatePricing, isPending, isError } = usePricingStrategy();

  const handleGenerate = () => {
    if (!form.product || !form.description) return;
    setResult(null);

    generatePricing(
      form,
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
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center">
              <DollarSign size={16} className="text-emerald-600" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              AI Pricing Strategy Tool
            </h1>
          </div>
          <p className="text-sm text-gray-500 ml-10">
            Stop undercharging. Price with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Input */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">
                Product Details
              </label>

              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">
                  Product Name <span className="text-red-400">*</span>
                </label>
                <input
                  value={form.product}
                  onChange={(e) => update("product", e.target.value)}
                  placeholder="e.g. TaskFlow"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50 transition-all"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">
                  What it does <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                  placeholder="e.g. AI task manager that auto-prioritizes your to-do list and schedules your day..."
                  rows={3}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50 transition-all resize-none"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-2 block">
                  Target Customer
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {customerTypes.map((c) => (
                    <button
                      key={c}
                      onClick={() => update("customer", c)}
                      className={`py-2 px-2 rounded-xl text-xs font-medium border transition-all ${form.customer === c ? "bg-emerald-600 text-white border-emerald-600" : "bg-gray-50 text-gray-600 border-gray-100 hover:border-gray-300"}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">
                  Cost to serve 1 user/mo{" "}
                  <span className="text-gray-300">(optional)</span>
                </label>
                <input
                  value={form.cost}
                  onChange={(e) => update("cost", e.target.value)}
                  placeholder="e.g. $2, $0.50, unknown"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50 transition-all"
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleGenerate}
                disabled={!form.product || !form.description || isPending}
                className="w-full py-3 rounded-xl bg-emerald-600 text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                {isPending ? (
                  <>
                    <Loader size="sm" /> Analyzing
                    Pricing...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} /> Generate Strategy
                  </>
                )}
              </motion.button>
            </div>

            {result && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <button
                  onClick={handleGenerate}
                  className="w-full flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-all"
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
                    <DollarSign size={28} className="text-gray-300" />
                  </div>
                  <p className="text-sm font-semibold text-gray-400">
                    Your pricing strategy will appear here
                  </p>
                  <p className="text-xs text-gray-300 mt-1">
                    Tier structure, price points, and psychology notes
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
                    <DollarSign
                      size={18}
                      className="absolute inset-0 m-auto text-emerald-500"
                    />
                  </div>
                  <p className="text-sm font-semibold text-gray-600">
                    Analyzing pricing models...
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Building your tier structure
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
                    Failed to generate strategy
                  </p>
                  <button
                    onClick={handleGenerate}
                    className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
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
                  {/* Summary */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                        Recommended Model
                      </span>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {result.recommendedModel}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {result.rationale}
                    </p>
                    <div className="mt-3 pt-3 border-t border-gray-50 flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        Recommended launch price:
                      </span>
                      <span className="text-sm font-bold text-emerald-600">
                        {result.launchPrice}
                      </span>
                    </div>
                  </div>

                  {/* Tiers */}
                  <div className="grid grid-cols-3 gap-3">
                    {result.tiers?.map((tier, i) => (
                      <div
                        key={i}
                        className={`rounded-2xl border p-4 ${tierColors[i]?.bg || "bg-gray-50 border-gray-200"}`}
                      >
                        <span
                          className={`text-[10px] font-bold px-2 py-1 rounded-full ${tierColors[i]?.badge || "bg-gray-100 text-gray-600"}`}
                        >
                          {tier.name}
                        </span>
                        <p
                          className={`text-lg font-black mt-2 ${tierColors[i]?.accent || "text-gray-700"}`}
                        >
                          {tier.price}
                        </p>
                        <p className="text-[10px] text-gray-500 mt-0.5 mb-3">
                          {tier.target}
                        </p>
                        <div className="space-y-1.5">
                          {tier.features?.map((f, j) => (
                            <div key={j} className="flex items-start gap-1.5">
                              <Check
                                size={10}
                                className={`mt-0.5 shrink-0 ${tierColors[i]?.accent || "text-gray-600"}`}
                              />
                              <span className="text-[11px] text-gray-700">
                                {f}
                              </span>
                            </div>
                          ))}
                        </div>
                        {tier.limit && (
                          <p className="text-[10px] text-gray-400 mt-2 pt-2 border-t border-gray-200">
                            {tier.limit}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Psychology + Warning */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                        Pricing Psychology
                      </p>
                      <div className="space-y-2">
                        {result.psychologyNotes?.map((note, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {i + 1}
                            </span>
                            <p className="text-xs text-gray-600">{note}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                          Freemium?
                        </p>
                        <p className="text-xs text-gray-700">
                          {result.freemiumRecommendation}
                        </p>
                      </div>
                      <div className="bg-red-50 rounded-2xl border border-red-100 p-4">
                        <p className="text-xs font-bold text-red-600 uppercase tracking-widest mb-1">
                          ⚠ Risk Warning
                        </p>
                        <p className="text-xs text-gray-700">
                          {result.riskWarning}
                        </p>
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
