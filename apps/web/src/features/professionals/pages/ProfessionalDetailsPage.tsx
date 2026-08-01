import React from "react";
import { useParams, Link } from "react-router-dom";
import { useProfessional } from "../hooks/useProfessionals";
import { ProfessionalProfile } from "../components/ProfessionalProfile";
import { ArrowLeft } from "lucide-react";

export const ProfessionalDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const profId = Number(id) || 1;
  const { data: professional, isLoading } = useProfessional(profId);

  if (isLoading) {
    return (
      <div className="p-8 text-center text-sm text-slate-400">
        Loading professional profile...
      </div>
    );
  }

  if (!professional) {
    return (
      <div className="p-8 text-center text-sm text-slate-400">
        Professional not found.
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <Link
        to="/professionals"
        className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Search</span>
      </Link>

      <ProfessionalProfile professional={professional} />
    </div>
  );
};
