import React from "react";
import { useFormik } from "formik";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import { authApi } from "../api/auth-api";
import { loginSchema } from "../schemas/auth-schemas";
import { useAuthStore } from "../stores/auth-store";

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await authApi.login(values);
        if (response.user && response.access_token) {
          setAuth(response.user, response.access_token);
          toast.success("Logged in successfully!");
          navigate("/dashboard");
        } else {
          toast.success(response.message || "Login successful");
          navigate("/dashboard");
        }
      } catch (error: any) {
        const msg = error.response?.data?.message || "Invalid credentials";
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
        <div className="flex justify-between items-center mb-1">
          <label className="block text-sm font-medium text-slate-300">
            Password
          </label>
          <Link
            to="/forgot-password"
            className="text-xs text-emerald-400 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
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
        {formik.isSubmitting ? "Signing in..." : "Sign In"}
      </button>

      <p className="text-center text-sm text-slate-400 mt-4">
        Don't have an account?{" "}
        <Link to="/register" className="font-semibold text-emerald-400 hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
};
