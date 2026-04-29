import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, Sparkles, CheckCircle2, AlertCircle, TrendingUp, User, Briefcase, ChevronRight, X, RefreshCw } from "lucide-react";

// ── Sub-components ──────────────────────────────────────────

import Loader from "../../../utils/Loader";
const ScoreRing = ({ score, label, color }) => {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative w-16 h-16">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 72 72">
          <circle
            cx="36"
            cy="36"
            r={radius}
            fill="none"
            stroke="#f1f5f9"
            strokeWidth="5"
          />
          <circle
            cx="36"
            cy="36"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="5"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1s ease" }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-800">
          {score}
        </span>
      </div>
      <span className="text-[10px] text-gray-500 text-center leading-tight">
        {label}
      </span>
    </div>
  );
};

const SkillBadge = ({ skill, level }) => {
  const colors = {
    Expert: "bg-blue-50 text-blue-700 border-blue-100",
    Proficient: "bg-emerald-50 text-emerald-700 border-emerald-100",
    Beginner: "bg-amber-50 text-amber-700 border-amber-100",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${colors[level] || colors.Beginner}`}
    >
      {skill}
      <span className="opacity-60 text-[10px]">{level}</span>
    </span>
  );
};

const SuggestionItem = ({ type, text }) => {
  const isStrength = type === "strength";
  return (
    <div
      className={`flex items-start gap-2.5 p-3 rounded-xl ${isStrength ? "bg-emerald-50" : "bg-amber-50"}`}
    >
      {isStrength ? (
        <CheckCircle2 size={15} className="text-emerald-600 mt-0.5 shrink-0" />
      ) : (
        <AlertCircle size={15} className="text-amber-600 mt-0.5 shrink-0" />
      )}
      <span className="text-xs text-gray-700 leading-relaxed">{text}</span>
    </div>
  );
};

// ── Main Component ───────────────────────────────────────────

import { useResumeAnalyzer } from "../../../hooks/toolsApi.hook";

function AIResume() {
  const [file, setFile] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef(null);

  const { mutate: analyzeResume, isPending, isError } = useResumeAnalyzer();

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (
      dropped &&
      (dropped.type === "application/pdf" || dropped.name.endsWith(".docx"))
    ) {
      setFile(dropped);
      setResult(null);
    }
  };

  const handleAnalyze = () => {
    if (!file || !jobTitle) return;
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("jobTitle", jobTitle);
    if (jobDescription) formData.append("jobDescription", jobDescription);

    analyzeResume(formData, {
      onSuccess: (res) => {
        const data = res?.data || res;
        if (data) {
          setResult(data);
        }
      },
      onError: () => {},
    });
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center">
              <FileText size={16} className="text-blue-600" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              AI Resume Analyzer
            </h1>
          </div>
          <p className="text-sm text-gray-500 ml-10">
            Upload your resume and get instant AI-powered feedback tailored to
            your target role.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ── Input Panel ── */}
          <div className="space-y-5">
            {/* File Upload */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 block">
                Resume File
              </label>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
                className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200
                  ${
                    dragOver
                      ? "border-blue-400 bg-blue-50"
                      : file
                        ? "border-emerald-300 bg-emerald-50"
                        : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                  }`}
              >
                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdf,.docx"
                  className="hidden"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                    setResult(null);
                  }}
                />
                {file ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                      <FileText size={18} className="text-emerald-600" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-gray-800 truncate max-w-45">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                        setResult(null);
                      }}
                      className="ml-auto p-1 rounded-lg hover:bg-emerald-100 transition-colors"
                    >
                      <X size={14} className="text-emerald-600" />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload size={24} className="mx-auto text-gray-300 mb-2" />
                    <p className="text-sm text-gray-500">
                      Drop your resume here or{" "}
                      <span className="text-blue-600 font-medium">browse</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      PDF or DOCX supported
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Job Details */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">
                Target Position
              </label>

              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">
                  Job Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Senior React Developer"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">
                  Job Description{" "}
                  <span className="text-gray-300">(optional)</span>
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description for more accurate analysis..."
                  rows={5}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all resize-none"
                />
              </div>


              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleAnalyze}
                disabled={!file || !jobTitle || isPending}
                className="w-full py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                {isPending ? (
                  <>
                    <Loader size="sm" /> Analyzing
                    Resume...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} /> Analyze with AI
                  </>
                )}
              </motion.button>
            </div>
          </div>

          {/* ── Output Panel ── */}
          <div className="space-y-5 mb-30">
            <AnimatePresence mode="wait">
              {!result && !isPending && !isError && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center justify-center text-center h-full min-h-100"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
                    <TrendingUp size={28} className="text-gray-300" />
                  </div>
                  <p className="text-sm font-semibold text-gray-400">
                    Your analysis will appear here
                  </p>
                  <p className="text-xs text-gray-300 mt-1">
                    Upload a resume and click Analyze
                  </p>
                </motion.div>
              )}

              {isPending && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center justify-center min-h-100"
                >
                  <div className="relative w-16 h-16 mb-4">
                    <div className="absolute inset-0 rounded-full border-4 border-blue-100" />
                    <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
                    <Sparkles
                      size={20}
                      className="absolute inset-0 m-auto text-blue-600"
                    />
                  </div>
                  <p className="text-sm font-semibold text-gray-600">
                    AI is reviewing your resume...
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    This takes a few seconds
                  </p>
                </motion.div>
              )}

              {isError && !isPending && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl border border-red-50 shadow-sm p-8 flex flex-col items-center justify-center text-center min-h-100"
                >
                  <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
                    <RefreshCw size={28} className="text-red-400" />
                  </div>
                  <p className="text-sm font-semibold text-gray-800">
                    Failed to analyze resume
                  </p>
                  <button
                    onClick={handleAnalyze}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
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
                  className="space-y-5"
                >
                  {/* Overall Score */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                            <User size={13} className="text-blue-600" />
                          </div>
                          <span className="text-sm font-bold text-gray-900">
                            {result.candidateName}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 ml-9">
                          for {jobTitle}
                        </p>
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-3xl font-black ${
                            result.overallScore >= 75
                              ? "text-emerald-600"
                              : result.overallScore >= 50
                                ? "text-amber-500"
                                : "text-red-500"
                          }`}
                        >
                          {result.overallScore}
                        </div>
                        <div className="text-[10px] text-gray-400 font-medium">
                          Overall Score
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-gray-50">
                      <ScoreRing
                        score={result.scores.atsCompatibility}
                        label="ATS"
                        color="#3b82f6"
                      />
                      <ScoreRing
                        score={result.scores.skillsMatch}
                        label="Skills"
                        color="#10b981"
                      />
                      <ScoreRing
                        score={result.scores.experienceRelevance}
                        label="Experience"
                        color="#f59e0b"
                      />
                      <ScoreRing
                        score={result.scores.presentationQuality}
                        label="Presentation"
                        color="#8b5cf6"
                      />
                    </div>

                    <p className="text-xs text-gray-500 mt-4 leading-relaxed bg-gray-50 rounded-xl p-3">
                      {result.summary}
                    </p>
                  </div>

                  {/* Skills */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                      Detected Skills
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {result.skills.map((s, i) => (
                        <SkillBadge key={i} skill={s.name} level={s.level} />
                      ))}
                    </div>
                  </div>

                  {/* Strengths & Improvements */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                      Feedback
                    </p>
                    {result.strengths.map((s, i) => (
                      <SuggestionItem
                        key={`str-${i}`}
                        type="strength"
                        text={s}
                      />
                    ))}
                    {result.improvements.map((s, i) => (
                      <SuggestionItem
                        key={`imp-${i}`}
                        type="improvement"
                        text={s}
                      />
                    ))}
                  </div>

                  {/* Recommended Roles */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                      Also Suitable For
                    </p>
                    <div className="space-y-2">
                      {result.recommendedRoles.map((role, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                        >
                          <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center">
                            <Briefcase size={12} className="text-blue-600" />
                          </div>
                          <span className="text-sm text-gray-700">{role}</span>
                          <ChevronRight
                            size={14}
                            className="text-gray-300 ml-auto"
                          />
                        </div>
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

export default AIResume;
