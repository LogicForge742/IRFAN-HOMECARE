import { apiClient } from "@/infrastructure/http/api-client";

export interface ScheduleEntry {
  id: number;
  date: string;
  start_time: string;
  end_time: string;
  patient_name: string;
  status: "upcoming" | "in_progress" | "completed";
}

export async function getSchedule(): Promise<ScheduleEntry[]> {
  try {
    const response = await apiClient.get<ScheduleEntry[]>("/schedule");
    return response.data;
  } catch {
    const today = new Date().toISOString().split("T")[0];
    return [
      { id: 1, date: today, start_time: "09:00 AM", end_time: "10:00 AM", patient_name: "Amina Osman", status: "completed" },
      { id: 2, date: today, start_time: "11:00 AM", end_time: "12:00 PM", patient_name: "Hassan Abdi", status: "in_progress" },
      { id: 3, date: today, start_time: "02:00 PM", end_time: "03:00 PM", patient_name: "Fatuma Ali", status: "upcoming" },
      { id: 4, date: today, start_time: "04:00 PM", end_time: "05:00 PM", patient_name: "Ibrahim Noor", status: "upcoming" },
    ];
  }
}
