import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Sparkles,
  Flame,
  ChevronDown,
  ChevronUp,
  Calendar,
  TrendingUp,
  Shield,
  Star,
  Zap,
  ListChecks,
  RefreshCw,
} from "lucide-react";

import Loader from "../../../utils/Loader";
import CopyButton from "../../../components/ui/CopyButton";

const PhaseCard = ({ phase, index }) => {
  const colors = [
    {
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      text: "text-emerald-700",
      badge: "bg-emerald-100 text-emerald-700",
    },
    {
      bg: "bg-blue-50",
      border: "border-blue-100",
      text: "text-blue-700",
      badge: "bg-blue-100 text-blue-700",
    },
    {
      bg: "bg-purple-50",
      border: "border-purple-100",
      text: "text-purple-700",
      badge: "bg-purple-100 text-purple-700",
    },
  ];
  const c = colors[index % colors.length];
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      className={`p-4 rounded-xl border ${c.border} ${c.bg}`}
    >
      <div className="flex items-center justify-between mb-2">
        <p className={`text-xs font-bold ${c.text} uppercase tracking-wide`}>
          {phase.phase}
        </p>
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.badge}`}
        >
          {phase.days}
        </span>
      </div>
      <p className="text-sm font-semibold text-gray-800 mb-1">{phase.goal}</p>
      <p className="text-xs text-gray-500">{phase.action}</p>
    </motion.div>
  );
};

const DailyTask = ({ task, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.05 }}
    className="flex items-start gap-3 py-2.5 border-b border-gray-50 last:border-0"
  >
    <div className="w-5 h-5 rounded-full bg-rose-50 flex items-center justify-center shrink-0 mt-0.5">
      <span className="text-[10px] font-bold text-rose-500">{index + 1}</span>
    </div>
    <div className="flex-1">
      <p className="text-sm text-gray-700 leading-relaxed">{task.task}</p>
      <p className="text-xs text-gray-400 mt-0.5">{task.trigger}</p>
    </div>
    <span className="text-[10px] text-gray-300 shrink-0 pt-0.5">
      {task.time}
    </span>
  </motion.div>
);

import { useHabitCoach } from "../../../hooks/toolsApi.hook";

function AIHabitCoach() {
  const [habitGoal, setHabitGoal] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [habitType, setHabitType] = useState("Build");
  const [reminderTime, setReminderTime] = useState("08:00");
  const [result, setResult] = useState(null);
  const [expandedSection, setExpandedSection] = useState("phases");

  const { mutate: generateHabitPlan, isPending, isError } = useHabitCoach();

  const handleGenerate = () => {
    if (!habitGoal.trim()) return;
    setResult(null);

    generateHabitPlan(
      { habitGoal, habitType, difficulty, reminderTime },
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

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-rose-50 flex items-center justify-center">
              <Target size={16} className="text-rose-600" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">AI Habit Coach</h1>
          </div>
          <p className="text-sm text-gray-500 ml-10">
            Build habits that actually stick with psychology-backed micro-plans.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">
                Habit Details
              </label>

              <div>
                <p className="text-xs text-gray-500 mb-2">Your Habit Goal</p>
                <input
                  type="text"
                  value={habitGoal}
                  onChange={(e) => setHabitGoal(e.target.value)}
                  placeholder="e.g. wake up at 6AM, go to gym, read daily, meditate..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-50 transition-all"
                />
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-2.5">Habit Type</p>
                <div className="flex gap-1.5 p-1 bg-gray-50 rounded-xl w-fit">
                  {["Build", "Break", "Improve"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setHabitType(t)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${habitType === t ? "bg-rose-600 text-white shadow-sm" : "text-gray-500 hover:bg-gray-100"}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-2.5">Difficulty Level</p>
                <div className="flex gap-2">
                  {[
                    { label: "Easy", desc: "21 days", color: "emerald" },
                    { label: "Medium", desc: "30 days", color: "amber" },
                    { label: "Hard", desc: "66 days", color: "red" },
                  ].map(({ label, desc, color }) => (
                    <button
                      key={label}
                      onClick={() => setDifficulty(label)}
                      className={`flex-1 py-2.5 rounded-xl border-2 text-xs font-medium transition-all ${
                        difficulty === label
                          ? `border-${color}-400 bg-${color}-50 text-${color}-700`
                          : "border-gray-100 text-gray-500 hover:border-gray-200"
                      }`}
                    >
                      {label}
                      <span className="block text-[10px] opacity-60 mt-0.5">
                        {desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-2">
                  Daily Reminder Time
                </p>
                <input
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-50 transition-all"
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleGenerate}
                disabled={!habitGoal.trim() || isPending}
                className="w-full py-3 rounded-xl bg-rose-600 text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-rose-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                {isPending ? (
                  <>
                    <Loader size="sm" />
                    Creating your plan...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Generate Habit Plan
                  </>
                )}
              </motion.button>
            </div>
          </div>

          {/* Output */}
          <div className="space-y-4 mb-30">
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
                    <Flame size={28} className="text-gray-300" />
                  </div>
                  <p className="text-sm font-semibold text-gray-400">
                    Your habit plan will appear here
                  </p>
                  <p className="text-xs text-gray-300 mt-1">
                    Enter your goal and click Generate
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
                    <div className="absolute inset-0 rounded-full border-4 border-rose-100" />
                    <div className="absolute inset-0 rounded-full border-4 border-rose-500 border-t-transparent animate-spin" />
                    <Target
                      size={18}
                      className="absolute inset-0 m-auto text-rose-500"
                    />
                  </div>
                  <p className="text-sm font-semibold text-gray-600">
                    Designing your behavior plan...
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Applying psychology principles
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
                    Failed to generate habit plan
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
                  {/* Header stats */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <h2 className="text-sm font-bold text-gray-900 mb-1">
                      {result.habitName}
                    </h2>
                    <p className="text-xs text-gray-400 mb-3">
                      {result.keyPrinciple}
                    </p>
                    <div className="flex gap-3">
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Calendar size={12} /> {result.totalDays} day program
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <TrendingUp size={12} /> {result.successRate}
                      </div>
                    </div>
                  </div>

                  {/* Phases */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <button
                      onClick={() => toggle("phases")}
                      className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <TrendingUp size={15} className="text-rose-500" />
                        <span className="text-sm font-semibold text-gray-800">
                          Program Phases
                        </span>
                        <span className="text-xs bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full font-medium">
                          {result.phases.length}
                        </span>
                      </div>
                      {expandedSection === "phases" ? (
                        <ChevronUp size={14} className="text-gray-400" />
                      ) : (
                        <ChevronDown size={14} className="text-gray-400" />
                      )}
                    </button>
                    {expandedSection === "phases" && (
                      <div className="px-5 pb-5 space-y-3">
                        {result.phases.map((phase, i) => (
                          <PhaseCard key={i} phase={phase} index={i} />
                        ))}
                        <div className="p-3 bg-amber-50 rounded-xl mt-2">
                          <p className="text-xs text-amber-700 font-medium">
                            Week 1 Challenge
                          </p>
                          <p className="text-xs text-amber-600 mt-1">
                            {result.weekOneChallenge}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Daily Tasks */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <button
                      onClick={() => toggle("tasks")}
                      className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <ListChecks size={15} className="text-emerald-500" />
                        <span className="text-sm font-semibold text-gray-800">
                          Daily Micro-Tasks
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CopyButton
                          text={result.dailyMicroTasks
                            .map((t) => `• ${t.task} (${t.time})`)
                            .join("\n")}
                        />
                        {expandedSection === "tasks" ? (
                          <ChevronUp size={14} className="text-gray-400" />
                        ) : (
                          <ChevronDown size={14} className="text-gray-400" />
                        )}
                      </div>
                    </button>
                    {expandedSection === "tasks" && (
                      <div className="px-5 pb-4">
                        {result.dailyMicroTasks.map((task, i) => (
                          <DailyTask key={i} task={task} index={i} />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Rewards & Obstacle */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Star size={14} className="text-amber-500" />
                      <span className="text-sm font-semibold text-gray-800">
                        Reward System
                      </span>
                    </div>
                    <div className="space-y-2 mb-4">
                      {result.rewardSystem.map((reward, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2.5 text-xs text-gray-600"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                          {reward}
                        </div>
                      ))}
                    </div>
                    <div className="p-3 bg-rose-50 rounded-xl border border-rose-100">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Shield size={12} className="text-rose-500" />
                        <p className="text-xs text-rose-700 font-medium">
                          If You Miss a Day
                        </p>
                      </div>
                      <p className="text-xs text-rose-600">
                        {result.obstacleStrategy}
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

export default AIHabitCoach;
