import { useParams, Link } from "react-router-dom";
import PaymentStatusBadge from "../components/PaymentStatusBadge";
import { CreditCard, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function PaymentDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const payment = {
    id: Number(id) || 1,
    appointment_id: 101,
    amount: 3500,
    status: "completed",
    provider: "M-PESA",
    reference: "REC-9821839",
    provider_reference: "QKH9821382",
    created_at: new Date().toISOString(),
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <Link
        to="/payments"
        className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Payments</span>
      </Link>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h1 className="text-xl font-bold text-white flex items-center space-x-2">
            <CreditCard className="w-5 h-5 text-emerald-400" />
            <span>Transaction #{payment.id}</span>
          </h1>
          <PaymentStatusBadge status={payment.status} />
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between py-2 border-b border-slate-800/60">
            <span className="text-slate-400">Payment Method</span>
            <span className="font-semibold text-white">{payment.provider}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-800/60">
            <span className="text-slate-400">Receipt Ref</span>
            <span className="font-mono text-emerald-400">{payment.reference}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-800/60">
            <span className="text-slate-400">Provider Receipt</span>
            <span className="font-mono text-slate-300">
              {payment.provider_reference}
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-slate-400">Total Amount Paid</span>
            <span className="font-bold text-white text-lg">
              KES {payment.amount.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="pt-2 flex items-center space-x-2 text-xs text-emerald-400 font-semibold bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
          <CheckCircle2 className="w-4 h-4" />
          <span>Payment Verified & Cleared by Safaricom Daraja API</span>
        </div>
      </div>
    </div>
  );
}
