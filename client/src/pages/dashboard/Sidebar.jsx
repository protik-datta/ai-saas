import React, { useState, useMemo, useCallback, useEffect } from "react";
import { tools } from "../../lib/dashboardData";
import { motion } from "framer-motion";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { assets } from "../../assets/assets";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useLogout, useDeleteAccount } from "../../hooks/authApi.hook";
import { showSuccess } from "../../utils/toast";
import DeleteAccount from "../auth/DeleteAccount";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(
    () => localStorage.getItem("sidebarCollapsed") === "true",
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // ✅ NEW
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { user, setUser } = useAuth();

  const activeSlug = location.pathname.split("/").pop();
  const isDashboard = location.pathname === "/dashboard";

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", isCollapsed);
  }, [isCollapsed]);

  // ✅ OUTSIDE CLICK CLOSE
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".profile-dropdown")) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const memoTools = useMemo(() => tools, []);

  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        setUser(null);
        showSuccess("Logged out successfully");
        navigate("/login");
      },
    });
  };

  const { mutate: deleteAccount, isPending: isDeleting } = useDeleteAccount();

  const handleDeleteAccount = (password) => {
    deleteAccount(
      { password },
      {
        onSuccess: () => {
          showSuccess("Account deleted successfully");
          setShowDeleteModal(false);
          navigate("/register");
        },
      },
    );
  };

  return (
    <>
      <motion.div
        initial={false}
        animate={{ width: isCollapsed ? 80 : 280 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative flex flex-col h-screen shrink-0 border-r border-gray-200 bg-white shadow-sm z-20"
      >
        {/* Toggle Button */}
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

        {/* Logo */}
        <div
          className={`h-16 flex items-center ${isCollapsed ? "justify-center" : "px-6 gap-3"} border-b border-gray-50`}
        >
          <img
            src={assets.logo}
            alt=""
            className="object-cover"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-8 scrollbar-hide overflow-x-hidden">
          {memoTools.map((category) => {
            const Icon = category.icon;

            const hasActiveInChild = category.tools.some(
              (t) => t.slug === activeSlug && !isDashboard,
            );

            return (
              <div key={category.id} className="space-y-2">
                <div
                  className={`flex items-center ${isCollapsed ? "justify-center" : "px-3 gap-3"} py-1`}
                >
                  <div
                    className={`transition-colors duration-300 ${hasActiveInChild ? "text-blue-600" : "text-gray-400"}`}
                  >
                    <Icon size={isCollapsed ? 22 : 18} />
                  </div>
                  {!isCollapsed && (
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
                      onClick={() => navigate(`/dashboard/tools/${tool.slug}`)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-100">
          {!isCollapsed && (
            <div className="relative mt-4 profile-dropdown">
              {/* Profile Card */}
              <div
                className="p-3 bg-gray-50 rounded-xl border border-gray-100 cursor-pointer"
                onClick={() => setIsProfileOpen((prev) => !prev)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center">
                    <img
                      src={assets.profile_img_1}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-gray-900 truncate">
                      @{user?.username}
                    </span>
                  </div>
                </div>
              </div>

              {/* Dropdown */}
              <div
                className={`absolute bottom-full left-0 mb-2 w-full bg-white border border-gray-200 rounded-lg shadow-md transition-all duration-200 z-50 overflow-hidden
                ${isProfileOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
              >
                <button
                  className="w-full text-left px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                  onClick={() => navigate("/dashboard/history")}
                >
                  History
                </button>

                <button
                  className="w-full text-left px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forget Password
                </button>

                <div className="border-t border-gray-100" />

                <button
                  className="w-full text-left px-3 py-2 text-xs text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </button>

                <button
                  className="w-full text-left px-3 py-2 text-xs text-red-500 hover:bg-red-50 transition-colors"
                  onClick={() => setShowDeleteModal(true)}
                >
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      <DeleteAccount
        isOpen={showDeleteModal}
        isPending={isDeleting}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteAccount}
      />
    </>
  );
};

const NavItem = ({ tool, isActive, isCollapsed, onClick }) => {
  return (
    <div className="relative group px-1">
      <motion.button
        whileHover={{ x: isCollapsed ? 0 : 4 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={`w-full flex items-center ${
          isCollapsed ? "justify-center px-0" : "px-3"
        } py-2.5 rounded-xl text-sm font-medium transition-all duration-200
          ${
            isActive
              ? "bg-blue-50 text-blue-700 shadow-sm shadow-blue-50/50"
              : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
          }`}
      >
        {isCollapsed ? (
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

        {isActive && !isCollapsed && (
          <motion.div
            layoutId="activeIndicator"
            className="ml-auto w-1 h-4 bg-blue-600 rounded-full"
          />
        )}
      </motion.button>

      {isCollapsed && (
        <div className="absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-all duration-200 shadow-2xl translate-x-2 group-hover:translate-x-0">
          {tool.name}
          <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
