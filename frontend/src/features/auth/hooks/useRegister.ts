import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { registerRequest, createPatientProfile, createProfessionalProfile } from "../api/auth.api";
import { useAuthStore } from "../store/auth.store";
import { getRedirectPath } from "../utils";
import type { RegisterFormData } from "../schemas/register.schema";

export function useRegister() {
    const navigate = useNavigate();

    const setAuth = useAuthStore((state) => state.setAuth);

    return useMutation({
        mutationFn: async (data: RegisterFormData) => {
            // 1. Separate base registration fields from role-specific fields
            const {
                first_name,
                last_name,
                email,
                password,
                role,
                // Patient fields
                patient_phone_number,
                patient_date_of_birth,
                patient_gender,
                patient_address,
                patient_blood_group,
                patient_emergency_contact_name,
                patient_emergency_contact_phone,
                patient_medical_notes,
                // Professional fields
                prof_phone_number,
                prof_license_number,
                prof_specialization,
                prof_qualification,
                prof_years_of_experience,
                prof_consultation_fee,
            } = data;

            // 2. Submit base registration request
            const authResult = await registerRequest({
                first_name,
                last_name,
                email,
                password,
                role,
            });

            const token = authResult.accessToken;

            // 3. Create profile based on selected role
            if (role === "patient") {
                const patientPayload = {
                    phone_number: patient_phone_number || undefined,
                    date_of_birth: patient_date_of_birth || undefined,
                    gender: patient_gender || undefined,
                    address: patient_address || undefined,
                    blood_group: patient_blood_group || undefined,
                    emergency_contact_name: patient_emergency_contact_name || undefined,
                    emergency_contact_phone: patient_emergency_contact_phone || undefined,
                    medical_notes: patient_medical_notes || undefined,
                };
                
                // Only post profile if at least one field is provided
                if (Object.values(patientPayload).some(v => v !== undefined)) {
                    await createPatientProfile(token, patientPayload);
                }
            } else if (role === "professional") {
                await createProfessionalProfile(token, {
                    phone_number: prof_phone_number!,
                    license_number: prof_license_number!,
                    specialization: prof_specialization!,
                    qualification: prof_qualification!,
                    years_of_experience: Number(prof_years_of_experience),
                    consultation_fee: Number(prof_consultation_fee),
                });
            }

            return authResult;
        },

        onSuccess: (data) => {
            setAuth(
                data.user,
                data.accessToken,
                data.refreshToken
            );

            navigate(getRedirectPath(data.user), {
                replace: true,
            });
        },

        onError: (error) => {
            console.error("Registration failed", error);
        },
    });
}
