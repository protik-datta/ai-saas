import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PenTool, Sparkles, Copy, Check, ChevronDown, ChevronUp, Megaphone, Star, HelpCircle, ArrowRight, Zap, Users, Target, Award, LayoutTemplate, RefreshCw } from "lucide-react";

import Loader from "../../../utils/Loader";
const frameworks = ["AIDA", "PAS", "BAB", "StoryBrand"];
const tones = [
  "Professional",
  "Casual & Friendly",
  "Bold & Direct",
  "Inspirational",
  "Witty",
];

const CopyBlock = ({ label, content, icon: Icon, accent, index }) => {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(index < 3);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      Array.isArray(content) ? content.join("\n") : content,
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
        <div
          className={`w-8 h-8 rounded-xl flex items-center justify-center ${accent}`}
        >
          <Icon size={15} className="text-white" />
        </div>
        <span className="flex-1 text-sm font-bold text-gray-800">{label}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleCopy();
          }}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
        >
          {copied ? (
            <>
              <Check size={11} className="text-emerald-500" />
              <span className="text-emerald-500">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={11} />
              Copy
            </>
          )}
        </button>
        {open ? (
          <ChevronUp size={14} className="text-gray-400" />
        ) : (
          <ChevronDown size={14} className="text-gray-400" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-gray-50 pt-4">
          {Array.isArray(content) ? (
            <ul className="space-y-2">
              {content.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 shrink-0" />
                  <span className="text-sm text-gray-700 leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-700 leading-relaxed">{content}</p>
          )}
        </div>
      )}
    </motion.div>
  );
};

const sectionConfig = [
  {
    key: "heroHeadline",
    label: "Hero Headline",
    icon: Megaphone,
    accent: "bg-rose-500",
  },
  {
    key: "subHeadline",
    label: "Sub-headline",
    icon: PenTool,
    accent: "bg-violet-500",
  },
  {
    key: "featureBullets",
    label: "Feature Bullets",
    icon: Zap,
    accent: "bg-amber-500",
  },
  {
    key: "socialProof",
    label: "Social Proof Lines",
    icon: Star,
    accent: "bg-emerald-500",
  },
  {
    key: "faqAnswers",
    label: "FAQ Answers",
    icon: HelpCircle,
    accent: "bg-blue-500",
  },
  {
    key: "primaryCTA",
    label: "Primary CTA",
    icon: ArrowRight,
    accent: "bg-gray-800",
  },
];

import { useLandingPageCopy } from "../../../hooks/toolsApi.hook";

