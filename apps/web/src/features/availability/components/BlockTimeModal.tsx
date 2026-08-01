import { useBlockAvailability } from "../hooks/useAvailability";
import { Ban } from "lucide-react";
import { toast } from "sonner";

export default function BlockTimeModal({ slotId }: { slotId: number }) {
  const mutation = useBlockAvailability();

  const handleBlock = () => {
    mutation.mutate(
      {
        slot_id: slotId,
        reason: "Unavailable",
      },
      {
        onSuccess() {
          toast.success("Time slot blocked!");
        },
        onError() {
          toast.error("Failed to block time slot");
        },
      }
    );
  };

  return (
    <button
      className="inline-flex items-center space-x-1 px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-xl text-xs font-semibold transition disabled:opacity-50"
      onClick={handleBlock}
      disabled={mutation.isPending}
    >
      <Ban className="w-3.5 h-3.5" />
      <span>{mutation.isPending ? "Blocking..." : "Block Time"}</span>
    </button>
  );
}
