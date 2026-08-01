export interface ProfessionalProfile {
  id: number;
  name: string;
  specialization: string;
  bio: string;
  rating: number;
  reviewCount: number;
  location: string;
  hourlyRate: number;
  email: string;
  phoneNumber?: string;
  yearsOfExperience: number;
  availableDays: string[];
  avatarUrl?: string;
}

export interface ProfessionalFilterParams {
  query?: string;
  specialization?: string;
  location?: string;
  minRate?: number;
  maxRate?: number;
}
