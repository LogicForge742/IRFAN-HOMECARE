import type { Payment } from "@/types/payment";
import PaymentStatusBadge from "./PaymentStatusBadge";
import { CreditCard, Calendar, ShieldCheck } from "lucide-react";

interface Props {
  payment: Payment;
}

export default function PaymentCard({ payment }: Props) {
  return (
    <div className="border border-slate-800 rounded-2xl p-5 bg-slate-900 shadow-xl space-y-3 hover:border-slate-700 transition">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h3 className="font-bold text-white text-lg flex items-center space-x-2">
            <CreditCard className="w-5 h-5 text-emerald-400" />
            <span>Payment #{payment.id}</span>
          </h3>
          <p className="text-xs text-slate-400">
            Provider: {payment.provider} {payment.reference ? `(${payment.reference})` : ""}
          </p>
        </div>
        <PaymentStatusBadge status={payment.status} />
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
        <span className="text-slate-400 flex items-center space-x-1">
          <Calendar className="w-3.5 h-3.5" />
          <span>{payment.created_at.split("T")[0]}</span>
        </span>
        <span className="font-bold text-emerald-400 text-sm flex items-center space-x-1">
          <ShieldCheck className="w-4 h-4" />
          <span>KES {payment.amount.toLocaleString()}</span>
        </span>
      </div>
    </div>
  );
}
