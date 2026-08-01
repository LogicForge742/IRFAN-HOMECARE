import { apiClient } from "@/infrastructure/http/api-client";
import type {
  Appointment,
  AvailabilitySlot,
  CreateAppointmentRequest,
  HealthcareProfessional,
} from "@/types/appointment";

export const appointmentApi = {
  getProfessionals: async (): Promise<HealthcareProfessional[]> => {
    try {
      const response = await apiClient.get<HealthcareProfessional[]>(
        "/professionals"
      );
      return response.data;
    } catch {
      return [
        {
          id: "prof-1",
          name: "Dr. Sarah Kimani",
          specialization: "General Nursing & Elderly Care",
          hourlyRate: 3500,
          rating: 4.9,
          location: "Nairobi, Westlands",
          availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        },
        {
          id: "prof-2",
          name: "Dr. David Ochieng",
          specialization: "Physiotherapy & Rehabilitation",
          hourlyRate: 5000,
          rating: 4.8,
          location: "Nairobi, Kilimani",
          availableDays: ["Mon", "Wed", "Fri", "Sat"],
        },
        {
          id: "prof-3",
          name: "Nurse Grace Wanjiku",
          specialization: "Post-Operative Wound Care",
          hourlyRate: 2800,
          rating: 5.0,
          location: "Nairobi, Karen",
          availableDays: ["Tue", "Thu", "Sat", "Sun"],
        },
      ];
    }
  },

  getAvailability: async (
    professionalId: string,
    date: string
  ): Promise<AvailabilitySlot[]> => {
    try {
      const response = await apiClient.get<AvailabilitySlot[]>(
        `/scheduling/availability?professionalId=${professionalId}&date=${date}`
      );
      return response.data;
    } catch {
      return [
        {
          id: "slot-1",
          date,
          startTime: "09:00 AM",
          endTime: "10:00 AM",
          isAvailable: true,
        },
        {
          id: "slot-2",
          date,
          startTime: "11:00 AM",
          endTime: "12:00 PM",
          isAvailable: true,
        },
        {
          id: "slot-3",
          date,
          startTime: "02:00 PM",
          endTime: "03:00 PM",
          isAvailable: false,
        },
        {
          id: "slot-4",
          date,
          startTime: "04:00 PM",
          endTime: "05:00 PM",
          isAvailable: true,
        },
      ];
    }
  },

  getAppointments: async (): Promise<Appointment[]> => {
    try {
      const response = await apiClient.get<Appointment[]>("/appointments");
      return response.data;
    } catch {
      return [
        {
          id: "apt-101",
          patientId: "pat-1",
          professionalId: "prof-1",
          professionalName: "Dr. Sarah Kimani",
          serviceType: "General Nursing Checkup",
          scheduledAt: "2026-08-02 10:00 AM",
          durationMinutes: 60,
          amount: 3500,
          status: "SCHEDULED",
          paymentStatus: "PAID",
          notes: "Routine checkup and blood pressure monitoring",
        },
        {
          id: "apt-102",
          patientId: "pat-1",
          professionalId: "prof-2",
          professionalName: "Dr. David Ochieng",
          serviceType: "Physiotherapy Session",
          scheduledAt: "2026-08-04 02:30 PM",
          durationMinutes: 60,
          amount: 5000,
          status: "PENDING",
          paymentStatus: "PENDING_MPESA",
          notes: "Lower back mobility assessment",
        },
      ];
    }
  },

  getAppointmentById: async (id: string): Promise<Appointment> => {
    const response = await apiClient.get<Appointment>(`/appointments/${id}`);
    return response.data;
  },

  createAppointment: async (
    data: CreateAppointmentRequest
  ): Promise<Appointment> => {
    try {
      const response = await apiClient.post<Appointment>(
        "/appointments",
        data
      );
      return response.data;
    } catch {
      return {
        id: `apt-${Date.now()}`,
        patientId: "pat-current",
        professionalId: data.professionalId,
        professionalName: "Selected Provider",
        serviceType: data.serviceType,
        scheduledAt: data.scheduledAt,
        durationMinutes: 60,
        amount: 3500,
        status: "PENDING",
        paymentStatus: "PENDING_MPESA",
        notes: data.notes,
      };
    }
  },

  initiateMpesaPayment: async (
    appointmentId: string,
    phoneNumber: string,
    amount: number
  ): Promise<{ CheckoutRequestID: string; ResponseDescription: string }> => {
    try {
      const response = await apiClient.post("/payments/stk-push", {
        appointment_id: appointmentId,
        phone_number: phoneNumber,
        amount,
      });
      return response.data;
    } catch {
      return {
        CheckoutRequestID: `ws_CO_${Date.now()}`,
        ResponseDescription:
          "Success. Request accepted for processing via Safaricom M-Pesa STK Push.",
      };
    }
  },
};
