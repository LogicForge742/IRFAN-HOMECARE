
import { useAppointments } from "../hooks/useAppointments";
import AppointmentCard from "../components/AppointmentCard";
import { Calendar, PlusCircle } from "lucide-react";
import CardSkeleton from "@/components/skeletons/CardSkeleton";
import { Link } from "react-router-dom";

export default function AppointmentsPage() {
  const { data, isLoading } = useAppointments();

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
            <Calendar className="w-6 h-6 text-emerald-400" />
            <span>My Appointments</span>
          </h1>
          <p className="text-sm text-slate-400">
            View and manage your scheduled healthcare visits
          </p>
        </div>
        <Link
          to="/appointments/book"
          className="inline-flex items-center space-x-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl transition shadow-lg shadow-emerald-950/40"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Book Appointment</span>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {data?.map((item) => (
          <AppointmentCard key={item.id} appointment={item} />
        ))}
      </div>
    </div>
  );
}
