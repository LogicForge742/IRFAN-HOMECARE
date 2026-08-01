import React from "react";

interface LoadingSkeletonProps {
  rows?: number;
  columns?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  rows = 5,
  columns = 4,
}) => {
  return (
    <div className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-4 animate-pulse">
      <div className="flex space-x-4 pb-4 border-b border-slate-800">
        {Array.from({ length: columns }).map((_, idx) => (
          <div
            key={`header-${idx}`}
            className="h-4 bg-slate-800 rounded-md"
            style={{ width: `${100 / columns}%` }}
          />
        ))}
      </div>

      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div key={`row-${rowIdx}`} className="flex space-x-4 py-2">
          {Array.from({ length: columns }).map((_, colIdx) => (
            <div
              key={`cell-${rowIdx}-${colIdx}`}
              className="h-3 bg-slate-800 rounded-md"
              style={{ width: `${100 / columns}%` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
export default LoadingSkeleton;
