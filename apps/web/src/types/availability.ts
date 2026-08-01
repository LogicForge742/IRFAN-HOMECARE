export interface AvailabilitySlot {
  id: number;
  professional_id: number;
  date: string;
  start_time: string;
  end_time: string;
  status: "available" | "booked" | "blocked";
}

export interface WorkingHours {
  day:
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday";
  start_time: string;
  end_time: string;
}

export interface CreateAvailabilityRequest {
  date: string;
  start_time: string;
  end_time: string;
}

export interface BlockTimeRequest {
  slot_id: number;
  reason: string;
}
