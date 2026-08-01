import React from "react";
import { LoginForm } from "../components/LoginForm";

export const LoginPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
        <p className="text-sm text-slate-400">
          Sign in to your Irfan HomeCare account
        </p>
      </div>
      <LoginForm />
    </div>
  );
};
