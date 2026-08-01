import * as Yup from "yup";

export const medicalRecordSchema = Yup.object({
  diagnosis: Yup.string().required("Diagnosis is required"),
  notes: Yup.string().required("Clinical notes are required"),
  appointment_id: Yup.number().required("Appointment ID is required"),
});
