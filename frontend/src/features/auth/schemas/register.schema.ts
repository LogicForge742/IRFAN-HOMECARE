import { z } from "zod";

export const registerBaseSchema = z.object({
    first_name: z
        .string()
        .min(2, "First name must contain at least 2 characters.")
        .max(100, "First name must not exceed 100 characters.")
        .trim(),

    last_name: z
        .string()
        .min(2, "Last name must contain at least 2 characters.")
        .max(100, "Last name must not exceed 100 characters.")
        .trim(),

    email: z
        .string()
        .email("Please enter a valid email address.")
        .trim()
        .toLowerCase(),

    password: z
        .string()
        .min(8, "Password must contain at least 8 characters."),

    confirmPassword: z
        .string()
        .min(8, "Confirm password must contain at least 8 characters."),

    role: z
        .enum(["patient", "professional", "admin"]),

    // Patient profile fields (optional)
    patient_phone_number: z.string().optional(),
    patient_date_of_birth: z.string().optional(),
    patient_gender: z.string().optional(),
    patient_address: z.string().optional(),
    patient_blood_group: z.string().optional(),
    patient_emergency_contact_name: z.string().optional(),
    patient_emergency_contact_phone: z.string().optional(),
    patient_medical_notes: z.string().optional(),

    // Professional profile fields (conditional/required if role === 'professional')
    prof_phone_number: z.string().optional(),
    prof_license_number: z.string().optional(),
    prof_specialization: z.string().optional(),
    prof_qualification: z.string().optional(),
    prof_years_of_experience: z.coerce.number().int().min(0).optional(),
    prof_consultation_fee: z.coerce.number().min(0).optional(),
});

export const registerSchema = registerBaseSchema
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"],
    })
    .superRefine((data, ctx) => {
        if (data.role === "professional") {
            if (!data.prof_phone_number || data.prof_phone_number.trim().length < 10) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Phone number is required (min 10 characters).",
                    path: ["prof_phone_number"],
                });
            }
            if (!data.prof_license_number || data.prof_license_number.trim().length < 3) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "License number is required (min 3 characters).",
                    path: ["prof_license_number"],
                });
            }
            if (!data.prof_specialization || data.prof_specialization.trim().length < 2) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Specialization is required.",
                    path: ["prof_specialization"],
                });
            }
            if (!data.prof_qualification || data.prof_qualification.trim().length < 2) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Qualification is required.",
                    path: ["prof_qualification"],
                });
            }
            if (data.prof_years_of_experience === undefined || isNaN(data.prof_years_of_experience)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Years of experience is required.",
                    path: ["prof_years_of_experience"],
                });
            }
            if (data.prof_consultation_fee === undefined || isNaN(data.prof_consultation_fee)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Consultation fee is required.",
                    path: ["prof_consultation_fee"],
                });
            }
        }
    });

export type RegisterFormData = z.infer<typeof registerBaseSchema>;
