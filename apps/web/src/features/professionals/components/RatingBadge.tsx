import React from "react";
import { Star } from "lucide-react";

interface Props {
  rating: number;
  reviewCount?: number;
}

export const RatingBadge: React.FC<Props> = ({ rating, reviewCount }) => {
  return (
    <div className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold border border-amber-500/20">
      <Star className="w-3.5 h-3.5 fill-current" />
      <span>{rating.toFixed(1)}</span>
      {reviewCount !== undefined && (
        <span className="text-[10px] text-slate-400">({reviewCount})</span>
      )}
    </div>
  );
};
