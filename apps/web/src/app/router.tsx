import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";
import { ForgotPasswordPage } from "@/features/auth/pages/ForgotPasswordPage";
import { useAuthStore } from "@/features/auth/stores/auth-store";

const DashboardPage: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="min-h-screen bg-slate-50 p-8 space-y-6">
      <div className="max-w-4xl mx-auto bg-white border rounded-2xl p-6 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-600">
            Welcome back, {user?.email || "User"} ({user?.role})
          </p>
        </div>
        <button
          onClick={logout}
          className="px-4 py-2 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700 transition"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

const GenericPage: React.FC<{ title: string }> = ({ title }) => (
  <div className="min-h-screen bg-slate-50 p-8">
    <div className="max-w-4xl mx-auto bg-white border rounded-2xl p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
    </div>
  </div>
);

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<GenericPage title="User Profile" />} />
          <Route
            path="/appointments"
            element={<GenericPage title="Appointments Management" />}
          />
          <Route
            path="/payments"
            element={<GenericPage title="Payments & Billing" />}
          />
          <Route
            path="/notifications"
            element={<GenericPage title="Notifications" />}
          />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
