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
import { ProfessionalsPage } from "@/features/professionals/pages/ProfessionalsPage";
import { ProfessionalDetailsPage } from "@/features/professionals/pages/ProfessionalDetailsPage";
import PaymentsPage from "@/features/payments/pages/PaymentsPage";
import PaymentDetailsPage from "@/features/payments/pages/PaymentDetailsPage";
import MedicalRecordsPage from "@/features/medical-records/pages/MedicalRecordsPage";
import MedicalRecordDetailsPage from "@/features/medical-records/pages/MedicalRecordDetailsPage";
import ConsultationPage from "@/features/consultations/pages/ConsultationPage";
import AvailabilityPage from "@/features/availability/pages/AvailabilityPage";
import ProfilePage from "@/features/profile/pages/ProfilePage";
import SchedulePage from "@/features/schedule/pages/SchedulePage";
import ConsultationHistoryPage from "@/features/consultation-history/pages/ConsultationHistoryPage";
import NotificationsPage from "@/features/notifications/pages/NotificationsPage";
import AdminUsersPage from "@/features/admin/pages/AdminUsersPage";
import AdminMetricsPage from "@/features/admin/pages/AdminMetricsPage";
import VideoConsultationPage from "@/features/video/pages/VideoConsultationPage";
import { AnalyticsDashboardPage } from "@/features/analytics/pages/AnalyticsDashboardPage";

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
            <Route path="/profile" element={<ProfilePage />} />

            {/* Professional Discovery Workflow */}
            <Route path="/professionals" element={<ProfessionalsPage />} />
            <Route path="/professionals/:id" element={<ProfessionalDetailsPage />} />

            {/* Appointment Booking Workflow */}
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route path="/appointments/book" element={<BookAppointmentPage />} />
            <Route path="/appointments/:id" element={<AppointmentDetailsPage />} />

            {/* Payment & Financial Workflow */}
            <Route path="/payments" element={<PaymentsPage />} />
            <Route path="/payments/:id" element={<PaymentDetailsPage />} />

            {/* Medical Records Workflow */}
            <Route path="/medical-records" element={<MedicalRecordsPage />} />
            <Route path="/medical-records/:id" element={<MedicalRecordDetailsPage />} />

            {/* Clinical Consultation Entry */}
            <Route path="/consultation" element={<ConsultationPage />} />

            {/* Professional Availability Management */}
            <Route path="/availability" element={<AvailabilityPage />} />

            {/* Professional Schedule Overview */}
            <Route path="/schedule" element={<SchedulePage />} />

            {/* Consultation History */}
            <Route path="/consultations" element={<ConsultationHistoryPage />} />

            {/* Notification Center */}
            <Route path="/notifications" element={<NotificationsPage />} />

            {/* Admin Panel */}
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin/metrics" element={<AdminMetricsPage />} />
            <Route path="/admin/analytics" element={<AnalyticsDashboardPage />} />
            <Route path="/admin/reports" element={<AnalyticsDashboardPage />} />
          </Route>
          <Route path="/consultation/video/:roomId" element={<VideoConsultationPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
