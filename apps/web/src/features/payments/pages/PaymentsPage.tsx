import { usePayments } from "../hooks/usePayments";
import PaymentCard from "../components/PaymentCard";
import { CreditCard } from "lucide-react";

export default function PaymentsPage() {
  const { data, isLoading } = usePayments();

  if (isLoading)
    return (
      <div className="p-8 text-center text-sm text-slate-400">
        Loading payments...
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-2">
        <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
          <CreditCard className="w-6 h-6 text-emerald-400" />
          <span>Payments & Financial Transactions</span>
        </h1>
        <p className="text-sm text-slate-400">
          Track completed, pending, and refunded M-Pesa transactions
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {data?.map((payment) => (
          <PaymentCard key={payment.id} payment={payment} />
        ))}
      </div>
    </div>
  );
}
