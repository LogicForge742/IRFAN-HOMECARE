import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
              <div className="rounded-xl border bg-white p-8 shadow-lg max-w-md w-full text-center space-y-4">
                <h1 className="text-3xl font-bold text-slate-900">
                  Irfan HomeCare
                </h1>
                <p className="text-slate-600">
                  Healthcare Platform Application Ready
                </p>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                  VITE + React-TS + Tailwind
                </div>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
