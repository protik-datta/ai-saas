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
} from "lucide-react";
import Container from "./Container";
import { assets } from "../../assets/assets";
import { useAuth } from "../../context/AuthContext";
import Loader from "../../utils/Loader";
import { useLogout } from '../../hooks/authApi.hook';
import { showSuccess } from '../../utils/toast';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

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
                <div className="hidden md:flex items-center justify-center w-[120px] h-10">
                  <Loader size="sm" />
                </div>
              ) : user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen((v) => !v)}
                    className="flex items-center gap-2.5 pl-1 pr-3 py-1 rounded-xl hover:bg-purple-500/8 transition-all duration-200 group"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#5044E5] text-white text-[13px] font-bold flex items-center justify-center">
                      {avatarLetter}
                    </div>

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

                  {dropdownOpen && (
                    <div className="absolute right-0 top-[calc(100%+8px)] w-52 rounded-2xl bg-white shadow-[0_8px_40px_rgba(0,0,0,0.13)] border border-[#F0F0F0] overflow-hidden z-50">
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
                        ].map((item) => (
                          <button
                            key={item.path}
                            onClick={() => {
                              navigate(item.path);
                              setDropdownOpen(false);
                            }}
                            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px]"
                          >
                            <item.icon size={14} />
                            {item.label}
                          </button>
                        ))}
                      </div>

                      <div className="p-1.5 border-t border-[#F5F5F5]">
                        <button
                          onClick={() => {
                            handleLogout()
                            setDropdownOpen(false);
                            navigate("/");
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 text-red-400"
                        >
                          <LogOut size={14} />
                          Log out
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

              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="md:hidden p-1.5 rounded-lg text-purple-400"
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </nav>
        </Container>
      </header>
    </>
  );
};

export default Navbar;
