import { useState } from "react";
import { useMpesaPayment } from "../hooks/usePayments";
import { CreditCard, Smartphone } from "lucide-react";
import { toast } from "sonner";

interface Props {
  appointmentId: number;
  amount: number;
  onSuccess?: () => void;
}

export default function MpesaPaymentModal({
  appointmentId,
  amount,
  onSuccess,
}: Props) {
  const [phone, setPhone] = useState("");
  const payment = useMpesaPayment();

  function submit() {
    if (!phone) {
      toast.error("Please enter your M-Pesa phone number");
      return;
    }
    payment.mutate(
      {
        appointment_id: appointmentId,
        amount,
        phone_number: phone,
      },
      {
        onSuccess() {
          toast.success(`M-Pesa STK push sent to ${phone}! Check your phone.`);
          if (onSuccess) onSuccess();
        },
        onError() {
          toast.error("Failed to initiate M-Pesa STK Push");
        },
      }
    );
  }

  return (
    <div className="space-y-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
      <div className="flex items-center space-x-2 text-emerald-400">
        <CreditCard className="w-5 h-5" />
        <h2 className="font-bold text-lg text-white">Pay with M-Pesa</h2>
      </div>

      <p className="text-xs text-slate-400">
        Enter your Safaricom M-Pesa phone number to receive an instant PIN prompt on your phone for KES {amount.toLocaleString()}.
      </p>

      <div className="relative">
        <input
          className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          placeholder="07XXXXXXXX"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Smartphone className="w-4 h-4 text-emerald-400 absolute right-3 top-3" />
      </div>

      <button
        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-4 py-2.5 rounded-xl transition shadow-lg shadow-emerald-950/40 disabled:opacity-50"
        onClick={submit}
        disabled={payment.isPending}
      >
        {payment.isPending ? "Sending STK Push..." : "Send STK Push"}
      </button>
    </div>
  );
}