export default function AILandingPageCopy() {
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [audience, setAudience] = useState("");
  const [framework, setFramework] = useState("AIDA");
  const [tone, setTone] = useState("Professional");
  const [result, setResult] = useState(null);

  const { mutate: generateCopy, isPending, isError } = useLandingPageCopy();

  const handleGenerate = () => {
    if (!productName || !productDesc) return;
    setResult(null);

    generateCopy(
      { productName, productDesc, audience, framework, tone },
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

  const allCopyText = result
    ? Object.entries(result)
        .filter(([k]) => k !== "frameworkNote")
        .map(
          ([k, v]) =>
            `=== ${k.toUpperCase()} ===\n${Array.isArray(v) ? v.join("\n") : v}`,
        )
        .join("\n\n")
    : "";

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-rose-50 flex items-center justify-center">
              <PenTool size={16} className="text-rose-600" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              AI Landing Page Copy Generator
            </h1>
          </div>
          <p className="text-sm text-gray-500 ml-10">
            Conversion copy in seconds — hero, features, FAQ, social proof, CTA.
            All structured and ready to paste.
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
                  Product / Service Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g. TaskFlow Pro"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-50 transition-all"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">
                  One-line Description <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={productDesc}
                  onChange={(e) => setProductDesc(e.target.value)}
                  placeholder="e.g. AI-powered task manager for remote engineering teams"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-50 transition-all"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">
                  Target Audience{" "}
                  <span className="text-gray-300">(optional)</span>
                </label>
                <input
                  type="text"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  placeholder="e.g. SaaS startup founders, freelance designers..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-50 transition-all"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-2 block">
                  Copywriting Framework
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {frameworks.map((f) => (
                    <button
                      key={f}
                      onClick={() => setFramework(f)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${framework === f ? "bg-rose-600 text-white border-rose-600" : "bg-gray-50 text-gray-600 border-gray-100 hover:border-gray-300"}`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-2 block">
                  Tone of Voice
                </label>
                <div className="flex flex-col gap-1.5">
                  {tones.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTone(t)}
                      className={`py-2 px-3 rounded-xl text-xs font-medium border text-left transition-all flex items-center gap-2 ${tone === t ? "bg-gray-900 text-white border-gray-900" : "bg-gray-50 text-gray-600 border-gray-100 hover:border-gray-300"}`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${tone === t ? "bg-white" : "bg-gray-300"}`}
                      />
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleGenerate}
                disabled={!productName || !productDesc || isPending}
                className="w-full py-3 rounded-xl bg-rose-600 text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-rose-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                {isPending ? (
                  <>
                    <Loader size="sm" />
                    Writing Copy...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Generate Copy Kit
                  </>
                )}
              </motion.button>
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
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center justify-center text-center min-h-125"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
                    <LayoutTemplate size={28} className="text-gray-300" />
                  </div>
                  <p className="text-sm font-semibold text-gray-400">
                    Your copy kit will appear here
                  </p>
                  <p className="text-xs text-gray-300 mt-1">
                    Fill in product details and click Generate
                  </p>
                </motion.div>
              )}

              {isPending && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center justify-center min-h-125"
                >
                  <div className="relative w-16 h-16 mb-4">
                    <div className="absolute inset-0 rounded-full border-4 border-rose-100" />
                    <div className="absolute inset-0 rounded-full border-4 border-rose-500 border-t-transparent animate-spin" />
                    <PenTool
                      size={18}
                      className="absolute inset-0 m-auto text-rose-500"
                    />
                  </div>
                  <p className="text-sm font-semibold text-gray-600">
                    Writing conversion copy...
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Applying {framework} framework · {tone} tone
                  </p>
                </motion.div>
              )}

              {isError && !isPending && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl border border-red-50 shadow-sm p-8 flex flex-col items-center justify-center text-center min-h-125"
                >
                  <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
                    <RefreshCw size={28} className="text-red-400" />
                  </div>
                  <p className="text-sm font-semibold text-gray-800">
                    Failed to generate copy kit
                  </p>
                  <button
                    onClick={handleGenerate}
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
                  className="space-y-4"
                >
                  {/* Header */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Award size={14} className="text-rose-500" />
                          <span className="text-sm font-bold text-gray-800">
                            {productName} — Copy Kit
                          </span>
                        </div>
                        <p className="text-xs text-gray-400">
                          {framework} Framework · {tone} Tone ·{" "}
                          {sectionConfig.length} sections generated
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          navigator.clipboard.writeText(allCopyText)
                        }
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                      >
                        <Copy size={12} /> Copy All
                      </button>
                    </div>
                    {result.frameworkNote && (
                      <p className="text-[11px] text-gray-400 leading-relaxed mt-3 pt-3 border-t border-gray-50">
                        {result.frameworkNote}
                      </p>
                    )}
                  </div>

                  {/* Copy Sections */}
                  {sectionConfig.map(
                    (section, i) =>
                      result[section.key] && (
                        <CopyBlock
                          key={section.key}
                          label={section.label}
                          content={result[section.key]}
                          icon={section.icon}
                          accent={section.accent}
                          index={i}
                        />
                      ),
                  )}

                  <button
                    onClick={handleGenerate}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 text-sm text-gray-500 hover:bg-white hover:border-gray-300 transition-all"
                  >
                    <RefreshCw size={14} /> Regenerate with same settings
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
