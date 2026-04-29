import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Menu,
  X,
  LogOut,
  History,
  BookOpen,
  Cpu,
  Key,
  Trash,
} from "lucide-react";
import Container from "./Container";
import { assets } from "../../assets/assets";
import { useAuth } from "../../context/AuthContext";
import Loader from "../../utils/Loader";
import { useDeleteAccount, useLogout } from "../../hooks/authApi.hook";
import { showSuccess } from "../../utils/toast";
import DeleteAccount from '../../pages/auth/DeleteAccount';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const { user, setUser, loading: authLoading, initialized } = useAuth();

  const navLinks = [
    { id: 1, title: "Home", path: "/" },
    { id: 2, title: "How It Works", path: "/#how-it-works" },
    { id: 3, title: "Tools", path: "/#tools" },
    { id: 4, title: "Pricing", path: "/#pricing" },
    { id: 5, title: "FAQ", path: "/#faq" },
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNavClick = (path) => {
    setMenuOpen(false);
    if (path.startsWith("/#")) {
      const id = path.replace("/#", "");
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(path);
    }
  };

  const handleGetStarted = async () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      navigate("/login");
      setLoading(false);
      setMenuOpen(false);
    }, 400);
  };

  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        setUser(null);
        showSuccess("Logged out successfully");
        navigate("/");
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

  const avatarLetter = user?.username?.trim()?.charAt(0)?.toUpperCase() || "U";
  const username = user?.username?.trim()?.split(" ")[0] || "User";

  return (
    <>
      <header className="fixed w-full z-50 backdrop-blur-xl">
        <Container>
          <nav className="flex justify-between items-center py-3.5">
            {/* Logo */}
            <div
              className="flex gap-2.5 items-center cursor-pointer"
              onClick={() => navigate("/")}
            >
              <img
                src={assets.logo}
                alt="logo"
                className="w-32 h-10 object-contain"
              />
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex gap-1 items-center">
              {navLinks.map((item) => (
                <Link
                  key={item.id}
                  onClick={() => handleNavClick(item.path)}
                  to={item.path}
                  className="relative text-gray-600 text-[15px] font-medium px-3.5 py-1.5 rounded-lg transition-all duration-200 hover:text-[#5044E5]"
                >
                  {item.title}
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              {!initialized ? (
                <div className="hidden md:flex items-center justify-center w-30 h-10">
                  <Loader size="sm" />
                </div>
              ) : user ? (
                /* Profile avatar — visible on BOTH mobile & desktop */
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen((v) => !v)}
                    className="flex items-center gap-2.5 pl-1 pr-3 py-1 rounded-xl hover:bg-purple-500/8 transition-all duration-200 group"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#5044E5] text-white text-[13px] font-bold flex items-center justify-center">
                      {avatarLetter}
                    </div>
                    {/* username + chevron: desktop only */}
                    <span className="hidden md:block text-[14px] font-medium text-[#3B3B3B]">
                      {username}
                    </span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      className={`hidden md:block text-[#AEAEAE] transition-transform duration-200 ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                    >
                      <path
                        d="M2 4l4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {/* Dropdown — same on mobile & desktop, z-[80] to stay above header */}
                  {dropdownOpen && (
                    <div className="absolute right-0 top-[calc(100%+8px)] w-52 rounded-2xl bg-white shadow-[0_8px_40px_rgba(0,0,0,0.13)] border border-[#F0F0F0] overflow-hidden z-80">
                      <div className="px-4 py-3.5 border-b border-[#F5F5F5]">
                        <p className="text-[13px] font-semibold">
                          {user.username}
                        </p>
                        <p className="text-[11px] text-[#AEAEAE]">
                          {user.email}
                        </p>
                      </div>
                      <div className="p-1.5">
                        {[
                          { icon: Cpu, label: "Dashboard", path: "/dashboard" },
                          {
                            icon: History,
                            label: "History",
                            path: "/dashboard/history",
                          },
                          { icon: BookOpen, label: "Docs", path: "/docs" },
                          {
                            icon: Key,
                            label: "Forget Password",
                            path: "/forgot-password",
                          },
                        ].map((item) => (
                          <button
                            key={item.path}
                            onClick={() => {
                              setDropdownOpen(false);
                              navigate(item.path);
                            }}
                            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] text-gray-700 hover:bg-purple-50 hover:text-[#5044E5] transition-colors"
                          >
                            <item.icon size={14} />
                            {item.label}
                          </button>
                        ))}
                      </div>
                      <div className="p-1.5 border-t border-[#F5F5F5]">
                        <button
                          onClick={() => {
                            setDropdownOpen(false);
                            handleLogout();
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] text-red-400 hover:bg-red-50 transition-colors"
                        >
                          <LogOut size={14} />
                          Log out
                        </button>
                        <button
                          onClick={() => {
                            setShowDeleteModal(true);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] text-red-400 hover:bg-red-50 transition-colors"
                        >
                          <Trash size={14} />
                          Delete Account
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleGetStarted}
                  disabled={loading || authLoading}
                  className="hidden md:flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#5044E5] text-white text-sm font-semibold shadow-[0_4px_20px_rgba(124,58,237,0.25)] hover:shadow-[0_6px_28px_rgba(124,58,237,0.35)] active:scale-[0.98] transition-all duration-200 ease-out disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading || authLoading ? (
                    <Loader size="sm" />
                  ) : (
                    <>
                      Get Started <ArrowRight size={16} />
                    </>
                  )}
                </button>
              )}

              {/* Hamburger — mobile only, for nav links */}
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="md:hidden p-1.5 rounded-lg text-purple-400"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </nav>
        </Container>
      </header>

      {/* ── Mobile Drawer (nav links only) ── */}
      {/* Backdrop */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-60 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer panel — slides in from left */}
      <div
        className={`fixed top-0 left-0 h-full w-72 z-70 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#F0F0F0]">
          <img
            src={assets.logo}
            alt="logo"
            className="w-28 h-9 object-contain cursor-pointer"
            onClick={() => {
              navigate("/");
              setMenuOpen(false);
            }}
          />
          <button
            onClick={() => setMenuOpen(false)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-1">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.path)}
              className="w-full text-left text-[15px] font-medium text-gray-700 px-4 py-3 rounded-xl hover:bg-purple-50 hover:text-[#5044E5] transition-all duration-150"
            >
              {item.title}
            </button>
          ))}
        </nav>

        {/* Drawer Footer — Get Started for guests */}
        {initialized && !user && (
          <div className="px-4 pb-6 pt-3 border-t border-[#F0F0F0]">
            <button
              onClick={handleGetStarted}
              disabled={loading || authLoading}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#5044E5] text-white text-sm font-semibold shadow-[0_4px_20px_rgba(80,68,229,0.25)] active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading || authLoading ? (
                <Loader size="sm" />
              ) : (
                <>
                  Get Started <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
      <DeleteAccount
        isOpen={showDeleteModal}
        isPending={isDeleting}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteAccount}
      />
    </>
  );
};

export default Navbar;
