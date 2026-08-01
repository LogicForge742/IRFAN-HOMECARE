import Skeleton from "@/components/ui/Skeleton";

export default function CardSkeleton() {
  return (
    <div className="rounded-xl border border-slate-800 p-5 space-y-4 bg-slate-900">
      <Skeleton className="h-6 w-1/2" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
}
