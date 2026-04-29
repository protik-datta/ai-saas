import React, { useState, useMemo, useRef, useEffect } from "react";
import { tools } from "../../lib/dashboardData";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";

// ─── Flatten all tools into one array for search ───────────────────────────
const allTools = tools.flatMap((cat) =>
  cat.tools.map((t) => ({ ...t, categoryLabel: cat.label })),
);

const CATEGORIES = [
  { key: "All", label: "All" },
  { key: "Productivity", label: "Productivity" },
  { key: "Web", label: "Web Tools" },
  { key: "Business", label: "Business" },
  { key: "Social Media", label: "Social Media" },
  { key: "Life Optimization", label: "Life" },
];

// ─── Highlight matching text in search results ─────────────────────────────
const Highlight = ({ text, query }) => {
  if (!query) return <span>{text}</span>;
  const regex = new RegExp(
    `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi",
  );
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span key={i} className="text-[#5044E5] font-semibold">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </span>
  );
};

// ─── Stats ─────────────────────────────────────────────────────────────────
const STATS = [
  { label: "Total Tools", value: "18", sub: "All active" },
  { label: "Categories", value: "5", sub: "Organized" },
  { label: "Easy Tools", value: "15", sub: "Beginner friendly" },
  { label: "Pro Avg", value: "$12", sub: "per month" },
];

// ═══════════════════════════════════════════════════════════════════════════
const Dashboard = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  // ── Close dropdown on outside click ──────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Dropdown search results (live) ───────────────────────────────────────
  const dropdownResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allTools
      .filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.tagline.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q),
      )
      .slice(0, 8);
  }, [query]);

  // ── Main grid results ─────────────────────────────────────────────────────
  const gridTools = useMemo(() => {
    let list = allTools;

    // Filter by category tab
    if (activeCategory !== "All") {
      list = list.filter(
        (t) =>
          t.categoryLabel === activeCategory || t.category === activeCategory,
      );
    }

    // Filter by search query
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.tagline.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q),
      );
    }

    return list;
  }, [query, activeCategory]);

  const handleTabClick = (key) => {
    setActiveCategory(key);
    setQuery("");
    setDropdownOpen(false);
  };

  const handleDropdownSelect = (tool) => {
    setQuery(tool.name);
    setDropdownOpen(false);
    inputRef.current?.blur();
  };

  const handleClear = () => {
    setQuery("");
    setDropdownOpen(false);
    inputRef.current?.focus();
  };

  const handleToolClick = (tool) => {
    navigate(`/dashboard/tools/${tool.slug}`);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 min-h-screen">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100 px-6 pt-6 pb-0 sticky top-0 z-10">
        <div className="flex items-center justify-between gap-4 mb-4">
          {/* Greeting */}
          <div>
            <h1 className="text-[18px] font-bold text-gray-900 leading-tight">
              Good morning 👋
            </h1>
            <p className="text-[12px] text-gray-400 mt-0.5">
              18 AI tools ready to use
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full max-w-xs" ref={searchRef}>
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setDropdownOpen(true);
              }}
              onFocus={() => query && setDropdownOpen(true)}
              placeholder="Search tools..."
              className="w-full pl-9 pr-8 py-2 text-[13px] border border-gray-200 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#5044E5] focus:ring-2 focus:ring-[#5044E5]/10 transition-all"
            />
            {query && (
              <button
                onClick={handleClear}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={14} />
              </button>
            )}

            {/* ── Live Dropdown ──────────────────────────────────────────── */}
            {dropdownOpen && query && (
              <div className="absolute top-[calc(100%+6px)] left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden max-h-72 overflow-y-auto">
                {dropdownResults.length === 0 ? (
                  <div className="px-4 py-4 text-center text-[12px] text-gray-400">
                    No tools found for &quot;{query}&quot;
                  </div>
                ) : (
                  dropdownResults.map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => handleDropdownSelect(tool)}
                      className="w-full text-left px-4 py-2.5 hover:bg-[#EEF0FF] transition-colors border-b border-gray-50 last:border-0 flex flex-col gap-0.5"
                    >
                      <span className="text-[13px] font-medium text-gray-900">
                        <Highlight text={tool.name} query={query} />
                      </span>
                      <span className="text-[11px] text-gray-400">
                        {tool.categoryLabel || tool.category}
                      </span>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── Category Filter Tabs ──────────────────────────────────────────── */}
        <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => handleTabClick(cat.key)}
              className={`px-4 py-1.5 rounded-full text-[12px] font-medium whitespace-nowrap border transition-all ${
                activeCategory === cat.key
                  ? "bg-[#5044E5] text-white border-[#5044E5]"
                  : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:text-gray-800"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Body ───────────────────────────────────────────────────────────── */}
      <div className="px-6 py-5">
        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="bg-white border border-gray-100 rounded-xl px-4 py-3 flex flex-col gap-1"
            >
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                {s.label}
              </span>
              <span className="text-[22px] font-bold text-gray-900 leading-none">
                {s.value}
              </span>
              <span className="text-[11px] text-emerald-600 font-medium">
                ↑ {s.sub}
              </span>
            </div>
          ))}
        </div>

        {/* Section Label */}
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">
          {activeCategory === "All" ? `All Tools` : activeCategory} (
          {gridTools.length})
        </p>

        {/* Tools Grid */}
        {gridTools.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <span className="text-4xl mb-3">🔍</span>
            <p className="text-[13px]">
              No tools found. Try a different search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
            {gridTools.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                query={query}
                onClick={() => handleToolClick(tool)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Tool Card Component ────────────────────────────────────────────────────
const ToolCard = ({ tool, query, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-100 rounded-xl p-4 cursor-pointer group hover:border-[#C7C4F7] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 relative overflow-hidden flex flex-col gap-2"
    >
      {/* Top accent bar on hover */}
      <div className="absolute top-0 left-0 right-0 h-0.75 bg-[#5044E5] opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-t-xl" />

      <span className="text-[10px] font-bold text-[#5044E5] uppercase tracking-wider">
        {tool.category}
      </span>

      <h3 className="text-[13px] font-semibold text-gray-900 leading-snug">
        {query ? <Highlight text={tool.name} query={query} /> : tool.name}
      </h3>

      <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2 flex-1">
        {tool.tagline}
      </p>

      <div className="flex items-center justify-between pt-2 border-t border-gray-50 mt-auto">
        <span
          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
            tool.difficulty === "Easy"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          {tool.difficulty}
        </span>
        <span className="text-[11px] text-gray-400">{tool.proPrice}</span>
      </div>
    </div>
  );
};

export default Dashboard;
