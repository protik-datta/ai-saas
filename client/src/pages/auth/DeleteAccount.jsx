import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, AlertTriangle, Eye, EyeOff, Trash2 } from "lucide-react";
import { useDeleteAccount } from '../../hooks/authApi.hook';
import { showSuccess } from '../../utils/toast';
import Loader from '../../utils/Loader';

// Usage: <DeleteAccount isOpen={isOpen} onClose={() => setIsOpen(false)} />
const DeleteAccount = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { mutate: deleteAccount, isPending } = useDeleteAccount();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleDelete = () => {
    deleteAccount(
      { password },
      {
        onSuccess: () => {
          showSuccess("Account deleted successfully");
          navigate("/register");
        },
      },
    );
  };

  const handleClose = () => {
    setPassword("");
    setShowPassword(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
      onClick={handleClose}
    >
      <div
        className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-gray-100 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
            <AlertTriangle size={18} className="text-red-500" />
          </div>
          <button
            onClick={handleClose}
            className="text-gray-300 hover:text-gray-500 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <h2 className="text-base font-semibold text-gray-900 mb-1">
          Delete account
        </h2>
        <p className="text-sm text-gray-400 mb-5 leading-relaxed">
          This will permanently delete your account and all associated data.
          This action{" "}
          <span className="font-medium text-gray-600">cannot be undone</span>.
        </p>

        {/* Password field */}
        <div className="mb-5">
          <label className="block text-xs font-medium text-gray-600 mb-1.5">
            Enter your password to confirm
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2.5 pr-10 text-sm border border-gray-200 rounded-xl outline-none text-gray-900 placeholder-gray-300 focus:border-red-400 focus:ring-2 focus:ring-red-50 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={!password.trim() || isPending}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-500 hover:bg-red-600 disabled:opacity-50 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <Loader size="sm" />
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 size={14} />
                <span>Delete account</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
