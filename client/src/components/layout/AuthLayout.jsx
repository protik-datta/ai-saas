import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loader from "../../utils/Loader";

const AuthLayout = () => {
  const { user, loading } = useAuth();

  if (loading) return <Loader fullScreen />;

  if (user) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
};

export default AuthLayout;
