import React from "react";
import { RegisterForm } from "../components/RegisterForm";

export const RegisterPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-bold text-white">Create Account</h1>
        <p className="text-sm text-slate-400">
          Join Irfan HomeCare as a Patient or Provider
        </p>
      </div>
      <RegisterForm />
    </div>
  );
};
