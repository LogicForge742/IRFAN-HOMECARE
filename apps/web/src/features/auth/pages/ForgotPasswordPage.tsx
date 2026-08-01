import React from "react";
import { useFormik } from "formik";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { authApi } from "../api/auth-api";
import { forgotPasswordSchema } from "../schemas/auth-schemas";

export const ForgotPasswordPage: React.FC = () => {
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await authApi.forgotPassword(values);
        toast.success(response.message || "Password reset link sent to your email.");
      } catch (error: any) {
        const msg = error.response?.data?.message || "Failed to process request";
        toast.error(msg);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-bold text-white">Reset Password</h1>
        <p className="text-sm text-slate-400">
          Enter your account email to receive a password reset link
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-4 text-left">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder="user@example.com"
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-100"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-xs text-rose-500 mt-1">{formik.errors.email}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full bg-emerald-600 text-white py-2.5 rounded-lg font-medium hover:bg-emerald-500 transition disabled:opacity-50"
        >
          {formik.isSubmitting ? "Sending Link..." : "Send Reset Link"}
        </button>

        <p className="text-center text-sm text-slate-400 mt-4">
          Remembered your password?{" "}
          <Link to="/login" className="font-semibold text-emerald-400 hover:underline">
            Back to login
          </Link>
        </p>
      </form>
    </div>
  );
};
