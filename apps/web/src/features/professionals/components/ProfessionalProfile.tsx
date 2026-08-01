import React, { useState } from "react";
import type { ProfessionalProfile as ProfileType } from "@/types/professional";
import { RatingBadge } from "./RatingBadge";
import { AvailabilityCalendar } from "@/features/appointments/components/AvailabilityCalendar";
import { BookingModal } from "@/features/appointments/components/BookingModal";
import { useAppointments } from "@/features/appointments/hooks/useAppointments";
import { MapPin, Calendar, Clock, Award, ShieldCheck, Mail, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  professional: ProfileType;
}

export const ProfessionalProfile: React.FC<Props> = ({ professional }) => {
  const navigate = useNavigate();
  const { createAppointment, isBooking } = useAppointments();
  const [selectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("09:00 AM");
  const [selectedSlotId, setSelectedSlotId] = useState<number>(101);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold text-2xl">
              {professional.name.charAt(0)}
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold text-white">
                  {professional.name}
                </h1>
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <p className="text-sm font-semibold text-emerald-400">
                {professional.specialization}
              </p>
              <div className="flex items-center space-x-3 text-xs text-slate-400">
                <span className="flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{professional.location}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Award className="w-3.5 h-3.5 text-slate-500" />
                  <span>{professional.yearsOfExperience} Yrs Experience</span>
                </span>
              </div>
            </div>
          </div>

          <RatingBadge
            rating={professional.rating}
            reviewCount={professional.reviewCount}
          />
        </div>

        {/* Bio */}
        <div className="space-y-2 pt-4 border-t border-slate-800">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            About Professional
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            {professional.bio}
          </p>
        </div>

        {/* Contact Info & Rates */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
          <div className="flex items-center space-x-2 text-slate-300">
            <Mail className="w-4 h-4 text-slate-500" />
            <span>{professional.email}</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-300">
            <Phone className="w-4 h-4 text-slate-500" />
            <span>{professional.phoneNumber || "Verified Phone"}</span>
          </div>
          <div className="flex items-center space-x-2 text-emerald-400 font-bold">
            <Clock className="w-4 h-4" />
            <span>{professional.hourlyRate.toLocaleString()} KES / Hour</span>
          </div>
        </div>
      </div>

      {/* Availability Selector & Booking */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-emerald-400" />
          <span>Select Availability & Book</span>
        </h3>

        <AvailabilityCalendar
          professionalId={professional.id}
          selectedDate={selectedDate}
          selectedTimeSlot={selectedTimeSlot}
          onSelectSlot={(slotTime, slotId) => {
            setSelectedTimeSlot(slotTime);
            if (slotId) setSelectedSlotId(slotId);
          }}
        />

        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">Selected Slot</p>
            <p className="text-sm font-bold text-white">
              {selectedDate} at {selectedTimeSlot}
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl transition shadow-lg shadow-emerald-950/40"
          >
            Proceed to Book & Pay
          </button>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        professionals={[professional]}
        onSubmitBooking={async (values) => {
          await createAppointment({
            professional_id: professional.id,
            availability_id: selectedSlotId,
            reason: values.reason || professional.specialization,
            phoneNumber: values.phoneNumber,
          });
          navigate("/appointments");
        }}
        isBooking={isBooking}
      />
    </div>
  );
};
