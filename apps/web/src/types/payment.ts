export type PaymentStatus =
  | "pending"
  | "completed"
  | "failed";

export interface Payment {
  id: number;
  appointment_id: number;
  amount: number;
  status: PaymentStatus;
  provider: string;
  reference?: string;
  provider_reference?: string;
  created_at: string;
}

export interface MpesaPaymentRequest {
  appointment_id: number;
  phone_number: string;
  amount: number;
}
