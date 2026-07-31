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
    Settings
} from "lucide-react";

export default function DashboardPage() {
    // Mock user details
    const user = {
        name: "Milton",
        role: "Patient"
    };

    const stats = [
        {
            title: "Upcoming Visits",
            value: "3",
            description: "Next visit: Tomorrow at 10:00 AM",
            icon: Calendar,
            color: "text-teal-600 bg-teal-50"
        },
        {
            title: "Care Hours",
            value: "24h",
            description: "Delivered this month",
            icon: Clock,
            color: "text-blue-600 bg-blue-50"
        },
        {
            title: "Caregivers assigned",
            value: "2",
            description: "Primary: Dr. Sarah Jenkins",
            icon: User,
            color: "text-purple-600 bg-purple-50"
        },
        {
            title: "New Messages",
            value: "1",
            description: "From Dr. Sarah Jenkins",
            icon: MessageSquare,
            color: "text-amber-600 bg-amber-50"
        }
    ];

    const appointments = [
        {
            id: 1,
            caregiver: "Dr. Sarah Jenkins",
            role: "Physiotherapist",
            date: "July 29, 2026",
            time: "10:00 AM - 11:30 AM",
            status: "Scheduled"
        },
        {
            id: 2,
            caregiver: "Nurse David Miller",
            role: "Registered Nurse",
            date: "August 1, 2026",
            time: "2:00 PM - 4:00 PM",
            status: "Scheduled"
        },
        {
            id: 3,
            caregiver: "Dr. Sarah Jenkins",
            role: "Physiotherapist",
            date: "August 5, 2026",
            time: "10:00 AM - 11:30 AM",
            status: "Pending Approval"
        }
    ];

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Welcome banner */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-teal-700 to-emerald-600 rounded-2xl p-6 md:p-8 text-white shadow-md">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight text-white m-0">
                        Welcome back, {user.name}!
                    </h2>
                    <p className="text-teal-100 max-w-md">
                        Your personalized home care plan is running smoothly. Check your schedule below.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="secondary" size="md" className="flex items-center gap-2">
                        <PlusCircle size={16} />
                        Request Care
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
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Calendar size={18} className="text-teal-600" />
                            Upcoming Visits Agenda
                        </CardTitle>
                        <CardDescription>
                            Your upcoming home visits and nursing schedules.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {appointments.map((appt) => (
                                <div 
                                    key={appt.id} 
                                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-border rounded-xl bg-surface hover:bg-slate-50 transition-colors gap-3"
                                >
                                    <div className="flex gap-3 items-center">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-teal-600 font-semibold">
                                            {appt.caregiver[4]}
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
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick actions panel */}
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
                        <Button variant="outline" className="w-full justify-start gap-2 py-6 text-sm">
                            <PlusCircle size={16} className="text-teal-600" />
                            Request New Visit
                        </Button>
                        <Button variant="outline" className="w-full justify-start gap-2 py-6 text-sm">
                            <MessageSquare size={16} className="text-teal-600" />
                            Contact Coordinator
                        </Button>
                        <Button variant="outline" className="w-full justify-start gap-2 py-6 text-sm">
                            <FileText size={16} className="text-teal-600" />
                            View Care Plan Report
                        </Button>
                        <Button variant="outline" className="w-full justify-start gap-2 py-6 text-sm">
                            <Settings size={16} className="text-teal-600" />
                            Account Settings
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
