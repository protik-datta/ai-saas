import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Layout from "./components/layout/Layout";
import AuthLayout from "./components/layout/AuthLayout";
import ProtectedLayout from "./components/layout/ProtectedLayout";
import DashboardLayout from "./components/layout/DashboardLayout";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Otp from "./pages/auth/Otp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import DeleteAccount from "./pages/auth/DeleteAccount";
import Loader from './utils/Loader';

// Lazy-load dashboard-only pages (only loaded after auth)
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const ToolPage = lazy(() => import("./pages/dashboard/ToolPage"));
const History = lazy(() => import("./pages/History"));
const Docs = lazy(() => import("./pages/Docs"));

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right" toastOptions={{ className: "!text-sm" }} />

      <Suspense fallback={<Loader size="md" fullScreen />}>
        <Routes>
          {/* Public Routes */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/docs" element={<Docs />} />
          </Route>

          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/otp" element={<Otp />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
          </Route>

          {/* Public Auth */}
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected Routes */}
          <Route element={<ProtectedLayout />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="tools/:slug" element={<ToolPage />} />
              <Route path="history" element={<History />} />
            </Route>
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
