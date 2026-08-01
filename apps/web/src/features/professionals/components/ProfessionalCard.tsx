import React from "react";
import type { ProfessionalProfile } from "@/types/professional";
import { RatingBadge } from "./RatingBadge";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  professional: ProfessionalProfile;
}

export const ProfessionalCard: React.FC<Props> = ({ professional }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 hover:border-emerald-500/50 transition flex flex-col justify-between">
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold text-lg">
            {professional.name.charAt(0)}
          </div>
          <RatingBadge
            rating={professional.rating}
            reviewCount={professional.reviewCount}
          />
        </div>

        <div>
          <h3 className="font-bold text-white text-lg">{professional.name}</h3>
          <p className="text-xs text-emerald-400 font-medium">
            {professional.specialization}
          </p>
        </div>

        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {professional.bio}
        </p>

        <div className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-slate-800">
          <div className="flex items-center space-x-2">
            <MapPin className="w-3.5 h-3.5 text-slate-500" />
            <span>{professional.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>{professional.availableDays.join(", ")}</span>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider">
            Hourly Rate
          </span>
          <p className="text-base font-bold text-white">
            {professional.hourlyRate.toLocaleString()} KES
          </p>
        </div>

        <Link
          to={`/professionals/${professional.id}`}
          className="inline-flex items-center space-x-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition shadow-lg shadow-emerald-950/40"
        >
          <span>View Profile</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
