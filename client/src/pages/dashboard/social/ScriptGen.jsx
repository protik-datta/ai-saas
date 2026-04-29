import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Video, Sparkles,  Copy, RefreshCw, Check } from "lucide-react";

import Loader from "../../../utils/Loader";
const platforms = ["Instagram Reels", "YouTube Shorts", "TikTok"];
const lengths = ["30s", "60s", "90s"];

const sectionColors = {
  Hook: "bg-red-50 border-red-200 text-red-700",
  Problem: "bg-amber-50 border-amber-200 text-amber-700",
  Solution: "bg-sky-50 border-sky-200 text-sky-700",
  Proof: "bg-violet-50 border-violet-200 text-violet-700",
  CTA: "bg-emerald-50 border-emerald-200 text-emerald-700",
};

import { useScriptGenerator } from "../../../hooks/toolsApi.hook";

export default function ScriptGen() {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("Instagram Reels");
  const [length, setLength] = useState("60s");
  const [script, setScript] = useState(null);
  const [copied, setCopied] = useState(false);

  const { mutate: generateScript, isPending, isError } = useScriptGenerator();

  const handleGenerate = () => {
    if (!topic) return;
    setScript(null);

    generateScript(
      { topic, platform, length },
      {
        onSuccess: (res) => {
          const data = res?.data || res;
          if (data) {
            setScript(data);
          }
        },
        onError: () => {},
      },
    );
  };

  const fullScript =
    script?.sections?.map((s) => `[${s.label}]\n${s.content}`).join("\n\n") ||
    "";

  const copyAll = () => {
    navigator.clipboard.writeText(fullScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-violet-50 flex items-center justify-center">
              <Video size={16} className="text-violet-600" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              Reel / Shorts Script Generator
            </h1>
          </div>
          <p className="text-sm text-gray-500 ml-10">
            Hook. Hold. Convert. In 60 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Input */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">
                Script Config
              </label>

              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">
                  Topic or Content Angle <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. 3 habits that changed my productivity completely..."
                  rows={3}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-50 transition-all resize-none"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-2 block">
                  Platform
                </label>
                <div className="flex flex-col gap-1.5">
                  {platforms.map((p) => (
                    <button
                      key={p}
                      onClick={() => setPlatform(p)}
                      className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all text-left ${platform === p ? "bg-violet-600 text-white border-violet-600" : "bg-gray-50 text-gray-600 border-gray-100 hover:border-gray-300"}`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-2 block">
                  Script Length
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {lengths.map((l) => (
                    <button
                      key={l}
                      onClick={() => setLength(l)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${length === l ? "bg-violet-600 text-white border-violet-600" : "bg-gray-50 text-gray-600 border-gray-100 hover:border-gray-300"}`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleGenerate}
                disabled={!topic || isPending}
                className="w-full py-3 rounded-xl bg-violet-600 text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                {isPending ? (
                  <>
                    <Loader size="sm" /> Writing
                    Script...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} /> Generate Script
                  </>
                )}
              </motion.button>
            </div>

            {script && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Actions
                </p>
                <button
                  onClick={copyAll}
                  className="w-full flex items-center gap-2.5 px-4 py-3 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition-all"
                >
                  {copied ? <Check size={15} /> : <Copy size={15} />}
                  {copied ? "Copied!" : "Copy Full Script"}
                </button>
                <button
                  onClick={handleGenerate}
                  className="w-full flex items-center gap-2.5 px-4 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-all"
                >
                  <RefreshCw size={15} /> Regenerate
                </button>
              </div>
            )}
          </div>

          {/* Output */}
          <div className="lg:col-span-3 mb-30">
            <AnimatePresence mode="wait">
              {!script && !isPending && !isError && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center justify-center text-center min-h-96"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
                    <Video size={28} className="text-gray-300" />
                  </div>
                  <p className="text-sm font-semibold text-gray-400">
                    Your labeled script will appear here
                  </p>
                  <p className="text-xs text-gray-300 mt-1">
                    Each section color-coded for easy on-camera reading
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
                    <Video
                      size={18}
                      className="absolute inset-0 m-auto text-violet-500"
                    />
                  </div>
                  <p className="text-sm font-semibold text-gray-600">
                    Crafting your hook...
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Building a scroll-stopping script
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
                    Failed to generate script
                  </p>
                  <button
                    onClick={handleGenerate}
                    className="mt-4 px-4 py-2 bg-violet-600 text-white rounded-xl text-xs font-bold"
                  >
                    Try Again
                  </button>
                </motion.div>
              )}

              {script && !isPending && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-gray-900">
                        {script.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Hook type:{" "}
                        <span className="text-violet-600 font-medium">
                          {script.hookType}
                        </span>
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-violet-50 text-violet-600 font-medium border border-violet-100">
                        {platform}
                      </span>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-gray-50 text-gray-600 font-medium border border-gray-100">
                        {length}
                      </span>
                    </div>
                  </div>

                  {script.sections?.map((section, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${sectionColors[section.label] || "bg-gray-50 border-gray-200 text-gray-600"}`}
                        >
                          {section.label}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {i === 0 ? "First 3 seconds" : ""}
                        </span>
                      </div>
                      <p className="text-sm text-gray-800 leading-relaxed">
                        {section.content}
                      </p>
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
