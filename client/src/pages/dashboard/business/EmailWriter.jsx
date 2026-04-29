import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Sparkles,  Copy, Check, RefreshCw } from "lucide-react";

import Loader from "../../../utils/Loader";
const tones = [
  { id: "direct", label: "Direct", desc: "Short, confident, no fluff" },
  {
    id: "conversational",
    label: "Conversational",
    desc: "Warm, human, easy to respond to",
  },
  {
    id: "formal",
    label: "Formal",
    desc: "Professional, structured, corporate-safe",
  },
];

import { useEmailWriter } from "../../../hooks/toolsApi.hook";

export default function EmailWriter() {
  const [form, setForm] = useState({
    prospect: "",
    company: "",
    role: "",
    offering: "",
    goal: "",
    websiteUrl: "",
  });
  const [activeTone, setActiveTone] = useState("direct");
  const [emails, setEmails] = useState(null);
  const [copiedTone, setCopiedTone] = useState(null);

  const update = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

  const { mutate: generateEmail, isPending, isError } = useEmailWriter();

  const handleGenerate = () => {
    if (!form.prospect || !form.offering) return;
    setEmails(null);

    generateEmail(
      { ...form, tone: activeTone },
      {
        onSuccess: (res) => {
          const data = res?.data || res;
          if (data) {
            setEmails(data);
          }
        },
        onError: () => {},
      },
    );
  };

  const copyEmail = (tone) => {
    const email = emails[tone];
    navigator.clipboard.writeText(`Subject: ${email.subject}\n\n${email.body}`);
    setCopiedTone(tone);
    setTimeout(() => setCopiedTone(null), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center">
              <Mail size={16} className="text-indigo-600" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              Cold Email Writer
            </h1>
          </div>
          <p className="text-sm text-gray-500 ml-10">
            Personalized cold emails that actually get replies
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Input */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">
                Prospect Details
              </label>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1.5 block">
                    Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    value={form.prospect}
                    onChange={(e) => update("prospect", e.target.value)}
                    placeholder="John Smith"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1.5 block">
                    Role
                  </label>
                  <input
                    value={form.role}
                    onChange={(e) => update("role", e.target.value)}
                    placeholder="CEO"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">
                  Company
                </label>
                <input
                  value={form.company}
                  onChange={(e) => update("company", e.target.value)}
                  placeholder="Acme Corp"
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">
                  What you're offering <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={form.offering}
                  onChange={(e) => update("offering", e.target.value)}
                  placeholder="e.g. AI-powered email automation that reduces outreach time by 70%..."
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all resize-none"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">
                  Email goal
                </label>
                <input
                  value={form.goal}
                  onChange={(e) => update("goal", e.target.value)}
                  placeholder="Book a 15-min discovery call"
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">
                  Prospect website{" "}
                  <span className="text-gray-300">(optional)</span>
                </label>
                <input
                  value={form.websiteUrl}
                  onChange={(e) => update("websiteUrl", e.target.value)}
                  placeholder="https://acmecorp.com"
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all"
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleGenerate}
                disabled={!form.prospect || !form.offering || isPending}
                className="w-full py-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                {isPending ? (
                  <>
                    <Loader size="sm" /> Writing
                    Emails...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} /> Generate 3 Variants
                  </>
                )}
              </motion.button>
            </div>

            {emails && (
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
          <div className="lg:col-span-3 mb-30">
            <AnimatePresence mode="wait">
              {!emails && !isPending && !isError && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center justify-center text-center min-h-96"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
                    <Mail size={28} className="text-gray-300" />
                  </div>
                  <p className="text-sm font-semibold text-gray-400">
                    3 email variants will appear here
                  </p>
                  <p className="text-xs text-gray-300 mt-1">
                    Direct, Conversational, and Formal tones
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
                    <div className="absolute inset-0 rounded-full border-4 border-indigo-100" />
                    <div className="absolute inset-0 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
                    <Mail
                      size={18}
                      className="absolute inset-0 m-auto text-indigo-500"
                    />
                  </div>
                  <p className="text-sm font-semibold text-gray-600">
                    Personalizing your outreach...
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Writing 3 tone variants
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
                    Failed to generate emails
                  </p>
                  <button
                    onClick={handleGenerate}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                  >
                    Try Again
                  </button>
                </motion.div>
              )}

              {emails && !isPending && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  {/* Tone tabs */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-2">
                    <div className="flex gap-1">
                      {tones.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setActiveTone(t.id)}
                          className={`flex-1 flex flex-col items-center py-2 px-3 rounded-xl text-xs transition-all ${activeTone === t.id ? "bg-indigo-600 text-white" : "text-gray-500 hover:bg-gray-50"}`}
                        >
                          <span className="font-semibold">{t.label}</span>
                          <span
                            className={`text-[10px] mt-0.5 ${activeTone === t.id ? "text-indigo-200" : "text-gray-400"}`}
                          >
                            {t.desc}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {emails[activeTone] && (
                    <motion.div
                      key={activeTone}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="bg-gray-50 rounded-xl px-3 py-2 flex-1 mr-3">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                            Subject
                          </p>
                          <p className="text-sm font-semibold text-gray-900">
                            {emails[activeTone].subject}
                          </p>
                        </div>
                        <button
                          onClick={() => copyEmail(activeTone)}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-50 border border-indigo-100 text-xs text-indigo-600 font-medium hover:bg-indigo-100 transition-all shrink-0"
                        >
                          {copiedTone === activeTone ? (
                            <Check size={11} />
                          ) : (
                            <Copy size={11} />
                          )}
                          {copiedTone === activeTone ? "Copied!" : "Copy all"}
                        </button>
                      </div>
                      <div className="border-t border-gray-50 pt-4">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                          Body
                        </p>
                        <pre className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap font-sans">
                          {emails[activeTone].body}
                        </pre>
                      </div>
                    </motion.div>
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
