import { Coins } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { user, credit } = useAuth();
  const navigate = useNavigate();

  const credits = credit.remaining;

  return (
    <header className="h-16 bg-white/40 backdrop-blur-md border-b border-gray-100 px-6 flex items-center justify-end">
      {/* Credits and Dashboard Button */}
      <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-xl border border-gray-200">
        {/* Credits Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg border border-blue-100">
          <Coins size={16} />
          <span className="text-sm font-semibold">{credits} Credits</span>
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-gray-200" />

        {/* Dashboard Button */}
        <button
          className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </button>
      </div>
    </header>
  );
};

export default Header;
