import * as Yup from "yup";

export const consultationSchema = Yup.object({
  diagnosis: Yup.string().required("Diagnosis is required"),
  notes: Yup.string().required("Consultation notes are required"),
  appointment_id: Yup.number().required("Appointment ID is required"),
  prescriptions: Yup.array().of(
    Yup.object({
      medicine: Yup.string().required("Medicine name is required"),
      dosage: Yup.string().required("Dosage is required"),
      instructions: Yup.string(),
    })
  ),
});
