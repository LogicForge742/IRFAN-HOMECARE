import React from "react";
import { useFormik } from "formik";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import { authApi } from "../api/auth-api";
import { registerSchema } from "../schemas/auth-schemas";
import type { UserRole } from "@/types/auth";

export const RegisterForm: React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      role: "PATIENT" as UserRole,
    },
    validationSchema: registerSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await authApi.register(values);
        toast.success(response.message || "Account created successfully! Please log in.");
        navigate("/login");
      } catch (error: any) {
        const msg = error.response?.data?.message || "Registration failed";
        toast.error(msg);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4 text-left">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">
          Account Role
        </label>
        <select
          name="role"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.role}
          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-100"
        >
          <option value="PATIENT">Patient</option>
          <option value="HEALTHCARE_PROFESSIONAL">Healthcare Professional</option>
        </select>
        {formik.touched.role && formik.errors.role && (
          <p className="text-xs text-rose-500 mt-1">{formik.errors.role}</p>
        )}
      </div>

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

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">
          Password
        </label>
        <input
          type="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          placeholder="••••••••"
          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-100"
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-xs text-rose-500 mt-1">{formik.errors.password}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={formik.isSubmitting}
        className="w-full bg-emerald-600 text-white py-2.5 rounded-lg font-medium hover:bg-emerald-500 transition disabled:opacity-50"
      >
        {formik.isSubmitting ? "Creating Account..." : "Create Account"}
      </button>

      <p className="text-center text-sm text-slate-400 mt-4">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-emerald-400 hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
};
