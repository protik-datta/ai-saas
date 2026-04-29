import { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, MailOpen } from "lucide-react";
import { useVerifyOtp, useResendOtp } from "../../hooks/authApi.hook";
import { showSuccess } from '../../utils/toast';
import Loader from '../../utils/Loader';

const OTP_LENGTH = 6;

const Otp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { email, type } = location.state || {};

  const { mutate: verifyOtp, isPending } = useVerifyOtp();
  const { mutate: resendOtp, isPending: isResending } = useResendOtp();

  const inputs = useRef([]);
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));

  const updateOtp = (index, value) => {
    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);
  };

  const handleChange = (e, index) => {
    const val = e.target.value.replace(/\D/g, "");
    updateOtp(index, val);
    if (val && index < OTP_LENGTH - 1) inputs.current[index + 1]?.focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
    const updated = [...otp];
    pasted.split("").forEach((char, i) => (updated[i] = char));
    setOtp(updated);
    inputs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < OTP_LENGTH) return;

    verifyOtp(
      { email, otp: code },
      {
        onSuccess: () => {
          if (type === "reset") {
            showSuccess("OTP verified. Set your new password");
            navigate("/reset-password", { state: { email, otp: code } });
          } else {
            showSuccess("Email verified successfully");
            navigate("/login");
          }
        },
      },
    );
  };

  const handleResend = () => {
    resendOtp(
      { email },
      {
        onSuccess: () => showSuccess("Code resent to your email"),
      },
    );
  };

  const isFilled = otp.join("").length === OTP_LENGTH;

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
          <MailOpen size={20} className="text-blue-600" />
        </div>

        <h1 className="text-xl font-semibold text-gray-900">
          Check your email
        </h1>
        <p className="text-sm text-gray-400 mt-1 mb-1">
          Enter the {OTP_LENGTH}-digit code we sent to
        </p>
        <p className="text-sm font-medium text-gray-700 mb-7">{email}</p>

        <form onSubmit={handleSubmit}>
          <div className="flex gap-2 justify-center mb-6" onPaste={handlePaste}>
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputs.current[i] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className="w-11 h-13 text-center text-xl font-semibold border border-gray-200 rounded-xl outline-none text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-50 transition-all"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isPending || !isFilled}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium py-2.5 rounded-xl transition-colors active:scale-[0.99] flex items-center justify-center gap-2 h-10"
          >
            {isPending ? (
              <>
                <Loader size="sm" />
                <span>Verifying...</span>
              </>
            ) : (
              "Verify code"
            )}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-5">
          Didn't receive it?{" "}
          <button
            onClick={handleResend}
            disabled={isResending}
            className="text-blue-600 font-medium hover:underline disabled:opacity-50 inline-flex items-center gap-1"
          >
            {isResending ? (
              <>
                <Loader size="sm" />
                Resending...
              </>
            ) : (
              "Resend code"
            )}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Otp;
