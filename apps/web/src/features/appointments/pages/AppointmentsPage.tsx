import React, { useState } from "react";
import { useAppointments } from "../hooks/useAppointments";
import { AppointmentCard } from "../components/AppointmentCard";
import { BookingModal } from "../components/BookingModal";
import { Calendar, PlusCircle, Search } from "lucide-react";

export const AppointmentsPage: React.FC = () => {
  const {
    appointments,
    isLoadingAppointments,
    professionals,
    createAppointment,
    isBooking,
  } = useAppointments();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAppointments = appointments.filter(
    (apt) =>
      apt.serviceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.professionalName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
            <Calendar className="w-6 h-6 text-emerald-400" />
            <span>Healthcare Appointments</span>
          </h1>
          <p className="text-sm text-slate-400">
            Manage your booked consultations, visit schedules, and payments
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl transition shadow-lg shadow-emerald-950/40"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Book Appointment</span>
        </button>
      </div>

      {/* Search & Filter */}
      <div className="relative max-w-md">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by provider or service..."
          className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
        />
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
      </div>

      {/* Appointment Cards Grid */}
      {isLoadingAppointments ? (
        <div className="p-8 text-center text-sm text-slate-400">
          Loading appointments...
        </div>
      ) : filteredAppointments.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <Calendar className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Appointments Found</h3>
          <p className="text-sm text-slate-400">
            You don't have any appointments scheduled matching your search.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAppointments.map((apt) => (
            <AppointmentCard key={apt.id} appointment={apt} />
          ))}
        </div>
      )}

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        professionals={professionals}
        onSubmitBooking={async (values) => {
          await createAppointment(values);
        }}
        isBooking={isBooking}
      />
    </div>
  );
};
