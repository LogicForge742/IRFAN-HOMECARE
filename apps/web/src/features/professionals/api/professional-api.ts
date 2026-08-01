import { apiClient } from "@/infrastructure/http/api-client";
import type {
  ProfessionalProfile,
} from "@/types/professional";
import type { PaginatedResponse } from "@/types/common/pagination";

const MOCK_PROFESSIONALS: ProfessionalProfile[] = [
  {
    id: 1,
    name: "Dr. Sarah Kimani",
    specialization: "General Nursing & Elderly Care",
    bio: "Certified Registered Nurse with 8+ years specializing in elderly home care, chronic illness monitoring, and post-surgery rehabilitation.",
    rating: 4.9,
    reviewCount: 34,
    location: "Nairobi, Westlands",
    hourlyRate: 3500,
    email: "sarah.kimani@irfanhomecare.com",
    phoneNumber: "0712345678",
    yearsOfExperience: 8,
    availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  },
  {
    id: 2,
    name: "Dr. David Ochieng",
    specialization: "Physiotherapy & Rehabilitation",
    bio: "Licensed physical therapist experienced in spinal rehabilitation, stroke recovery, and specialized neuromuscular therapy.",
    rating: 4.8,
    reviewCount: 29,
    location: "Nairobi, Kilimani",
    hourlyRate: 5000,
    email: "david.ochieng@irfanhomecare.com",
    phoneNumber: "0723456789",
    yearsOfExperience: 10,
    availableDays: ["Mon", "Wed", "Fri", "Sat"],
  },
  {
    id: 3,
    name: "Nurse Grace Wanjiku",
    specialization: "Post-Operative Wound Care",
    bio: "Expert clinical nurse providing sterile dressing changes, intravenous medication administration, and palliative care.",
    rating: 5.0,
    reviewCount: 42,
    location: "Nairobi, Karen",
    hourlyRate: 2800,
    email: "grace.wanjiku@irfanhomecare.com",
    phoneNumber: "0734567890",
    yearsOfExperience: 6,
    availableDays: ["Tue", "Thu", "Sat", "Sun"],
  },
];

export async function getProfessionals(
  params?: Record<string, any>
): Promise<PaginatedResponse<ProfessionalProfile>> {
  try {
    const response = await apiClient.get<PaginatedResponse<ProfessionalProfile>>(
      "/professionals",
      { params }
    );
    return response.data;
  } catch {
    let list = [...MOCK_PROFESSIONALS];
    if (params?.search || params?.query) {
      const q = (params.search || params.query || "").toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.specialization.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q)
      );
    }
    if (params?.specialization && params.specialization !== "ALL") {
      list = list.filter((p) => p.specialization.toLowerCase().includes(params.specialization.toLowerCase()));
    }
    if (params?.location && params.location !== "ALL") {
      list = list.filter((p) => p.location.toLowerCase().includes(params.location.toLowerCase()));
    }

    const page = Number(params?.page) || 1;
    const perPage = Number(params?.per_page) || 10;
    const total = list.length;
    const items = list.slice((page - 1) * perPage, page * perPage);
    const pages = Math.ceil(total / perPage);

    return {
      data: items,
      metadata: {
        total,
        page,
        per_page: perPage,
        pages,
        has_next: page < pages,
        has_prev: page > 1,
      },
    };
  }
}

export async function getProfessionalById(
  id: number
): Promise<ProfessionalProfile> {
  try {
    const response = await apiClient.get<ProfessionalProfile>(
      `/professionals/${id}`
    );
    return response.data;
  } catch {
    const found = MOCK_PROFESSIONALS.find((p) => p.id === id);
    if (found) return found;
    return MOCK_PROFESSIONALS[0];
  }
}

export const professionalApi = {
  getProfessionals,
  getProfessionalById,
};
