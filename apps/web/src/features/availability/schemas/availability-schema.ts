import * as Yup from "yup";

export const availabilitySchema = Yup.object({
  date: Yup.string().required("Date is required"),
  start_time: Yup.string().required("Start time is required"),
  end_time: Yup.string().required("End time is required"),
});
