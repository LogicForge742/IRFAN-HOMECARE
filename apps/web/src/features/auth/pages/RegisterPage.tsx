import React from "react";
import { RegisterForm } from "../components/RegisterForm";

export const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white border rounded-2xl p-8 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-slate-900">Create Account</h1>
          <p className="text-sm text-slate-600">
            Join Irfan HomeCare as a Patient or Healthcare Provider
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
};
