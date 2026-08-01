import * as Yup from "yup";

export const appointmentBookingSchema = Yup.object().shape({
  professionalId: Yup.string().required("Please select a healthcare professional"),
  serviceType: Yup.string().required("Please select a service type"),
  scheduledAt: Yup.string().required("Please select date and time for visit"),
  phoneNumber: Yup.string()
    .matches(
      /^(2547|2541|07|01)\d{8}$/,
      "Enter a valid Safaricom M-Pesa phone number (e.g., 0712345678)"
    )
    .required("M-Pesa phone number is required"),
  notes: Yup.string().max(500, "Notes cannot exceed 500 characters"),
});
