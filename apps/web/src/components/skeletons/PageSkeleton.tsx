import Skeleton from "@/components/ui/Skeleton";

export default function PageSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-64" />

      <div className="grid gap-4 md:grid-cols-3">
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
      </div>

      <Skeleton className="h-64" />
    </div>
  );
}
