import * as Yup from "yup";

export const mpesaPaymentSchema = Yup.object({
  phone_number: Yup.string()
    .matches(/^(?:254|\+254|0)?(7|1)\d{8}$/, "Invalid Kenyan M-Pesa phone number format")
    .required("Phone number is required"),
  amount: Yup.number().positive("Amount must be positive").required("Amount is required"),
  appointment_id: Yup.number().required("Appointment ID is required"),
});
