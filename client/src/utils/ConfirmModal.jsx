import { AlertTriangle } from 'lucide-react';

export const ConfirmModal = ({ message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
    <div className="bg-white rounded-2xl shadow-2xl p-7 max-w-sm w-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
          <AlertTriangle size={18} className="text-red-500" />
        </div>
        <p className="text-[15px] font-medium text-[#3B3B3B] leading-snug">
          {message}
        </p>
      </div>
      <div className="flex gap-3 mt-6">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl border border-[#E0E0E0] text-[14px] text-[#727272] font-medium hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-[14px] font-medium hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);
