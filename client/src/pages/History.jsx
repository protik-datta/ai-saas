import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Trash2,
  Clock,
  Filter,
  ChevronLeft,
  ChevronRight,
  Search,
  RotateCcw,
  FileX,
  X,
  Copy,
  Check,
  Eye,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../components/common/Container";
import {
  useGetHistory,
  useDeleteHistoryItem,
  useClearAllHistory,
  useDeleteHistoryByTool,
} from "../hooks/authApi.hook";
import { formatDate, toTitle, truncate } from "../helpers/historyHelper";
import { ConfirmModal } from "../utils/ConfirmModal";
import Loader from "../utils/Loader";
import { parseToPlainText } from "../utils/textParser";

// ── Details Modal ──────────────────────────────────────────────
const DetailsModal = ({ item, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = parseToPlainText(item.output);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="bg-white w-full max-w-3xl max-h-[85vh] rounded-4xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-[#5044E5]">
              <Eye size={20} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{toTitle(item.tool)}</h3>
              <p className="text-xs text-gray-400 font-medium">{formatDate(item.createdAt)}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
          {/* Input Section */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Your Input</h4>
            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
              {parseToPlainText(item.input)}
            </div>
          </div>

          {/* Output Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">AI Result</h4>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold text-[#5044E5] hover:bg-indigo-50 transition-colors"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "Copied" : "Copy Content"}
              </button>
            </div>
            <div className="p-6 rounded-2xl bg-indigo-50/30 border border-indigo-100 text-[15px] text-gray-800 leading-relaxed whitespace-pre-wrap font-medium">
              {parseToPlainText(item.output)}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-white border border-gray-200 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-100 transition-all"
          >
            Close View
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ── History Card ───────────────────────────────────────────────
const HistoryCard = ({ item, onDelete, onView }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => onView(item)}
      className="group p-6 rounded-4xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-indigo-100 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 shrink-0 flex items-center justify-center rounded-2xl bg-indigo-50 text-[#5044E5] group-hover:scale-110 transition-transform duration-300">
            <span className="text-[14px] font-black uppercase">
              {item.tool?.charAt(0)}
            </span>
          </div>
          <div className="min-w-0">
            <span className="text-[15px] font-bold text-gray-900 truncate block">
              {toTitle(item.tool)}
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <Clock size={12} className="text-gray-400 shrink-0" />
              <span className="text-[11px] font-medium text-gray-400">
                {formatDate(item.createdAt)}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(item._id);
          }}
          className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-gray-300 hover:bg-red-50 hover:text-red-500 transition-all duration-200 opacity-0 group-hover:opacity-100"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3">
        <div className="bg-gray-50 rounded-2xl px-5 py-4 border border-transparent group-hover:border-gray-100 transition-colors">
          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">
            Preview
          </p>
          <p className="text-[13px] text-gray-600 leading-relaxed line-clamp-2">
            {truncate(parseToPlainText(item.output), 150)}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-[11px] font-bold text-[#5044E5] opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1">
          Quick View <ChevronRight size={14} />
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/dashboard/tools/${item.tool}`);
          }}
          className="text-[11px] font-bold text-gray-400 hover:text-[#5044E5] transition-colors"
        >
          Use Again
        </button>
      </div>
    </div>
  );
};

// ── Empty State ────────────────────────────────────────────────
const EmptyState = ({ filtered }) => (
  <div className="flex flex-col items-center justify-center py-24 text-center">
    <div className="w-20 h-20 rounded-3xl bg-gray-50 flex items-center justify-center mb-6">
      <FileX size={32} className="text-gray-300" />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">
      {filtered ? "No matches found" : "Your history is empty"}
    </h3>
    <p className="text-[14px] text-gray-500 max-w-xs leading-relaxed">
      {filtered
        ? "Try adjusting your search or filters to find what you're looking for."
        : "Start creating with our AI tools to see your history here."}
    </p>
  </div>
);

// ── Pagination ─────────────────────────────────────────────────
const Pagination = ({ page, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
    .reduce((acc, p, i, arr) => {
      if (i > 0 && p - arr[i - 1] > 1) acc.push("...");
      acc.push(p);
      return acc;
    }, []);

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="w-11 h-11 rounded-2xl flex items-center justify-center border border-gray-100 text-gray-400 hover:bg-white hover:shadow-md disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <ChevronLeft size={18} />
      </button>

      {pages.map((p, i) =>
        p === "..." ? (
          <span
            key={`dot-${i}`}
            className="w-11 h-11 flex items-center justify-center text-gray-300 font-bold"
          >
            ···
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-11 h-11 rounded-2xl text-[14px] font-bold transition-all ${
              page === p
                ? "bg-[#5044E5] text-white shadow-lg shadow-indigo-100"
                : "text-gray-500 hover:bg-white hover:shadow-md border border-transparent hover:border-gray-100"
            }`}
          >
            {p}
          </button>
        ),
      )}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="w-11 h-11 rounded-2xl flex items-center justify-center border border-gray-100 text-gray-400 hover:bg-white hover:shadow-md disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

// ── Main Page ──────────────────────────────────────────────────
const History = () => {
  const [page, setPage] = useState(1);
  const [selectedTool, setSelectedTool] = useState("");
  const [search, setSearch] = useState("");
  const [confirmModal, setConfirmModal] = useState(null);
  const [viewItem, setViewItem] = useState(null);

  const { data, isLoading } = useGetHistory({
    page,
    limit: 12,
    ...(selectedTool && { tool: selectedTool }),
  });

  const { mutate: deleteItem } = useDeleteHistoryItem();
  const { mutate: clearAll } = useClearAllHistory();
  const { mutate: deleteByTool } = useDeleteHistoryByTool();

  const history = data?.data ?? [];
  const pagination = data?.pagination ?? {
    total: 0,
    page: 1,
    limit: 12,
    totalPages: 1,
  };

  const toolOptions = [
    { label: "All Categories", value: "" },
    ...[...new Set(history.map((h) => h.tool))].map((t) => ({
      label: toTitle(t),
      value: t,
    })),
  ];

  const handleDeleteItem = (id) => {
    setConfirmModal({
      message: "Delete this history item?",
      onConfirm: () => {
        setConfirmModal(null);
        deleteItem(id);
      },
    });
  };

  const handleClearAll = () => {
    setConfirmModal({
      message: "Clear your entire history? This cannot be undone.",
      onConfirm: () => {
        setConfirmModal(null);
        clearAll();
        setPage(1);
        setSelectedTool("");
      },
    });
  };

  const handleDeleteByTool = () => {
    if (!selectedTool) return;
    setConfirmModal({
      message: `Delete all history for "${toTitle(selectedTool)}"?`,
      onConfirm: () => {
        setConfirmModal(null);
        deleteByTool(selectedTool);
        setSelectedTool("");
        setPage(1);
      },
    });
  };

  const handleReset = () => {
    setSelectedTool("");
    setSearch("");
    setPage(1);
  };

  const filtered = search
    ? history.filter((h) => {
        const inputText = parseToPlainText(h.input)?.toLowerCase() ?? "";
        const outputText = parseToPlainText(h.output)?.toLowerCase() ?? "";
        const query = search.toLowerCase();
        return inputText.includes(query) || outputText.includes(query);
      })
    : history;

  return (
    <div className="min-h-screen w-full pb-20">
      <Container>
        <div className="py-10">
          {/* ── Header ── */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <h1 className="text-4xl font-black text-gray-900 tracking-tight">
                Activity Hub
              </h1>
              <p className="mt-2 text-sm text-gray-500 font-medium">
                {pagination.total > 0
                  ? `You've generated ${pagination.total} magic pieces so far.`
                  : "Every masterwork begins with a single prompt."}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {selectedTool && (
                <button
                  onClick={handleDeleteByTool}
                  className="px-5 py-3 rounded-2xl border border-red-100 text-red-500 text-xs font-black uppercase tracking-widest hover:bg-red-50 transition-all"
                >
                  Clear Tool
                </button>
              )}
              {history.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="px-5 py-3 rounded-2xl bg-red-50 text-red-500 text-xs font-black uppercase tracking-widest hover:bg-red-100 transition-all border border-red-100 shadow-sm"
                >
                  Purge History
                </button>
              )}
            </div>
          </div>

          {/* ── Filters ── */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8 bg-white p-2 rounded-4xl border border-gray-100 shadow-sm">
            {/* Search */}
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search your creations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-5 py-4 rounded-2xl bg-gray-50/50 border-none text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#5044E5]/10 transition-all"
              />
            </div>

            <div className="flex gap-3">
              {/* Tool Filter */}
              <div className="relative min-w-50">
                <Filter
                  size={16}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
                <select
                  value={selectedTool}
                  onChange={(e) => {
                    setSelectedTool(e.target.value);
                    setPage(1);
                  }}
                  className="w-full pl-12 pr-10 py-4 rounded-2xl bg-gray-50/50 border-none text-sm text-gray-900 focus:ring-2 focus:ring-[#5044E5]/10 appearance-none cursor-pointer font-bold"
                >
                  {toolOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Reset */}
              {(selectedTool || search) && (
                <button
                  onClick={handleReset}
                  className="p-4 rounded-2xl bg-gray-900 text-white hover:bg-gray-800 transition-all"
                >
                  <RotateCcw size={18} />
                </button>
              )}
            </div>
          </div>

          {/* ── Content ── */}
          {isLoading ? (
            <div className="py-40">
              <Loader />
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState filtered={!!selectedTool || !!search} />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((item) => (
                  <HistoryCard
                    key={item._id}
                    item={item}
                    onDelete={handleDeleteItem}
                    onView={setViewItem}
                  />
                ))}
              </div>

              {pagination.totalPages > 1 && (
                <Pagination
                  page={page}
                  totalPages={pagination.totalPages}
                  onPageChange={setPage}
                />
              )}
            </>
          )}
        </div>
      </Container>

      {/* Details Modal */}
      <AnimatePresence>
        {viewItem && (
          <DetailsModal
            item={viewItem}
            onClose={() => setViewItem(null)}
          />
        )}
      </AnimatePresence>

      {/* Confirm Modal */}
      {confirmModal && (
        <ConfirmModal
          message={confirmModal.message}
          onConfirm={confirmModal.onConfirm}
          onCancel={() => setConfirmModal(null)}
        />
      )}
    </div>
  );
};

export default History;
