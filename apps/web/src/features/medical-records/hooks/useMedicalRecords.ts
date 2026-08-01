import { useQuery } from "@tanstack/react-query";
import { getMedicalRecords, getMedicalRecordById } from "../api/medical-record-api";

export function useMedicalRecords() {
  return useQuery({
    queryKey: ["medical-records"],
    queryFn: getMedicalRecords,
  });
}

export function useMedicalRecord(id: number) {
  return useQuery({
    queryKey: ["medical-record", id],
    queryFn: () => getMedicalRecordById(id),
  });
}
