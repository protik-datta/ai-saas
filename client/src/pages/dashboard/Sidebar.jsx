import React, { useState, useMemo, useEffect } from "react";
import { tools } from "../../lib/dashboardData";
import { motion } from "framer-motion";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { assets } from "../../assets/assets";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {
  const [isCollapsed, setIsCollapsed] = useState(
    () => localStorage.getItem("sidebarCollapsed") === "true",
  );

  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    const checkMobile = (e) => setIsMobile(e.matches);
    setIsMobile(mql.matches);
    mql.addEventListener("change", checkMobile);
    return () => mql.removeEventListener("change", checkMobile);
  }, []);

  // FIX: mobile-এ সবসময় full show করবে, collapsed ignore করবে
  const showFull = isMobile ? true : !isCollapsed;

  const activeSlug = location.pathname.split("/").pop();
  const isDashboard = location.pathname === "/dashboard";

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", isCollapsed);
  }, [isCollapsed]);

  const memoTools = useMemo(() => tools, []);

  return (
    <>
      <motion.div
        initial={false}
        animate={{
          // FIX: mobile-এ সবসময় 280px — collapsed state ignore
          width: isMobile ? 280 : isCollapsed ? 80 : 280,
          x: isMobile ? (isOpen ? 0 : -280) : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        // FIX: removed overflow-hidden so the dropdown isn't clipped on mobile
        className="fixed md:relative flex flex-col h-[100dvh] shrink-0 border-r border-gray-200 bg-white shadow-sm z-40 md:z-20"
      >
        {/* Toggle Button - desktop only */}
        {!isMobile && (
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-3 top-10 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors z-50 group"
          >
            {isCollapsed ? (
              <PanelLeftOpen
                size={14}
                className="text-gray-400 group-hover:text-blue-600 transition-colors"
              />
            ) : (
              <PanelLeftClose
                size={14}
                className="text-gray-400 group-hover:text-blue-600 transition-colors"
              />
            )}
          </button>
        )}

        {/* Logo */}
        <div
          className={`h-16 flex items-center ${!showFull ? "justify-center" : "px-6 gap-3"} border-b border-gray-50`}
        >
          <img
            src={assets.logo}
            alt=""
            className="object-cover"
            onClick={() => {
              navigate("/");
              if (isMobile && onClose) onClose();
            }}
          />
        </div>

        {/* Navigation */}
        <div className="flex-1 min-h-0 overflow-y-auto px-3 pt-4 pb-24 space-y-8 overflow-x-hidden overscroll-contain">
          {memoTools.map((category) => {
            const Icon = category.icon;
            const hasActiveInChild = category.tools.some(
              (t) => t.slug === activeSlug && !isDashboard,
            );

            return (
              <div key={category.id} className="space-y-2">
                <div
                  className={`flex items-center ${!showFull ? "justify-center" : "px-3 gap-3"} py-1`}
                >
                  <div
                    className={`transition-colors duration-300 ${hasActiveInChild ? "text-blue-600" : "text-gray-400"}`}
                  >
                    <Icon size={!showFull ? 22 : 18} />
                  </div>
                  {showFull && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[11px] font-bold text-gray-400 uppercase tracking-widest"
                    >
                      {category.label}
                    </motion.span>
                  )}
                </div>

                <div className="space-y-1">
                  {category.tools.map((tool) => (
                    <NavItem
                      key={tool.id}
                      tool={tool}
                      isActive={activeSlug === tool.slug}
                      isCollapsed={isCollapsed}
                      isMobile={isMobile}
                      onClick={() => {
                        navigate(`/dashboard/tools/${tool.slug}`);
                        if (isMobile && onClose) onClose();
                      }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </>
  );
};

const NavItem = ({ tool, isActive, isCollapsed, isMobile, onClick }) => {
  const showFull = isMobile ? true : !isCollapsed;
  return (
    <div className="relative group px-1">
      <motion.button
        whileHover={{ x: showFull ? 4 : 0 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={`w-full flex items-center ${
          !showFull ? "justify-center px-0" : "px-3"
        } py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
          isActive
            ? "bg-blue-50 text-blue-700 shadow-sm shadow-blue-50/50"
            : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
        }`}
      >
        {!showFull ? (
          <div
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              isActive
                ? "bg-blue-600 scale-150 shadow-lg shadow-blue-400"
                : "bg-gray-300 group-hover:bg-gray-400"
            }`}
          />
        ) : (
          <span className="truncate">{tool.name}</span>
        )}

        {isActive && showFull && (
          <motion.div
            layoutId="activeIndicator"
            className="ml-auto w-1 h-4 bg-blue-600 rounded-full"
          />
        )}
      </motion.button>

      {!showFull && (
        <div className="absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-all duration-200 shadow-2xl translate-x-2 group-hover:translate-x-0">
          {tool.name}
          <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
