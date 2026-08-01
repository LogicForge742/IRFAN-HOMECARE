import * as Yup from "yup";

export const professionalSearchSchema = Yup.object({
  query: Yup.string(),
  specialization: Yup.string(),
  location: Yup.string(),
  minRate: Yup.number().min(0, "Minimum rate must be non-negative"),
  maxRate: Yup.number().min(0, "Maximum rate must be non-negative"),
});
