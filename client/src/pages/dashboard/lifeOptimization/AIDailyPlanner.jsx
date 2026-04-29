import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Sparkles,
  X,
  Clock,
  Zap,
  Moon,
  Sun,
  Coffee,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  AlarmClock,
} from "lucide-react";

import Loader from "../../../utils/Loader";
import CopyButton from "../../../components/ui/CopyButton";
import { useDailyPlanner } from "../../../hooks/toolsApi.hook";

const EnergyBtn = ({ label, icon: Icon, active, onClick, color }) => (
  <button
    onClick={onClick}
    className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl border-2 transition-all text-xs font-medium ${
      active
        ? `border-${color}-400 bg-${color}-50 text-${color}-700`
        : "border-gray-100 text-gray-500 hover:border-gray-200 hover:bg-gray-50"
    }`}
  >
    <Icon size={16} />
    {label}
  </button>
);

const BlockItem = ({ block, index }) => {
  const colorMap = {
    "Deep Work": "bg-indigo-50 border-indigo-100 text-indigo-700",
    Break: "bg-emerald-50 border-emerald-100 text-emerald-700",
    "Low Energy": "bg-amber-50 border-amber-100 text-amber-700",
    Admin: "bg-gray-50 border-gray-200 text-gray-600",
    Meeting: "bg-purple-50 border-purple-100 text-purple-700",
    Exercise: "bg-rose-50 border-rose-100 text-rose-700",
  };

  const typeColor = colorMap[block.type] || colorMap["Admin"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="flex items-start gap-3 p-3 rounded-xl border border-gray-50 hover:border-gray-100 hover:bg-gray-50/50 transition-all"
    >
      <div className="text-xs font-bold text-gray-400 w-14 shrink-0 pt-0.5">
        {block.time}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
          <p className="text-sm font-semibold text-gray-800">{block.task}</p>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${typeColor}`}
          >
            {block.type}
          </span>
        </div>
        <p className="text-xs text-gray-400">{block.tip}</p>
      </div>
      <div className="text-xs text-gray-300 shrink-0 pt-0.5">
        {block.duration}
      </div>
    </motion.div>
  );
};

