import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";
import { useForgetPassword } from "../../hooks/authApi.hook";
import { showSuccess } from '../../utils/toast';
import Loader from '../../utils/Loader';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { mutate: forgetPassword, isPending } = useForgetPassword();

  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    forgetPassword(
      { email },
      {
        onSuccess: () => {
          showSuccess("Password reset link sent to your email");
        },
      },
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-2xl p-10 shadow-sm">

        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-5">
          <Mail size={20} className="text-blue-600" />
        </div>

        <h1 className="text-xl font-semibold text-gray-900">
          Forgot password?
        </h1>
        <p className="text-sm text-gray-400 mt-1 mb-6">
          We'll send a reset code to your email
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl outline-none text-gray-900 placeholder-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-50 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium py-2.5 rounded-xl transition-colors active:scale-[0.99] flex items-center justify-center gap-2 h-10"
          >
            {isPending ? (
              <>
                <Loader size="sm" />
                <span>Sending...</span>
              </>
            ) : (
              "Send reset code"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
