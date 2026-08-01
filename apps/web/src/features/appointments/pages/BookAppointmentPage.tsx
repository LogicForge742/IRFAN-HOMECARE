import React, { useState } from "react";
import { useAppointments } from "../hooks/useAppointments";
import { BookingModal } from "../components/BookingModal";
import { UserCheck, Star, MapPin, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Professional } from "@/types/appointment";

export const BookAppointmentPage: React.FC = () => {
  const navigate = useNavigate();
  const { professionals, createAppointment, isBooking } = useAppointments();
  const [selectedProfId, setSelectedProfId] = useState<number | null>(null);

  const selectedProfList: Professional[] = selectedProfId
    ? professionals.filter((p: Professional) => p.id === selectedProfId)
    : professionals;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-2">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Select Healthcare Professional
        </h1>
        <p className="text-sm text-slate-400">
          Browse verified doctors, nurses, and physiotherapists available for home visits
        </p>
      </div>

      {/* Professionals List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {professionals.map((prof: Professional) => (
          <div
            key={prof.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 hover:border-emerald-500/50 transition flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold text-lg">
                  {prof.name.charAt(0)}
                </div>
                <div className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold border border-amber-500/20">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{prof.rating ?? 4.9}</span>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-white text-lg">{prof.name}</h3>
                <p className="text-xs text-emerald-400 font-medium">
                  {prof.specialization}
                </p>
              </div>

              <div className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-slate-800">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{prof.location ?? "Nairobi Region"}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <UserCheck className="w-3.5 h-3.5 text-slate-500" />
                  <span>{(prof.availableDays ?? ["Mon", "Wed", "Fri"]).join(", ")}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                  Hourly Rate
                </span>
                <p className="text-base font-bold text-white">
                  {(prof.hourlyRate ?? 3500).toLocaleString()} KES
                </p>
              </div>

              <button
                onClick={() => setSelectedProfId(prof.id)}
                className="inline-flex items-center space-x-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition shadow-lg shadow-emerald-950/40"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Visit</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedProfId !== null && (
        <BookingModal
          isOpen={selectedProfId !== null}
          onClose={() => setSelectedProfId(null)}
          professionals={selectedProfList}
          onSubmitBooking={async (values) => {
            await createAppointment(values);
            navigate("/appointments");
          }}
          isBooking={isBooking}
        />
      )}
    </div>
  );
};
