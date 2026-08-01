import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AuthLayout } from "@/layouts/AuthLayout";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";
import { ForgotPasswordPage } from "@/features/auth/pages/ForgotPasswordPage";
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
import AppointmentsPage from "@/features/appointments/pages/AppointmentsPage";
import { BookAppointmentPage } from "@/features/appointments/pages/BookAppointmentPage";
import { AppointmentDetailsPage } from "@/features/appointments/pages/AppointmentDetailsPage";

const GenericPage: React.FC<{ title: string }> = ({ title }) => (
  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
    <h1 className="text-2xl font-bold text-white">{title}</h1>
    <p className="text-sm text-slate-400">
      Module view initialized and connected to Irfan HomeCare infrastructure.
    </p>
  </div>
);

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Route>

        {/* Protected Dashboard Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<GenericPage title="User Profile" />} />

            {/* Appointment Booking Workflow */}
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route path="/appointments/book" element={<BookAppointmentPage />} />
            <Route path="/appointments/:id" element={<AppointmentDetailsPage />} />

            <Route
              path="/schedule"
              element={<GenericPage title="Professional Schedule" />}
            />
            <Route
              path="/consultations"
              element={<GenericPage title="Consultation Records" />}
            />
            <Route
              path="/payments"
              element={<GenericPage title="Payments & Billing" />}
            />
            <Route
              path="/notifications"
              element={<GenericPage title="Notifications" />}
            />
            <Route
              path="/admin/users"
              element={<GenericPage title="User Management" />}
            />
            <Route
              path="/admin/metrics"
              element={<GenericPage title="Platform Metrics" />}
            />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
