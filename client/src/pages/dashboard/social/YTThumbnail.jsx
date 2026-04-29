import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles,  Download, RefreshCw } from "lucide-react";
import { FaYoutube as Youtube } from "react-icons/fa6";

import Loader from "../../../utils/Loader";
const emotions = [
  "Shock",
  "Curiosity",
  "Excitement",
  "Fear",
  "Inspiration",
  "Humor",
  "FOMO",
];

const styles = [
  "Cinematic",
  "Minimalist",
  "Bold & Colorful",
  "Dark & Moody",
  "Retro",
  "Neon / Glitch",
  "Comic Book",
  "Photorealistic",
];

const aspectRatios = [
  { label: "16:9 — YouTube", value: "16:9", w: 768, h: 432 },
  { label: "4:3 — Classic", value: "4:3", w: 768, h: 576 },
  { label: "1:1 — Square", value: "1:1", w: 576, h: 576 },
  { label: "9:16 — Shorts", value: "9:16", w: 432, h: 768 },
];

const HF_MODELS = [
  "black-forest-labs/FLUX.1-schnell",
  "stabilityai/stable-diffusion-xl-base-1.0",
];

import { useThumbnailGenerator } from "../../../hooks/toolsApi.hook";

export default function YTThumbnail() {
  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("Cinematic");
  const [ratio, setRatio] = useState("16:9");
  const [textOverlay, setTextOverlay] = useState("");
  const [colorScheme, setColorScheme] = useState("");
  const [emotion, setEmotion] = useState("Curiosity");

  const [concept, setConcept] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);

  const { mutate: generateThumbnail, isPending, isError } = useThumbnailGenerator();

  const reset = () => {
    setConcept(null);
    setImgUrl(null);
  };

  const handleGenerate = () => {
    if (!title.trim()) return;
    reset();

    generateThumbnail(
      { title, prompt, style, ratio, textOverlay, colorScheme, emotion },
      {
        onSuccess: (res) => {
          const data = res?.data !== undefined ? res.data : res;
          if (data) {
            if (typeof data === "string") {
              setImgUrl(data);
              setConcept({}); // Satisfy (imgUrl || concept) check
            } else {
              setImgUrl(data.imageUrl || data.imgUrl);
              setConcept(data.concept || data);
            }
          }
        },
        onError: () => {},
      },
    );
  };

  const handleRegenerateImage = () => {
    handleGenerate();
  };

  const handleDownload = () => {
    if (!imgUrl) return;
    const a = document.createElement("a");
    a.href = imgUrl;
    a.download = `thumbnail-${title.slice(0, 30).toLowerCase().replace(/\s+/g, "-")}-${Date.now()}.png`;
    a.click();
  };

  const isLoading = isPending;

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center">
              <Youtube size={16} className="text-red-600" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              YouTube Thumbnail Generator
            </h1>
          </div>
          <p className="text-sm text-gray-500 ml-10">
            More clicks start with a better thumbnail
          </p>
        </div>

        {/* Input Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-5 mb-6">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">
            Thumbnail Config
          </label>

          {/* Title */}
          <div>
            <p className="text-xs text-gray-500 mb-2">
              Video Title <span className="text-red-400">*</span>
            </p>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. I tried intermittent fasting for 30 days..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-50 transition-all"
            />
          </div>

          {/* Custom Prompt */}
          <div>
            <p className="text-xs text-gray-500 mb-2">
              Custom Image Prompt <span className="text-red-400">*</span>
            </p>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. A person standing in front of a giant clock, looking shocked, dramatic lighting..."
              rows={3}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-50 transition-all resize-none"
            />
          </div>

          {/* Text Overlay + Color Scheme */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-gray-500 mb-2">
                Text Overlay{" "}
                <span className="text-gray-400">(max 5 words)</span>
              </p>
              <input
                type="text"
                value={textOverlay}
                onChange={(e) => setTextOverlay(e.target.value)}
                placeholder="e.g. NOBODY TOLD ME THIS"
                maxLength={40}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-50 transition-all"
              />
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-2">Color Scheme</p>
              <input
                type="text"
                value={colorScheme}
                onChange={(e) => setColorScheme(e.target.value)}
                placeholder="e.g. Red bg, white text, yellow accent"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-50 transition-all"
              />
            </div>
          </div>

          {/* Style */}
          <div>
            <p className="text-xs text-gray-500 mb-2.5">Style</p>
            <div className="flex flex-wrap gap-2">
              {styles.map((s) => (
                <button
                  key={s}
                  onClick={() => setStyle(s)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                    style === s
                      ? "bg-red-600 text-white border-red-600"
                      : "bg-gray-50 text-gray-600 border-gray-100 hover:border-gray-300"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Aspect Ratio */}
          <div>
            <p className="text-xs text-gray-500 mb-2.5">Aspect Ratio</p>
            <div className="flex flex-wrap gap-2">
              {aspectRatios.map((r) => (
                <button
                  key={r.value}
                  onClick={() => setRatio(r.value)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                    ratio === r.value
                      ? "bg-red-600 text-white border-red-600"
                      : "bg-gray-50 text-gray-600 border-gray-100 hover:border-gray-300"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Emotion */}
          <div>
            <p className="text-xs text-gray-500 mb-2.5">Target Emotion</p>
            <div className="flex flex-wrap gap-2">
              {emotions.map((e) => (
                <button
                  key={e}
                  onClick={() => setEmotion(e)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                    emotion === e
                      ? "bg-red-600 text-white border-red-600"
                      : "bg-gray-50 text-gray-600 border-gray-100 hover:border-gray-300"
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerate}
            disabled={!title.trim() || !prompt.trim() || isPending}
            className="w-full py-3 rounded-xl bg-red-600 text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            {isPending ? (
              <>
                <Loader size="sm" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles size={16} />
                Generate Thumbnail
              </>
            )}
          </motion.button>
        </div>

        {/* Output */}
        <AnimatePresence mode="wait">
          {!concept && !imgUrl && !isPending && !isError && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 flex flex-col items-center justify-center text-center mb-30"
            >
              <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
                <Youtube size={28} className="text-gray-300" />
              </div>
              <p className="text-sm font-semibold text-gray-400">
                Your thumbnail will appear here
              </p>
              <p className="text-xs text-gray-300 mt-1">
                Fill in the details and click Generate
              </p>
            </motion.div>
          )}

          {isPending && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 flex flex-col items-center justify-center text-center"
            >
              <div className="relative w-16 h-16 mb-4">
                <div className="absolute inset-0 rounded-full border-4 border-red-100" />
                <div className="absolute inset-0 rounded-full border-4 border-red-500 border-t-transparent animate-spin" />
                <Youtube
                  size={18}
                  className="absolute inset-0 m-auto text-red-500"
                />
              </div>
              <p className="text-sm font-semibold text-gray-600">
                Generating your thumbnail...
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Crafting the perfect CTR-optimized design
              </p>
            </motion.div>
          )}

          {isError && !isPending && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-2xl border border-red-50 shadow-sm p-12 flex flex-col items-center justify-center text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
                <RefreshCw size={28} className="text-red-400" />
              </div>
              <p className="text-sm font-semibold text-gray-800">
                Failed to generate thumbnail
              </p>
              <button
                onClick={handleGenerate}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold"
              >
                Try Again
              </button>
            </motion.div>
          )}

          {(imgUrl || concept) && !isPending && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
            >
              <div className="aspect-video bg-gray-50 relative group">
                <img
                  src={imgUrl}
                  alt="Generated thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200" />
              </div>

              <div className="p-5 space-y-4">
                <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        Text
                      </span>
                      <span className="text-xs font-bold text-gray-800">
                        "{concept?.textOverlay || textOverlay || "N/A"}"
                      </span>
                    </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      Style
                    </span>
                    <span className="text-xs text-gray-600">{style}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      Ratio
                    </span>
                    <span className="text-xs text-gray-600">{ratio}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      Colors
                    </span>
                    <span className="text-xs text-gray-600 truncate max-w-48">
                      {concept?.colorScheme || colorScheme || "N/A"}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleDownload}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-all"
                  >
                    <Download size={15} />
                    Download Thumbnail
                  </button>
                  <button
                    onClick={handleRegenerateImage}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-all"
                    title="Regenerate image"
                  >
                    <RefreshCw size={15} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
