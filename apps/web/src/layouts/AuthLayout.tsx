import React from "react";
import { Outlet } from "react-router-dom";
import { HeartPulse } from "lucide-react";

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-slate-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <div className="inline-flex items-center justify-center p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl ring-1 ring-emerald-500/20 shadow-inner">
          <HeartPulse className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-white">
          Irfan HomeCare
        </h2>
        <p className="text-sm text-slate-400">
          Healthcare Services & Professional Patient Management
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-900 border border-slate-800 py-8 px-6 shadow-2xl rounded-2xl sm:px-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
