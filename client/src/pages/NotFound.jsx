import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#080c12] flex flex-col items-center justify-center px-4 text-center">
      {/* 404 number */}
      <h1 className="text-[120px] md:text-[180px] font-black leading-none text-white/5 select-none">
        404
      </h1>

      {/* Message */}
      <div className="-mt-6 mb-8">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-200 mb-2">
          Page not found
        </h2>
        <p className="text-sm text-slate-500 max-w-xs">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-lg text-sm font-medium text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-300 transition-colors"
        >
          Go back
        </button>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-white text-black hover:bg-slate-200 transition-colors"
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
