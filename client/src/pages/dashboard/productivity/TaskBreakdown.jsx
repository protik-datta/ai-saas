import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Target, CheckSquare, Clock, AlertTriangle, Zap, ChevronRight, Flag, Users, BarChart2, Circle, CheckCircle2, RefreshCw } from "lucide-react";

import Loader from "../../../utils/Loader";
const priorityConfig = {
  High: { color: "bg-red-50 text-red-700 border-red-100", dot: "bg-red-500" },
  Medium: {
    color: "bg-amber-50 text-amber-700 border-amber-100",
    dot: "bg-amber-400",
  },
  Low: {
    color: "bg-emerald-50 text-emerald-700 border-emerald-100",
    dot: "bg-emerald-500",
  },
};

const TaskCard = ({ task, index, checked, onToggle }) => {
  const p = priorityConfig[task.priority] || priorityConfig.Medium;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`flex items-start gap-3 p-4 rounded-xl border transition-all duration-200 ${checked ? "bg-gray-50 border-gray-100 opacity-60" : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm"}`}
    >
      <button onClick={() => onToggle(index)} className="mt-0.5 shrink-0">
        {checked ? (
          <CheckCircle2 size={18} className="text-blue-500" />
        ) : (
          <Circle
            size={18}
            className="text-gray-300 hover:text-blue-400 transition-colors"
          />
        )}
      </button>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <p
            className={`text-sm font-semibold text-gray-800 ${checked ? "line-through text-gray-400" : ""}`}
          >
            {task.title}
          </p>
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold border ${p.color}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${p.dot}`} />
            {task.priority}
          </span>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed">
          {task.description}
        </p>
        <div className="flex items-center gap-3 mt-2">
          <span className="flex items-center gap-1 text-[11px] text-gray-400">
            <Clock size={11} /> {task.estimatedTime}
          </span>
          {task.dependency && (
            <span className="flex items-center gap-1 text-[11px] text-gray-400">
              <ChevronRight size={11} /> After: {task.dependency}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const PhaseBlock = ({ phase, tasks, checkedTasks, onToggle }) => {
  const completed = tasks.filter((_, i) =>
    checkedTasks.has(`${phase}-${i}`),
  ).length;
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
            <span className="text-[10px] font-bold text-white">{phase}</span>
          </div>
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Phase {phase}
          </span>
        </div>
        <span className="text-xs text-gray-400">
          {completed}/{tasks.length}
        </span>
      </div>
      <div className="space-y-2 pl-7">
        {tasks.map((task, i) => (
          <TaskCard
            key={i}
            task={task}
            index={i}
            checked={checkedTasks.has(`${phase}-${i}`)}
            onToggle={() => onToggle(`${phase}-${i}`)}
          />
        ))}
      </div>
    </div>
  );
};

import { useTaskBreakdown } from "../../../hooks/toolsApi.hook";

function TaskBreakdown() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [timeline, setTimeline] = useState("1 week");
  const [teamSize, setTeamSize] = useState("Solo");
  const [complexity, setComplexity] = useState("Medium");
  const [result, setResult] = useState(null);
  const [checkedTasks, setCheckedTasks] = useState(new Set());

  const { mutate: generateTaskPlan, isPending, isError } = useTaskBreakdown();

  const toggleTask = (key) => {
    setCheckedTasks((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const totalTasks =
    result?.phases?.reduce((sum, p) => sum + p.tasks.length, 0) || 0;
  const completedTasks = checkedTasks.size;
  const progress = totalTasks
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;

  const handleGenerate = () => {
    if (!projectName || !description) return;
    setResult(null);
    setCheckedTasks(new Set());

    generateTaskPlan(
      { projectName, description, timeline, teamSize, complexity },
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
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center">
              <Target size={16} className="text-emerald-600" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              Task Breakdown AI
            </h1>
          </div>
          <p className="text-sm text-gray-500 ml-10">
            Describe your project and get a structured, phase-based action plan
            instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Input Panel */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">
                Project Details
              </label>

              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">
                  Project Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="e.g. E-commerce Platform"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50 transition-all"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">
                  Project Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what you want to build, key features, target users..."
                  rows={5}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50 transition-all resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1.5 block">
                    Timeline
                  </label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:border-emerald-400 bg-white transition-all"
                  >
                    {["3 days", "1 week", "2 weeks", "1 month", "3 months"].map(
                      (t) => (
                        <option key={t}>{t}</option>
                      ),
                    )}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1.5 block">
                    Team Size
                  </label>
                  <select
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:border-emerald-400 bg-white transition-all"
                  >
                    {["Solo", "2-3 people", "4-6 people", "7+ people"].map(
                      (t) => (
                        <option key={t}>{t}</option>
                      ),
                    )}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-2 block">
                  Complexity
                </label>
                <div className="flex gap-1.5">
                  {["Simple", "Medium", "Complex"].map((c) => (
                    <button
                      key={c}
                      onClick={() => setComplexity(c)}
                      className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all ${
                        complexity === c
                          ? c === "Simple"
                            ? "bg-emerald-600 text-white border-emerald-600"
                            : c === "Medium"
                              ? "bg-amber-500 text-white border-amber-500"
                              : "bg-red-500 text-white border-red-500"
                          : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleGenerate}
                disabled={!projectName || !description || isPending}
                className="w-full py-3 rounded-xl bg-emerald-600 text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                {isPending ? (
                  <>
                    <Loader size="sm" />
                    Planning Project...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Generate Task Plan
                  </>
                )}
              </motion.button>
            </div>
          </div>

          {/* Output Panel */}
          <div className="lg:col-span-3 space-y-5 mb-30">
            <AnimatePresence mode="wait">
              {!result && !isPending && !isError && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center justify-center text-center min-h-120"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
                    <CheckSquare size={28} className="text-gray-300" />
                  </div>
                  <p className="text-sm font-semibold text-gray-400">
                    Your task plan will appear here
                  </p>
                  <p className="text-xs text-gray-300 mt-1">
                    Fill in project details and click Generate
                  </p>
                </motion.div>
              )}

              {isPending && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center justify-center min-h-120"
                >
                  <div className="relative w-16 h-16 mb-4">
                    <div className="absolute inset-0 rounded-full border-4 border-emerald-100" />
                    <div className="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin" />
                    <Target
                      size={18}
                      className="absolute inset-0 m-auto text-emerald-500"
                    />
                  </div>
                  <p className="text-sm font-semibold text-gray-600">
                    AI is planning your project...
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Breaking into actionable phases
                  </p>
                </motion.div>
              )}

              {isError && !isPending && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl border border-red-50 shadow-sm p-8 flex flex-col items-center justify-center text-center min-h-120"
                >
                  <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
                    <RefreshCw size={28} className="text-red-400" />
                  </div>
                  <p className="text-sm font-semibold text-gray-800">
                    Failed to generate task plan
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
                  className="space-y-5"
                >
                  {/* Project Overview */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <p className="text-xs text-gray-500 leading-relaxed mb-4">
                      {result.projectSummary}
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-gray-50 rounded-xl p-3 text-center">
                        <Clock
                          size={14}
                          className="mx-auto text-blue-500 mb-1"
                        />
                        <p className="text-sm font-bold text-gray-800">
                          {result.estimatedHours}h
                        </p>
                        <p className="text-[10px] text-gray-400">Estimated</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3 text-center">
                        <AlertTriangle
                          size={14}
                          className={`mx-auto mb-1 ${result.riskLevel === "High" ? "text-red-500" : result.riskLevel === "Medium" ? "text-amber-500" : "text-emerald-500"}`}
                        />
                        <p className="text-sm font-bold text-gray-800">
                          {result.riskLevel}
                        </p>
                        <p className="text-[10px] text-gray-400">Risk Level</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3 text-center">
                        <CheckSquare
                          size={14}
                          className="mx-auto text-emerald-500 mb-1"
                        />
                        <p className="text-sm font-bold text-gray-800">
                          {totalTasks}
                        </p>
                        <p className="text-[10px] text-gray-400">Total Tasks</p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {completedTasks > 0 && (
                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-xs text-gray-500">
                            Progress
                          </span>
                          <span className="text-xs font-bold text-emerald-600">
                            {progress}%
                          </span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-emerald-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ type: "spring", damping: 20 }}
                          />
                        </div>
                        <p className="text-[11px] text-gray-400 mt-1">
                          {completedTasks} of {totalTasks} tasks completed
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Stack & Milestones */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Zap size={14} className="text-blue-500" />
                        <span className="text-xs font-bold text-gray-700">
                          Tech Stack
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {result.suggestedStack.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Flag size={14} className="text-emerald-500" />
                        <span className="text-xs font-bold text-gray-700">
                          Milestones
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        {result.milestones.map((m, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <div className="w-1 h-1 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                            <span className="text-xs text-gray-600">{m}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Phased Tasks */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-6">
                    <div className="flex items-center gap-2">
                      <BarChart2 size={15} className="text-emerald-500" />
                      <span className="text-sm font-bold text-gray-800">
                        Phased Action Plan
                      </span>
                    </div>
                    {result.phases.map((phase) => (
                      <PhaseBlock
                        key={phase.phaseNumber}
                        phase={phase.phaseNumber}
                        tasks={phase.tasks}
                        checkedTasks={checkedTasks}
                        onToggle={toggleTask}
                      />
                    ))}
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

export default TaskBreakdown;
