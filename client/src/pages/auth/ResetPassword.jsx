import { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { ArrowLeft, KeyRound, Eye, EyeOff } from "lucide-react";
import { useResetPassword } from "../../hooks/authApi.hook";
import { showSuccess } from "../../utils/toast";
import Loader from "../../utils/Loader";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const location = useLocation();
  const { otp, email } = location.state || {};

  const { mutate: resetPassword, isPending } = useResetPassword();

  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setError("");
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    const resetPasswordToken = token || otp;
  
    resetPassword(
      { token: resetPasswordToken, data: { password: form.password, email } },
      {
        onSuccess: () => {
          showSuccess("Password reset successfully");
          navigate("/login");
        },
      },
    );
  };

  const strength =
    form.password.length === 0
      ? 0
      : form.password.length < 8
        ? 1
        : form.password.length < 12
          ? 2
          : 3;

  const strengthConfig = {
    0: { bars: [false, false, false], label: "", color: "" },
    1: {
      bars: [true, false, false],
      label: "Too short — min 8 characters",
      color: "bg-red-400",
    },
    2: {
      bars: [true, true, false],
      label: "Weak — try adding numbers or symbols",
      color: "bg-yellow-400",
    },
    3: {
      bars: [true, true, true],
      label: form.password.length < 16 ? "Good password" : "Strong password",
      color: form.password.length < 16 ? "bg-yellow-400" : "bg-green-500",
    },
  }[strength];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-2xl p-10 shadow-sm">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-blue-600 mb-6 transition-colors"
        >
          <ArrowLeft size={14} />
          Back
        </button>

        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-5">
          <KeyRound size={20} className="text-blue-600" />
        </div>

        <h1 className="text-xl font-semibold text-gray-900">Reset password</h1>
        <p className="text-sm text-gray-400 mt-1 mb-6">
          Choose a new password for your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New Password */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">
              New password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full px-3 py-2.5 pr-10 text-sm border border-gray-200 rounded-xl outline-none text-gray-900 placeholder-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-50 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Strength bar */}
          {form.password && (
            <div className="space-y-1.5">
              <div className="flex gap-1">
                {strengthConfig.bars.map((active, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      active ? strengthConfig.color : "bg-gray-100"
                    }`}
                  />
                ))}
              </div>
              <p className="text-[11px] text-gray-400">
                {strengthConfig.label}
              </p>
            </div>
          )}

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">
              Confirm password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full px-3 py-2.5 pr-10 text-sm border border-gray-200 rounded-xl outline-none text-gray-900 placeholder-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-50 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
              >
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Inline error */}
          {error && (
            <p className="text-xs text-red-500 bg-red-50 border border-red-100 px-3 py-2 rounded-lg">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium py-2.5 rounded-xl transition-colors active:scale-[0.99] flex items-center justify-center gap-2 h-10"
          >
            {isPending ? (
              <>
                <Loader size="sm" />
                <span>Resetting...</span>
              </>
            ) : (
              "Reset password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
