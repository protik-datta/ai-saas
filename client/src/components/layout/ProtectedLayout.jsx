import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';
import Loader from "../../utils/Loader";

const ProtectedLayout = () => {
  const { user, loading } = useAuth();

  if (loading) return <Loader fullScreen />;

  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedLayout;
