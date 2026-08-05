import { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { 
    Calendar, 
    User, 
    Clock, 
    MessageSquare, 
    Activity, 
    PlusCircle,
    FileText,
    Settings,
    CheckCircle2,
    RefreshCw,
    Shield,
    Users,
    CheckSquare,
    AlertCircle
} from "lucide-react";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { usePatientAppointments } from "@/features/appointments/hooks/useAppointments";
import { useProfessionalDashboard, useProfessionalProfile } from "@/features/providers/hooks/useProfessionalDashboard";
import type { AppointmentItem } from "@/features/appointments/services/appointment.service";

export default function DashboardPage() {
    const authUser = useAuthStore((state) => state.user);

    // Render Admin view if role is admin
    if (authUser?.role === "admin") {
        return <AdminDashboardView authUser={authUser} />;
    }

    // Render Professional view if role is professional or doctor
    if (authUser?.role === "professional" || authUser?.role === "doctor") {
        return <ProfessionalDashboardView authUser={authUser} />;
    }

    // Default: Patient view
    return <PatientDashboardView authUser={authUser} />;
}

/* ==========================================================================
   1. Healthcare Professional / Doctor Dashboard View
   ========================================================================== */
function ProfessionalDashboardView({ authUser }: { authUser: any }) {
    const userName = authUser ? `Dr. ${authUser.firstName} ${authUser.lastName}` : "Doctor";
    const { data: dashboardData, isLoading, refetch, isRefetching } = useProfessionalDashboard();
    const { data: profile } = useProfessionalProfile();

    const isPending = profile?.verification_status === "pending";

    // Stats
    const stats = [
        {
            title: "Today's Visits",
            value: dashboardData?.today?.toString() || "0",
            description: "Scheduled for today",
            icon: Clock,
            color: "text-teal-600 bg-teal-50"
        },
        {
            title: "Pending Approval",
            value: dashboardData?.pending?.toString() || "0",
            description: "Awaiting your response",
            icon: AlertCircle,
            color: "text-amber-600 bg-amber-50"
        },
        {
            title: "Confirmed Bookings",
            value: dashboardData?.confirmed?.toString() || "0",
            description: "Upcoming consultations",
            icon: CheckSquare,
            color: "text-blue-600 bg-blue-50"
        },
        {
            title: "Completed Visits",
            value: dashboardData?.completed?.toString() || "0",
            description: "Total successfully completed",
            icon: CheckCircle2,
            color: "text-emerald-600 bg-emerald-50"
        }
    ];

    return (
        <div className="space-y-8 max-w-7xl mx-auto animate-fadeIn">
            {/* Verification Status Warning Alert */}
            {isPending && (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex flex-col sm:flex-row gap-4 items-start text-amber-900 shadow-sm">
                    <div className="p-2 bg-amber-100 rounded-xl text-amber-700">
                        <AlertCircle className="h-6 w-6 flex-shrink-0" />
                    </div>
                    <div className="space-y-1">
                        <h4 className="font-semibold text-sm sm:text-base">Profile Pending Verification</h4>
                        <p className="text-xs sm:text-sm text-amber-800">
                            Your professional credentials (license, qualification) are currently under review by our administration team. 
                            You will have full access to patient bookings and scheduling features once your account is verified.
                        </p>
                    </div>
                </div>
            )}

            {/* Welcome banner */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-teal-800 to-emerald-700 rounded-2xl p-6 md:p-8 text-white shadow-md">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <h2 className="text-3xl font-bold tracking-tight text-white m-0">
                            Welcome back, {userName}!
                        </h2>
                        <span className="bg-emerald-400/30 border border-emerald-300/40 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                            Professional
                        </span>
                    </div>
                    <p className="text-teal-100 max-w-md text-sm">
                        Access and manage your daily appointments, review pending patient bookings, and update clinical schedule.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button 
                        onClick={() => refetch()} 
                        variant="secondary" 
                        size="md" 
                        className="flex items-center gap-2 cursor-pointer"
                    >
                        <RefreshCw size={14} className={isRefetching || isLoading ? "animate-spin" : ""} />
                        <span>Refresh Dashboard</span>
                    </Button>
                </div>
            </div>

            {/* Stats section */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, i) => (
                    <Card key={i} className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium text-muted">
                                {stat.title}
                            </CardTitle>
                            <div className={`p-2 rounded-lg ${stat.color}`}>
                                <stat.icon size={18} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-foreground">
                                {stat.value}
                            </div>
                            <p className="text-xs text-muted mt-1">
                                {stat.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Appointments list */}
                <Card className="md:col-span-2 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Calendar size={18} className="text-teal-600" />
                                Today's Consultation Schedule
                            </CardTitle>
                            <CardDescription>
                                Your scheduled clinical home visits for today.
                            </CardDescription>
                        </div>
                        {isLoading && (
                            <span className="text-xs text-teal-600 font-semibold animate-pulse">Syncing...</span>
                        )}
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {dashboardData?.today_appointments && dashboardData.today_appointments.length > 0 ? (
                                dashboardData.today_appointments.map((appt) => (
                                    <div 
                                        key={appt.id} 
                                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-border rounded-xl bg-surface hover:bg-slate-50 transition-colors gap-3"
                                    >
                                        <div className="flex gap-3 items-center">
                                            <div className="w-10 h-10 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 font-bold">
                                                {appt.patient_name ? appt.patient_name[0] : "P"}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-foreground text-sm sm:text-base">
                                                    {appt.patient_name || `Patient ID: ${appt.patient_id.substring(0, 8)}...`}
                                                </h4>
                                                <p className="text-xs text-muted">Home Care Patient</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col sm:items-end text-sm">
                                            <span className="font-medium text-foreground flex items-center gap-1">
                                                <Clock size={12} />
                                                Time: {appt.appointment_time}
                                            </span>
                                        </div>
                                        <div className="sm:text-right">
                                            <Badge variant={appt.status === "confirmed" ? "success" : appt.status === "completed" ? "default" : "warning"}>
                                                {appt.status}
                                            </Badge>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12 text-muted text-sm border border-dashed rounded-xl p-8 bg-slate-50/50">
                                    <Calendar className="mx-auto h-8 w-8 text-slate-300 mb-2" />
                                    No consultations scheduled for today.
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick actions panel */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Activity size={18} className="text-teal-600" />
                            Provider Utilities
                        </CardTitle>
                        <CardDescription>
                            Quick medical actions.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Button 
                            onClick={() => alert("Redirecting to schedule availability page...")}
                            variant="outline" 
                            className="w-full justify-start gap-2 py-6 text-sm cursor-pointer"
                            disabled={isPending}
                        >
                            <Clock size={16} className="text-teal-600" />
                            Manage Availability
                        </Button>
                        <Button 
                            onClick={() => alert("Opening patients records list...")}
                            variant="outline" 
                            className="w-full justify-start gap-2 py-6 text-sm cursor-pointer"
                            disabled={isPending}
                        >
                            <Users size={16} className="text-teal-600" />
                            View Patient Records
                        </Button>
                        <Button 
                            onClick={() => alert("Opening earnings statement...")}
                            variant="outline" 
                            className="w-full justify-start gap-2 py-6 text-sm cursor-pointer"
                            disabled={isPending}
                        >
                            <FileText size={16} className="text-teal-600" />
                            Earnings Statement
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

/* ==========================================================================
   2. Patient Dashboard View (Default Dashboard layout)
   ========================================================================== */
function PatientDashboardView({ authUser }: { authUser: any }) {
    const userName = authUser ? `${authUser.firstName} ${authUser.lastName}` : "Patient User";
    const { data: apiAppointments, isLoading, refetch, isRefetching } = usePatientAppointments();

    const [appointmentsList, setAppointmentsList] = useState<AppointmentItem[]>([
        {
            id: 1,
            caregiver: "Dr. Sarah Jenkins",
            role: "Physiotherapist",
            date: "August 10, 2026",
            time: "10:00 AM - 11:30 AM",
            status: "Scheduled"
        },
        {
            id: 2,
            caregiver: "Nurse David Miller",
            role: "Registered Nurse",
            date: "August 12, 2026",
            time: "2:00 PM - 4:00 PM",
            status: "Scheduled"
        }
    ]);

    const [newBookingAlert, setNewBookingAlert] = useState<string | null>(null);

    // Merge backend real-time API appointments + local session bookings
    useEffect(() => {
        let mergedList = [...appointmentsList];

        if (apiAppointments && apiAppointments.length > 0) {
            mergedList = apiAppointments;
        }

        const storedAppt = localStorage.getItem("irfan_new_appointment");
        if (storedAppt) {
            try {
                const parsed = JSON.parse(storedAppt);
                if (!mergedList.some(item => item.id === parsed.id)) {
                    mergedList = [parsed, ...mergedList];
                }
                setNewBookingAlert(`Real-time Visit Booked: "${parsed.role}" is now submitted and pending approval.`);
            } catch (err) {
                console.error("Failed to parse stored appointment", err);
            }
        }

        setAppointmentsList(mergedList);
    }, [apiAppointments]);

    const upcomingVisitsCount = appointmentsList.filter(a => a.status !== "Cancelled").length;
    const uniqueCaregiversCount = new Set(appointmentsList.map(a => a.caregiver).filter(Boolean)).size || 1;
    const totalCareHours = `${upcomingVisitsCount * 8}h`;
    const nextVisitDate = appointmentsList[0]?.date || "None Scheduled";

    const stats = [
        {
            title: "Upcoming Visits",
            value: upcomingVisitsCount.toString(),
            description: `Next visit: ${nextVisitDate}`,
            icon: Calendar,
            color: "text-teal-600 bg-teal-50"
        },
        {
            title: "Care Hours",
            value: totalCareHours,
            description: "Delivered this month",
            icon: Clock,
            color: "text-blue-600 bg-blue-50"
        },
        {
            title: "Caregivers assigned",
            value: uniqueCaregiversCount.toString(),
            description: `Primary: ${appointmentsList[0]?.caregiver || "Dr. Sarah Jenkins"}`,
            icon: User,
            color: "text-purple-600 bg-purple-50"
        },
        {
            title: "New Messages",
            value: "1",
            description: `From ${appointmentsList[0]?.caregiver || "Dr. Sarah Jenkins"}`,
            icon: MessageSquare,
            color: "text-amber-600 bg-amber-50"
        }
    ];

    return (
        <div className="space-y-8 max-w-7xl mx-auto animate-fadeIn">
            {newBookingAlert && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between gap-4 text-emerald-900 shadow-xs">
                    <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                        <span className="text-xs md:text-sm font-semibold">{newBookingAlert}</span>
                    </div>
                    <button 
                        onClick={() => {
                            setNewBookingAlert(null);
                            localStorage.removeItem("irfan_new_appointment");
                        }}
                        className="text-xs text-emerald-700 font-bold hover:underline cursor-pointer"
                    >
                        Dismiss
                    </button>
                </div>
            )}

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-teal-700 to-emerald-600 rounded-2xl p-6 md:p-8 text-white shadow-md">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <h2 className="text-3xl font-bold tracking-tight text-white m-0">
                            Welcome back, {userName}!
                        </h2>
                        <span className="bg-emerald-400/30 border border-emerald-300/40 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                            Real-Time Live
                        </span>
                    </div>
                    <p className="text-teal-100 max-w-md">
                        Your personalized home care plan is active. Real-time caregiver dispatch enabled.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button 
                        onClick={() => refetch()} 
                        variant="secondary" 
                        size="md" 
                        className="flex items-center gap-2 cursor-pointer"
                    >
                        <RefreshCw size={14} className={isRefetching || isLoading ? "animate-spin" : ""} />
                        <span>Refresh Data</span>
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, i) => (
                    <Card key={i} className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium text-muted">
                                {stat.title}
                            </CardTitle>
                            <div className={`p-2 rounded-lg ${stat.color}`}>
                                <stat.icon size={18} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-foreground">
                                {stat.value}
                            </div>
                            <p className="text-xs text-muted mt-1">
                                {stat.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-2 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Calendar size={18} className="text-teal-600" />
                                Live Upcoming Visits Agenda
                            </CardTitle>
                            <CardDescription>
                                Real-time home visits, nursing care, and doctor dispatch schedules.
                            </CardDescription>
                        </div>
                        {isLoading && (
                            <span className="text-xs text-teal-600 font-semibold animate-pulse">Syncing...</span>
                        )}
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {appointmentsList.length > 0 ? (
                                appointmentsList.map((appt) => (
                                    <div 
                                        key={appt.id} 
                                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-border rounded-xl bg-surface hover:bg-slate-50 transition-colors gap-3"
                                    >
                                        <div className="flex gap-3 items-center">
                                            <div className="w-10 h-10 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 font-bold">
                                                {appt.caregiver ? appt.caregiver[0] : "D"}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-foreground text-sm sm:text-base">
                                                    {appt.caregiver}
                                                </h4>
                                                <p className="text-xs text-muted">{appt.role}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col sm:items-end text-sm">
                                            <span className="font-medium text-foreground flex items-center gap-1">
                                                <Calendar size={12} />
                                                {appt.date}
                                            </span>
                                            <span className="text-xs text-muted flex items-center gap-1 mt-0.5">
                                                <Clock size={12} />
                                                {appt.time}
                                            </span>
                                        </div>
                                        <div className="sm:text-right">
                                            <Badge variant={appt.status === "Scheduled" ? "success" : "warning"}>
                                                {appt.status}
                                            </Badge>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-muted text-sm">
                                    No upcoming home visits scheduled. Use "Request New Visit" to book one.
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Activity size={18} className="text-teal-600" />
                            Quick Actions
                        </CardTitle>
                        <CardDescription>
                            Direct health utilities.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Button 
                            onClick={() => window.location.href = "/"}
                            variant="outline" 
                            className="w-full justify-start gap-2 py-6 text-sm cursor-pointer"
                        >
                            <PlusCircle size={16} className="text-teal-600" />
                            Request New Home Visit
                        </Button>
                        <Button 
                            onClick={() => alert("Connecting to Care Coordinator...")}
                            variant="outline" 
                            className="w-full justify-start gap-2 py-6 text-sm cursor-pointer"
                        >
                            <MessageSquare size={16} className="text-teal-600" />
                            Contact Coordinator
                        </Button>
                        <Button 
                            onClick={() => alert("Opening Care Plan Report...")}
                            variant="outline" 
                            className="w-full justify-start gap-2 py-6 text-sm cursor-pointer"
                        >
                            <FileText size={16} className="text-teal-600" />
                            View Care Plan Report
                        </Button>
                        <Button 
                            onClick={() => alert("Opening Account Settings...")}
                            variant="outline" 
                            className="w-full justify-start gap-2 py-6 text-sm cursor-pointer"
                        >
                            <Settings size={16} className="text-teal-600" />
                            Account Settings
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

/* ==========================================================================
   3. Admin Portal Dashboard View
   ========================================================================== */
function AdminDashboardView({ authUser }: { authUser: any }) {
    const userName = `${authUser.firstName} ${authUser.lastName}`;
    return (
        <div className="space-y-8 max-w-7xl mx-auto animate-fadeIn">
            {/* Welcome banner */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl p-6 md:p-8 text-white shadow-md">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <h2 className="text-3xl font-bold tracking-tight text-white m-0">
                            Welcome back, {userName}!
                        </h2>
                        <span className="bg-slate-500/30 border border-slate-400/40 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                            Administrator
                        </span>
                    </div>
                    <p className="text-slate-200 max-w-md text-sm">
                        You have full access to system-wide settings, user organizations, scheduling controls, and clinical analytics.
                    </p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Shield size={18} className="text-slate-600" />
                            Admin Portals
                        </CardTitle>
                        <CardDescription>
                            Direct system navigation controls.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex gap-2">
                            <Button 
                                onClick={() => alert("Navigating to organizations list...")}
                                variant="outline" 
                                className="w-full justify-start gap-2 py-6 text-sm cursor-pointer"
                            >
                                <Users size={16} className="text-slate-600" />
                                Manage Organizations
                            </Button>
                        </div>
                        <div className="flex gap-2">
                            <Button 
                                onClick={() => alert("Navigating to users list...")}
                                variant="outline" 
                                className="w-full justify-start gap-2 py-6 text-sm cursor-pointer"
                            >
                                <User size={16} className="text-slate-600" />
                                Manage Registered Users
                            </Button>
                        </div>
                        <div className="flex gap-2">
                            <Button 
                                onClick={() => alert("Navigating to provider verification list...")}
                                variant="outline" 
                                className="w-full justify-start gap-2 py-6 text-sm cursor-pointer"
                            >
                                <CheckCircle2 size={16} className="text-slate-600" />
                                Verify Professionals
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Activity size={18} className="text-slate-600" />
                            System Summary
                        </CardTitle>
                        <CardDescription>
                            Access real-time reports and analytics.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p className="text-sm text-muted">
                            To view the full details of clinical reports, system health, and payments activity, navigate to the analytics dashboard.
                        </p>
                        <Button 
                            onClick={() => alert("Opening Analytics Dashboard...")}
                            className="bg-slate-700 hover:bg-slate-800 text-white cursor-pointer"
                        >
                            View Analytics Dashboard
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
