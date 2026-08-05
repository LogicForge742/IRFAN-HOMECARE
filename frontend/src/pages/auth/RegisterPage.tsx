import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { User, Stethoscope, Shield } from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { PATHS } from "@/routes/paths";
import { registerSchema, type RegisterFormData } from "@/features/auth/schemas/register.schema";
import { useRegister } from "@/features/auth/hooks/useRegister";

export default function RegisterPage() {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema) as any,
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "patient",
            patient_phone_number: "",
            patient_date_of_birth: "",
            patient_gender: "",
            patient_address: "",
            patient_blood_group: "",
            patient_emergency_contact_name: "",
            patient_emergency_contact_phone: "",
            patient_medical_notes: "",
            prof_phone_number: "",
            prof_license_number: "",
            prof_specialization: "",
            prof_qualification: "",
            prof_years_of_experience: undefined,
            prof_consultation_fee: undefined,
        },
    });

    const registerMutation = useRegister();
    const selectedRole = watch("role", "patient");

    function onSubmit(data: RegisterFormData) {
        registerMutation.mutate(data, {
            onSuccess: () => {
                toast.success("Successfully registered! Welcome to Irfan HomeCare.");
            },
            onError: (error: any) => {
                const message = error?.response?.data?.message || error?.message || "Failed to create account. Please try again.";
                toast.error(message);
            },
        });
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-6 py-12 animate-fade-in">
            <Card className={`w-full transition-all duration-300 shadow-xl ${selectedRole === "admin" ? "max-w-md" : "max-w-2xl"}`}>
                <CardHeader className="space-y-3 text-center">
                    <div className="flex justify-center">
                        <Badge variant="outline" className="px-3 py-1 text-xs font-semibold text-teal-600 bg-teal-50 border-teal-200">
                            Irfan HomeCare
                        </Badge>
                    </div>

                    <CardTitle className="text-3xl font-extrabold tracking-tight text-foreground">
                        Create Account
                    </CardTitle>

                    <CardDescription>
                        Sign up to start managing your home care services.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        {/* Role Selector */}
                        <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Register as</Label>
                            <div className="grid grid-cols-3 gap-2.5 bg-slate-100/50 p-1.5 rounded-2xl border border-slate-200/60 shadow-inner">
                                {[
                                    { value: "patient", label: "Patient", icon: User },
                                    { value: "professional", label: "Professional", icon: Stethoscope },
                                    { value: "admin", label: "Admin", icon: Shield },
                                ].map((roleOption) => {
                                    const IconComponent = roleOption.icon;
                                    const isSelected = selectedRole === roleOption.value;
                                    return (
                                        <button
                                            key={roleOption.value}
                                            type="button"
                                            onClick={() => setValue("role", roleOption.value as any)}
                                            className={`flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs sm:text-sm font-bold rounded-xl transition-all duration-300 transform active:scale-95 cursor-pointer text-center ${
                                                isSelected
                                                    ? "bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-md border-0"
                                                    : "text-slate-600 hover:bg-white/60 hover:text-slate-800"
                                            }`}
                                        >
                                            <IconComponent className={`h-4 w-4 transition-transform duration-300 ${isSelected ? "scale-110" : "opacity-75"}`} />
                                            <span>{roleOption.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                            {errors.role && (
                                <p className="text-xs text-danger">
                                    {errors.role.message}
                                </p>
                            )}
                        </div>

                        {/* Base Fields */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground border-b border-border pb-1">
                                Account Information
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="first_name">First Name</Label>
                                    <Input
                                        id="first_name"
                                        placeholder="John"
                                        {...register("first_name")}
                                    />
                                    {errors.first_name && (
                                        <p className="text-xs text-danger">
                                            {errors.first_name.message}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="last_name">Last Name</Label>
                                    <Input
                                        id="last_name"
                                        placeholder="Doe"
                                        {...register("last_name")}
                                    />
                                    {errors.last_name && (
                                        <p className="text-xs text-danger">
                                            {errors.last_name.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <p className="text-xs text-danger">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        autoComplete="new-password"
                                        {...register("password")}
                                    />
                                    {errors.password && (
                                        <p className="text-xs text-danger">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="••••••••"
                                        autoComplete="new-password"
                                        {...register("confirmPassword")}
                                    />
                                    {errors.confirmPassword && (
                                        <p className="text-xs text-danger">
                                            {errors.confirmPassword.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Dynamic Patient Fields */}
                        {selectedRole === "patient" && (
                            <div className="space-y-4 animate-fade-in">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground border-b border-border pb-1">
                                    Patient Profile Details (Optional)
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="patient_phone_number">Phone Number</Label>
                                        <Input
                                            id="patient_phone_number"
                                            placeholder="+254 712 345678"
                                            {...register("patient_phone_number")}
                                        />
                                        {errors.patient_phone_number && (
                                            <p className="text-xs text-danger">
                                                {errors.patient_phone_number.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="patient_date_of_birth">Date of Birth</Label>
                                        <Input
                                            id="patient_date_of_birth"
                                            type="date"
                                            {...register("patient_date_of_birth")}
                                        />
                                        {errors.patient_date_of_birth && (
                                            <p className="text-xs text-danger">
                                                {errors.patient_date_of_birth.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="patient_gender">Gender</Label>
                                        <select
                                            id="patient_gender"
                                            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                                            {...register("patient_gender")}
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        {errors.patient_gender && (
                                            <p className="text-xs text-danger">
                                                {errors.patient_gender.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="patient_blood_group">Blood Group</Label>
                                        <Input
                                            id="patient_blood_group"
                                            placeholder="O+"
                                            {...register("patient_blood_group")}
                                        />
                                        {errors.patient_blood_group && (
                                            <p className="text-xs text-danger">
                                                {errors.patient_blood_group.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="patient_address">Home Address</Label>
                                    <Input
                                        id="patient_address"
                                        placeholder="123 Care Street, Nairobi"
                                        {...register("patient_address")}
                                    />
                                    {errors.patient_address && (
                                        <p className="text-xs text-danger">
                                            {errors.patient_address.message}
                                        </p>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="patient_emergency_contact_name">Emergency Contact Name</Label>
                                        <Input
                                            id="patient_emergency_contact_name"
                                            placeholder="Jane Doe"
                                            {...register("patient_emergency_contact_name")}
                                        />
                                        {errors.patient_emergency_contact_name && (
                                            <p className="text-xs text-danger">
                                                {errors.patient_emergency_contact_name.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="patient_emergency_contact_phone">Emergency Contact Phone</Label>
                                        <Input
                                            id="patient_emergency_contact_phone"
                                            placeholder="+254 712 345678"
                                            {...register("patient_emergency_contact_phone")}
                                        />
                                        {errors.patient_emergency_contact_phone && (
                                            <p className="text-xs text-danger">
                                                {errors.patient_emergency_contact_phone.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="patient_medical_notes">Medical Notes / Conditions</Label>
                                    <textarea
                                        id="patient_medical_notes"
                                        placeholder="Allergies, chronic conditions, etc."
                                        className="w-full min-h-[80px] px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                                        {...register("patient_medical_notes")}
                                    />
                                    {errors.patient_medical_notes && (
                                        <p className="text-xs text-danger">
                                            {errors.patient_medical_notes.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Dynamic Professional Fields */}
                        {selectedRole === "professional" && (
                            <div className="space-y-4 animate-fade-in">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground border-b border-border pb-1">
                                    Professional Credentials (Required)
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="prof_phone_number">Phone Number</Label>
                                        <Input
                                            id="prof_phone_number"
                                            placeholder="+254 712 345678"
                                            {...register("prof_phone_number")}
                                        />
                                        {errors.prof_phone_number && (
                                            <p className="text-xs text-danger">
                                                {errors.prof_phone_number.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="prof_license_number">License Number</Label>
                                        <Input
                                            id="prof_license_number"
                                            placeholder="MED-12345"
                                            {...register("prof_license_number")}
                                        />
                                        {errors.prof_license_number && (
                                            <p className="text-xs text-danger">
                                                {errors.prof_license_number.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="prof_specialization">Specialization</Label>
                                        <Input
                                            id="prof_specialization"
                                            placeholder="General Nursing, Physiotherapy"
                                            {...register("prof_specialization")}
                                        />
                                        {errors.prof_specialization && (
                                            <p className="text-xs text-danger">
                                                {errors.prof_specialization.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="prof_qualification">Qualification</Label>
                                        <Input
                                            id="prof_qualification"
                                            placeholder="BSc in Nursing"
                                            {...register("prof_qualification")}
                                        />
                                        {errors.prof_qualification && (
                                            <p className="text-xs text-danger">
                                                {errors.prof_qualification.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="prof_years_of_experience">Years of Experience</Label>
                                        <Input
                                            id="prof_years_of_experience"
                                            type="number"
                                            placeholder="5"
                                            {...register("prof_years_of_experience")}
                                        />
                                        {errors.prof_years_of_experience && (
                                            <p className="text-xs text-danger">
                                                {errors.prof_years_of_experience.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="prof_consultation_fee">Consultation Fee ($)</Label>
                                        <Input
                                            id="prof_consultation_fee"
                                            type="number"
                                            placeholder="50"
                                            {...register("prof_consultation_fee")}
                                        />
                                        {errors.prof_consultation_fee && (
                                            <p className="text-xs text-danger">
                                                {errors.prof_consultation_fee.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full bg-teal-600 hover:bg-teal-700 font-semibold py-2.5 rounded-xl transition duration-200 shadow-md text-white"
                            loading={isSubmitting || registerMutation.isPending}
                        >
                            Sign Up
                        </Button>

                        <p className="text-center text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <Link to={PATHS.auth.login} className="font-semibold text-teal-600 hover:underline">
                                Sign In
                            </Link>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
}
