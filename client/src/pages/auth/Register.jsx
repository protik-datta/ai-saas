import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../../hooks/authApi.hook";
import { assets } from "../../assets/assets";
import { showSuccess } from '../../utils/toast';
import Loader from '../../utils/Loader';

const Register = () => {
  const navigate = useNavigate();
  const { mutate: register, isPending } = useRegister();

  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    register(form, {
      onSuccess: () => {
        showSuccess("Account created! Please verify your email");
        navigate("/otp", { state: { email: form.email, type: "verify" } });
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-2xl p-10 shadow-sm">
        <div className="flex justify-center mb-8">
          <img src={assets.logo} alt="logo" className="h-8 object-contain" />
        </div>

        <h1 className="text-xl font-semibold text-gray-900">Create account</h1>
        <p className="text-sm text-gray-400 mt-1 mb-6">Get started for free</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="johndoe"
              required
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl outline-none text-gray-900 placeholder-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-50 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl outline-none text-gray-900 placeholder-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-50 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
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
                <span>Creating account...</span>
              </>
            ) : (
              "Create account"
            )}
          </button>
        </form>

        <div className="my-6 border-t border-gray-100" />

        <p className="text-center text-xs text-gray-400">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 font-medium hover:underline"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
