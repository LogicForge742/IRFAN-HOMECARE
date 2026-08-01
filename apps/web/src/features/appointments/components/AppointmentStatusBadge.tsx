

interface Props {
  status: string;
}

export default function AppointmentStatusBadge({ status }: Props) {
  const getBadgeStyle = () => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
      case "completed":
        return "bg-blue-500/10 text-blue-400 border border-blue-500/20";
      case "cancelled":
        return "bg-rose-500/10 text-rose-400 border border-rose-500/20";
      case "pending":
      default:
        return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
    }
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${getBadgeStyle()}`}
    >
      {status}
    </span>
  );
}
