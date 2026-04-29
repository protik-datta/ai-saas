import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Sparkles, Download, Eye, EyeOff, Monitor, Smartphone, Code2, Layers, Palette, Zap, RefreshCw, ExternalLink, Copy } from "lucide-react";

import Loader from "../../../utils/Loader";
const siteTypes = [
  "SaaS Landing Page",
  "Portfolio",
  "Restaurant",
  "E-commerce",
  "Agency",
  "Blog",
  "Startup",
  "Non-profit",
];

const colorThemes = [
  { name: "Blue", primary: "#2563eb", class: "bg-blue-500" },
  { name: "Emerald", primary: "#059669", class: "bg-emerald-500" },
  { name: "Violet", primary: "#7c3aed", class: "bg-violet-500" },
  { name: "Rose", primary: "#e11d48", class: "bg-rose-500" },
  { name: "Amber", primary: "#d97706", class: "bg-amber-500" },
  { name: "Slate", primary: "#475569", class: "bg-slate-500" },
];

import { useWebsiteBuilder } from "../../../hooks/toolsApi.hook";

export default function AIWeb() {
  const [description, setDescription] = useState("");
  const [siteType, setSiteType] = useState("SaaS Landing Page");
  const [theme, setTheme] = useState(colorThemes[0]);
  const [generatedHTML, setGeneratedHTML] = useState("");
  const [viewMode, setViewMode] = useState("preview"); // preview | code
  const [deviceMode, setDeviceMode] = useState("desktop");
  const iframeRef = useRef(null);

  const { mutate: buildWebsite, isPending, isError } = useWebsiteBuilder();

  const handleGenerate = () => {
    if (!description) return;
    setGeneratedHTML("");

    buildWebsite(
      { siteType, description, primaryColor: theme.primary },
      {
        onSuccess: (res) => {
          const data = res?.data || res;
          if (data) {
            setGeneratedHTML(data);
          }
        },
        onError: () => {},
      },
    );
  };

  const handleDownload = () => {
    const blob = new Blob([generatedHTML], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${siteType.toLowerCase().replace(/\s+/g, "-")}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-sky-50 flex items-center justify-center">
              <Globe size={16} className="text-sky-600" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              AI Website Builder
            </h1>
          </div>
          <p className="text-sm text-gray-500 ml-10">
            Describe a site. Get the code. Download and deploy instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Input */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">
                Site Configuration
              </label>

              <div>
                <label className="text-xs text-gray-500 mb-2 block">
                  Site Type
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {siteTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSiteType(type)}
                      className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all text-left ${siteType === type ? "bg-sky-600 text-white border-sky-600" : "bg-gray-50 text-gray-600 border-gray-100 hover:border-gray-300"}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">
                  Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. A SaaS tool that helps developers track API errors and get instant alerts with Slack integration..."
                  rows={4}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-50 transition-all resize-none"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-2 block">
                  Color Theme
                </label>
                <div className="flex gap-2 flex-wrap">
                  {colorThemes.map((t) => (
                    <button
                      key={t.name}
                      onClick={() => setTheme(t)}
                      title={t.name}
                      className={`w-7 h-7 rounded-full ${t.class} transition-all ${theme.name === t.name ? "ring-2 ring-offset-2 ring-gray-400 scale-110" : "hover:scale-105"}`}
                    />
                  ))}
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleGenerate}
                disabled={!description || isPending}
                className="w-full py-3 rounded-xl bg-sky-600 text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-sky-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                {isPending ? (
                  <>
                    <Loader size="sm" />
                    Building Site...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Generate Site
                  </>
                )}
              </motion.button>
            </div>

            {generatedHTML && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Actions
                </p>
                <button
                  onClick={handleDownload}
                  className="w-full flex items-center gap-2.5 px-4 py-3 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-all"
                >
                  <Download size={15} /> Download HTML File
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

          {/* Preview */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {!generatedHTML && !isPending && !isError && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center justify-center text-center min-h-130"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
                    <Monitor size={28} className="text-gray-300" />
                  </div>
                  <p className="text-sm font-semibold text-gray-400">
                    Live preview will appear here
                  </p>
                  <p className="text-xs text-gray-300 mt-1">
                    Describe your site and click Generate
                  </p>
                </motion.div>
              )}

              {isPending && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center justify-center min-h-130"
                >
                  <div className="relative w-16 h-16 mb-4">
                    <div className="absolute inset-0 rounded-full border-4 border-sky-100" />
                    <div className="absolute inset-0 rounded-full border-4 border-sky-500 border-t-transparent animate-spin" />
                    <Code2
                      size={18}
                      className="absolute inset-0 m-auto text-sky-500"
                    />
                  </div>
                  <p className="text-sm font-semibold text-gray-600">
                    Generating your website...
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Writing HTML, CSS & JavaScript
                  </p>
                </motion.div>
              )}

              {isError && !isPending && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl border border-red-50 shadow-sm p-8 flex flex-col items-center justify-center text-center min-h-130"
                >
                  <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
                    <RefreshCw size={28} className="text-red-400" />
                  </div>
                  <p className="text-sm font-semibold text-gray-800">
                    Failed to build website
                  </p>
                  <button
                    onClick={handleGenerate}
                    className="mt-4 px-4 py-2 bg-sky-600 text-white rounded-xl text-xs font-bold"
                  >
                    Try Again
                  </button>
                </motion.div>
              )}
              {generatedHTML && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  {/* Toolbar */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-3 flex items-center justify-between">
                    <div className="flex gap-1.5 p-1 bg-gray-50 rounded-xl">
                      <button
                        onClick={() => setViewMode("preview")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${viewMode === "preview" ? "bg-white text-gray-800 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                      >
                        <Eye size={12} /> Preview
                      </button>
                      <button
                        onClick={() => setViewMode("code")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${viewMode === "code" ? "bg-white text-gray-800 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                      >
                        <Code2 size={12} /> Code
                      </button>
                    </div>
                    <div className="flex gap-1.5 p-1 bg-gray-50 rounded-xl">
                      <button
                        onClick={() => setDeviceMode("desktop")}
                        className={`p-1.5 rounded-lg transition-all ${deviceMode === "desktop" ? "bg-white shadow-sm text-sky-600" : "text-gray-400 hover:text-gray-600"}`}
                      >
                        <Monitor size={14} />
                      </button>
                      <button
                        onClick={() => setDeviceMode("mobile")}
                        className={`p-1.5 rounded-lg transition-all ${deviceMode === "mobile" ? "bg-white shadow-sm text-sky-600" : "text-gray-400 hover:text-gray-600"}`}
                      >
                        <Smartphone size={14} />
                      </button>
                    </div>
                  </div>

                  {viewMode === "preview" ? (
                    <div
                      className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 ${deviceMode === "mobile" ? "max-w-sm mx-auto" : "w-full"}`}
                    >
                      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-gray-50 border-b border-gray-100">
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                        </div>
                        <div className="flex-1 mx-3 bg-white rounded-md px-2.5 py-1 text-[10px] text-gray-400 border border-gray-200">
                          your-site.com
                        </div>
                        <ExternalLink size={12} className="text-gray-400" />
                      </div>
                      <iframe
                        ref={iframeRef}
                        srcDoc={generatedHTML}
                        className="w-full border-0"
                        style={{ height: "460px" }}
                        title="Generated Website Preview"
                      />
                    </div>
                  ) : (
                    <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-800">
                        <span className="text-[11px] text-gray-500 font-mono">
                          index.html
                        </span>
                        <button
                          onClick={() =>
                            navigator.clipboard.writeText(generatedHTML)
                          }
                          className="flex items-center gap-1 text-[11px] text-gray-500 hover:text-gray-300 transition-colors"
                        >
                          <Copy size={11} /> Copy all
                        </button>
                      </div>
                      <pre className="p-4 overflow-auto text-[11px] text-gray-300 font-mono leading-relaxed max-h-115">
                        {generatedHTML}
                      </pre>
                    </div>
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