function AIDailyPlanner() {
  const [tasks, setTasks] = useState([""]);
  const [energyPattern, setEnergyPattern] = useState("Morning");
  const [availableHours, setAvailableHours] = useState(8);
  const [startTime, setStartTime] = useState("09:00");
  const [result, setResult] = useState(null);
  const [expandedSection, setExpandedSection] = useState("schedule");
  const { mutate: generatePlan, isPending, isError } = useDailyPlanner();

  const addTask = () => setTasks([...tasks, ""]);
  const removeTask = (i) => setTasks(tasks.filter((_, idx) => idx !== i));
  const updateTask = (i, val) => {
    const t = [...tasks];
    t[i] = val;
    setTasks(t);
  };

  const handleGenerate = () => {
    const validTasks = tasks.filter((t) => t.trim());
    if (!validTasks.length) return;

    setResult(null);

    generatePlan(
      {
        tasks: validTasks,
        energyPattern,
        availableHours,
        startTime,
      },
      {
        onSuccess: (res) => {
          const planData = res?.data || res;
          if (planData) {
            setResult(planData);
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
            <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center">
              <Brain size={16} className="text-indigo-600" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              AI Daily Planner
            </h1>
          </div>
          <p className="text-sm text-gray-500 ml-10">
            Plan your day based on energy, not time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div className="space-y-5">
            {/* Tasks */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 block">
                Today's Tasks
              </label>
              <div className="space-y-2.5">
                {tasks.map((task, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-bold text-indigo-600">
                        {i + 1}
                      </span>
                    </div>
                    <input
                      type="text"
                      value={task}
                      onChange={(e) => updateTask(i, e.target.value)}
                      placeholder={`Task ${i + 1}...`}
                      className="flex-1 px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all"
                    />
                    {tasks.length > 1 && (
                      <button
                        onClick={() => removeTask(i)}
                        className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <Trash2
                          size={13}
                          className="text-gray-300 hover:text-red-400"
                        />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={addTask}
                  className="flex items-center gap-1.5 text-xs text-indigo-500 hover:text-indigo-700 font-medium mt-1 transition-colors"
                >
                  <Plus size={13} /> Add another task
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">
                Schedule Options
              </label>

              <div>
                <p className="text-xs text-gray-500 mb-2.5">Energy Pattern</p>
                <div className="flex gap-2">
                  {[
                    { label: "Morning", icon: Sun },
                    { label: "Afternoon", icon: Coffee },
                    { label: "Night", icon: Moon },
                  ].map(({ label, icon: Icon }) => (
                    <button
                      key={label}
                      onClick={() => setEnergyPattern(label)}
                      className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl border-2 transition-all text-xs font-medium ${
                        energyPattern === label
                          ? "border-indigo-400 bg-indigo-50 text-indigo-700"
                          : "border-gray-100 text-gray-500 hover:border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <Icon size={16} />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-2">Start Time</p>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all"
                  />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-2">Available Hours</p>
                  <select
                    value={availableHours}
                    onChange={(e) => setAvailableHours(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 bg-white transition-all"
                  >
                    {[4, 5, 6, 7, 8, 9, 10, 12].map((h) => (
                      <option key={h} value={h}>
                        {h} hours
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleGenerate}
                disabled={!tasks.filter((t) => t.trim()).length || isPending}
                className="w-full py-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                {isPending ? (
                  <>
                    <Loader size="sm" />
                    Building your plan...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Generate Plan
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
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center justify-center text-center min-h-96"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
                    <AlarmClock size={28} className="text-gray-300" />
                  </div>
                  <p className="text-sm font-semibold text-gray-400">
                    Your optimized plan will appear here
                  </p>
                  <p className="text-xs text-gray-300 mt-1">
                    Add tasks and click Generate Plan
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
                    <Brain
                      size={18}
                      className="absolute inset-0 m-auto text-indigo-500"
                    />
                  </div>
                  <p className="text-sm font-semibold text-gray-600">
                    Analyzing your energy pattern...
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Building an optimized schedule
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
                    <X size={28} className="text-red-400" />
                  </div>
                  <p className="text-sm font-semibold text-gray-800">
                    Failed to generate plan
                  </p>
                  <p className="text-xs text-gray-500 mt-1 mb-4">
                    There was an error connecting to the AI service.
                  </p>
                  <button
                    onClick={handleGenerate}
                    className="px-4 py-2 bg-gray-900 text-white text-xs font-semibold rounded-lg hover:bg-gray-800 transition-colors"
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
                  {/* Stats */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <p className="text-sm font-bold text-gray-900 mb-3">
                      Today's Overview
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        {
                          label: "Tasks",
                          value: result.totalTasks,
                          icon: Zap,
                          color: "indigo",
                        },
                        {
                          label: "Deep Work",
                          value: `${result.deepWorkBlocks} blocks`,
                          icon: Brain,
                          color: "purple",
                        },
                        {
                          label: "Peak Hours",
                          value: result.peakHours,
                          icon: Sun,
                          color: "amber",
                        },
                      ].map(({ label, value, icon: Icon, color }) => (
                        <div
                          key={label}
                          className={`bg-${color}-50 rounded-xl p-3 text-center`}
                        >
                          <Icon
                            size={14}
                            className={`text-${color}-500 mx-auto mb-1`}
                          />
                          <p className={`text-sm font-bold text-${color}-700`}>
                            {value}
                          </p>
                          <p className={`text-[10px] text-${color}-500`}>
                            {label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Schedule */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <button
                      onClick={() => toggle("schedule")}
                      className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Clock size={15} className="text-indigo-500" />
                        <span className="text-sm font-semibold text-gray-800">
                          Daily Schedule
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CopyButton
                          text={result.schedule
                            .map((b) => `${b.time} — ${b.task} (${b.duration})`)
                            .join("\n")}
                        />
                        {expandedSection === "schedule" ? (
                          <ChevronUp size={14} className="text-gray-400" />
                        ) : (
                          <ChevronDown size={14} className="text-gray-400" />
                        )}
                      </div>
                    </button>
                    {expandedSection === "schedule" && (
                      <div className="px-4 pb-4 space-y-1">
                        {result.schedule.map((block, i) => (
                          <BlockItem key={i} block={block} index={i} />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Insights */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <button
                      onClick={() => toggle("insights")}
                      className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Zap size={15} className="text-amber-500" />
                        <span className="text-sm font-semibold text-gray-800">
                          Productivity Insights
                        </span>
                        <span className="text-xs bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full font-medium">
                          {result.insights.length}
                        </span>
                      </div>
                      {expandedSection === "insights" ? (
                        <ChevronUp size={14} className="text-gray-400" />
                      ) : (
                        <ChevronDown size={14} className="text-gray-400" />
                      )}
                    </button>
                    {expandedSection === "insights" && (
                      <div className="px-5 pb-5 space-y-2.5">
                        {result.insights.map((insight, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-start gap-3 py-2.5 border-b border-gray-50 last:border-0"
                          >
                            <div className="w-5 h-5 rounded-full bg-amber-50 flex items-center justify-center shrink-0 mt-0.5">
                              <span className="text-[10px] font-bold text-amber-600">
                                {i + 1}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed">
                              {insight}
                            </p>
                          </motion.div>
                        ))}
                        <div className="mt-1 p-3 bg-indigo-50 rounded-xl">
                          <p className="text-xs text-indigo-700 font-medium">
                            Energy Tip
                          </p>
                          <p className="text-xs text-indigo-600 mt-1">
                            {result.energyAdvice}
                          </p>
                        </div>
                      </div>
                    )}
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

export default AIDailyPlanner;
