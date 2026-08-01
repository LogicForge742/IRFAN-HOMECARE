import * as Yup from "yup";

export const appointmentSchema = Yup.object({
  reason: Yup.string()
    .min(5, "Reason is too short")
    .required("Reason required"),
  availability_id: Yup.number().required("Select a time slot"),
  professional_id: Yup.number().required(),
});
