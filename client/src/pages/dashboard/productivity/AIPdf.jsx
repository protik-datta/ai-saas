import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, Sparkles, X, BookOpen, AlignLeft, List, Tag, Clock, ChevronDown, ChevronUp, RefreshCw } from "lucide-react";

import Loader from "../../../utils/Loader";
import CopyButton from "../../../components/ui/CopyButton";

const KeyPointItem = ({ point, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.05 }}
    className="flex items-start gap-3 py-2.5 border-b border-gray-50 last:border-0"
  >
    <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
      <span className="text-[10px] font-bold text-blue-600">{index + 1}</span>
    </div>
    <p className="text-sm text-gray-700 leading-relaxed">{point}</p>
  </motion.div>
);

const SummaryLengthBtn = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${active ? "bg-blue-600 text-white shadow-sm" : "text-gray-500 hover:bg-gray-100"}`}
  >
    {label}
  </button>
);

import { usePdfSummarizer } from "../../../hooks/toolsApi.hook";

function AIPdf() {
  const [file, setFile] = useState(null);
  const [summaryLength, setSummaryLength] = useState("Medium");
  const [language, setLanguage] = useState("English");
  const [focus, setFocus] = useState("");
  const [result, setResult] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [expandedSection, setExpandedSection] = useState("summary");
  const fileRef = useRef(null);

  const lengthMap = {
    Short: "2-3 sentences",
    Medium: "5-7 sentences",
    Detailed: "10-12 sentences",
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped?.type === "application/pdf") setFile(dropped);
  };

  const { mutate: summarizePdf, isPending, isError } = usePdfSummarizer();

  const handleSummarize = () => {
    if (!file) return;
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("summaryLength", summaryLength);
    formData.append("language", language);
    if (focus) formData.append("focus", focus);

    summarizePdf(formData, {
      onSuccess: (res) => {
        const data = res?.data || res;
        if (data) {
          setResult(data);
        }
      },
      onError: () => {},
    });
  };

  const toggle = (section) =>
    setExpandedSection(expandedSection === section ? null : section);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center">
              <BookOpen size={16} className="text-purple-600" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              AI PDF Summarizer
            </h1>
          </div>
          <p className="text-sm text-gray-500 ml-10">
            Upload any PDF and get a structured, intelligent summary in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div className="space-y-5">
            {/* File Upload */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 block">
                PDF Document
              </label>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
                className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${dragOver ? "border-purple-400 bg-purple-50" : file ? "border-emerald-300 bg-emerald-50" : "border-gray-200 hover:border-purple-300 hover:bg-gray-50"}`}
              >
                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                {file ? (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                      <FileText size={18} className="text-red-500" />
                    </div>
                    <div className="text-left flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {(file.size / 1024).toFixed(1)} KB · PDF
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                        setResult(null);
                      }}
                      className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <X size={14} className="text-gray-400" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center mx-auto mb-3">
                      <Upload size={20} className="text-purple-500" />
                    </div>
                    <p className="text-sm text-gray-500">
                      Drop your PDF here or{" "}
                      <span className="text-purple-600 font-medium">
                        browse
                      </span>
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      PDF files only · Max 25MB
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Options */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">
                Summary Options
              </label>

              <div>
                <p className="text-xs text-gray-500 mb-2">Summary Length</p>
                <div className="flex gap-1.5 p-1 bg-gray-50 rounded-xl w-fit">
                  {["Short", "Medium", "Detailed"].map((l) => (
                    <SummaryLengthBtn
                      key={l}
                      label={l}
                      active={summaryLength === l}
                      onClick={() => setSummaryLength(l)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-2">Output Language</p>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-50 bg-white transition-all"
                >
                  {[
                    "English",
                    "Bangla",
                    "Spanish",
                    "French",
                    "German",
                    "Arabic",
                    "Hindi",
                  ].map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </select>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-2">
                  Focus Area <span className="text-gray-300">(optional)</span>
                </p>
                <input
                  type="text"
                  value={focus}
                  onChange={(e) => setFocus(e.target.value)}
                  placeholder="e.g. financial data, methodology, conclusions..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-50 transition-all"
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleSummarize}
                disabled={!file || isPending}
                className="w-full py-3 rounded-xl bg-purple-600 text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                {isPending ? (
                  <>
                    <Loader size="sm" />
                    Processing PDF...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Summarize PDF
                  </>
                )}
              </motion.button>
            </div>
          </div>

          {/* Output Panel */}
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {!result && !isPending && !isError && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center justify-center text-center min-h-105"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
                    <AlignLeft size={28} className="text-gray-300" />
                  </div>
                  <p className="text-sm font-semibold text-gray-400">
                    Summary will appear here
                  </p>
                  <p className="text-xs text-gray-300 mt-1">
                    Upload a PDF and click Summarize
                  </p>
                </motion.div>
              )}

              {isPending && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center justify-center min-h-105"
                >
                  <div className="relative w-16 h-16 mb-4">
                    <div className="absolute inset-0 rounded-full border-4 border-purple-100" />
                    <div className="absolute inset-0 rounded-full border-4 border-purple-500 border-t-transparent animate-spin" />
                    <BookOpen
                      size={18}
                      className="absolute inset-0 m-auto text-purple-500"
                    />
                  </div>
                  <p className="text-sm font-semibold text-gray-600">
                    Reading your document...
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Extracting key insights
                  </p>
                </motion.div>
              )}

              {isError && !isPending && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl border border-red-50 shadow-sm p-8 flex flex-col items-center justify-center text-center min-h-105"
                >
                  <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
                    <RefreshCw size={28} className="text-red-400" />
                  </div>
                  <p className="text-sm font-semibold text-gray-800">
                    Failed to summarize PDF
                  </p>
                  <button
                    onClick={handleSummarize}
                    className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold"
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
                  {/* Doc Stats */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <h2 className="text-sm font-bold text-gray-900 mb-3 leading-tight">
                      {result.title}
                    </h2>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Clock size={12} /> {result.estimatedReadTime} min read
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <AlignLeft size={12} /> ~
                        {result.wordCount.toLocaleString()} words
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <button
                      onClick={() => toggle("summary")}
                      className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <AlignLeft size={15} className="text-purple-500" />
                        <span className="text-sm font-semibold text-gray-800">
                          Summary
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CopyButton text={result.summary} />
                        {expandedSection === "summary" ? (
                          <ChevronUp size={14} className="text-gray-400" />
                        ) : (
                          <ChevronDown size={14} className="text-gray-400" />
                        )}
                      </div>
                    </button>
                    {expandedSection === "summary" && (
                      <div className="px-5 pb-5">
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {result.summary}
                        </p>
                        <div className="mt-3 p-3 bg-purple-50 rounded-xl">
                          <p className="text-xs text-purple-700 font-medium">
                            Key Takeaway
                          </p>
                          <p className="text-xs text-purple-600 mt-1">
                            {result.conclusion}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Key Points */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <button
                      onClick={() => toggle("points")}
                      className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <List size={15} className="text-blue-500" />
                        <span className="text-sm font-semibold text-gray-800">
                          Key Points
                        </span>
                        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">
                          {result.keyPoints.length}
                        </span>
                      </div>
                      {expandedSection === "points" ? (
                        <ChevronUp size={14} className="text-gray-400" />
                      ) : (
                        <ChevronDown size={14} className="text-gray-400" />
                      )}
                    </button>
                    {expandedSection === "points" && (
                      <div className="px-5 pb-4">
                        {result.keyPoints.map((pt, i) => (
                          <KeyPointItem key={i} point={pt} index={i} />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Topics */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Tag size={14} className="text-emerald-500" />
                      <span className="text-sm font-semibold text-gray-800">
                        Topics Covered
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {result.topics.map((topic, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 bg-gray-50 text-gray-600 text-xs font-medium rounded-lg border border-gray-100"
                        >
                          {topic}
                        </span>
                      ))}
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
export default AIPdf;
