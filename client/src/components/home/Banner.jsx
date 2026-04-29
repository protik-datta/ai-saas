import React from "react";
import { assets } from "../../assets/assets";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { showError } from "../../utils/toast";

const Banner = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleClick = () =>
    user
      ? navigate("/dashboard")
      : showError("Please login first to explore an exclusive dashboard");
  return (
    <div
      className="px-6 sm:px-12 md:px-20 xl:px-32 relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat pt-20 pb-10"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.3), rgba(255,255,255,0.3)), url(${assets.gradientBackground})`,
      }}
    >
      {/* content */}
      <div className="text-center max-w-4xl mx-auto w-full">
        <h1 className="text-4xl sm:text-5xl md:text-[60px] lg:text-[60px] font-extrabold bg-clip-text text-black tracking-tight leading-tight md:leading-[1.1]">
          Instantly Generate High Converting{" "}
          <span className="text-[#5044E5] block sm:inline mt-2 sm:mt-0">
            Copy with AI
          </span>
        </h1>
        <p className="mt-6 sm:mt-8 text-gray-700 text-base sm:text-lg md:text-[18px] max-w-2xl mx-auto">
          No blank page anxiety — generate high-converting content instantly.
          Save hours of writing and brainstorming effortlessly. Keep your
          marketing campaigns consistent and professional across every platform.
        </p>

        {/* buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mt-10">
          <button
            className="w-full sm:w-auto px-8 py-3.5 bg-[#5044E5] text-white rounded-lg text-[15px] font-medium transition-colors duration-300 hover:bg-[#4338ca] cursor-pointer shadow-lg shadow-indigo-500/30"
            onClick={handleClick}
          >
            Get Started
          </button>
          <button className="w-full sm:w-auto px-8 py-3.5 bg-white text-black rounded-lg text-[15px] font-medium transition-all duration-300 border border-gray-300 hover:border-black hover:bg-gray-50 cursor-pointer shadow-sm">
            Watch Demo
          </button>
        </div>

        {/* user */}
        <div className="flex flex-col sm:flex-row justify-center items-center mt-12 sm:mt-16 gap-3 sm:gap-5">
          <img
            src={assets.user_group}
            alt="user group"
            className="w-28 sm:w-32.5 h-auto object-contain"
          />
          <p className="text-[#626262] text-[15px] sm:text-[16px] font-medium">
            Trusted by 10k+ people
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
