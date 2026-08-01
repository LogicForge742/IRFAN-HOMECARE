import React from "react";
import { useFormik } from "formik";
import { X, Calendar, CreditCard, ShieldCheck } from "lucide-react";
import { appointmentSchema } from "../schemas/appointment-schema";
import { AvailabilityCalendar } from "./AvailabilityCalendar";
import type { HealthcareProfessional } from "@/types/appointment";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  professionals: HealthcareProfessional[];
  onSubmitBooking: (values: any) => Promise<void>;
  isBooking: boolean;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  professionals,
  onSubmitBooking,
  isBooking,
}) => {
  const formik = useFormik({
    initialValues: {
      professional_id: professionals[0]?.id || 1,
      availability_id: 101,
      reason: "General Nursing Checkup",
      date: new Date().toISOString().split("T")[0],
      timeSlot: "09:00 AM",
      phoneNumber: "0712345678",
    },
    validationSchema: appointmentSchema,
    onSubmit: async (values) => {
      await onSubmitBooking({
        professional_id: Number(values.professional_id),
        availability_id: Number(values.availability_id),
        reason: values.reason,
        phoneNumber: values.phoneNumber,
      });
      onClose();
    },
  });

  if (!isOpen) return null;

  const selectedProf = professionals.find(
    (p) => p.id === Number(formik.values.professional_id)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl z-10 space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2 text-emerald-400">
            <Calendar className="w-5 h-5" />
            <h3 className="text-lg font-bold text-white">Book Healthcare Visit</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4 text-left">
          {/* Healthcare Professional Select */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Healthcare Provider
            </label>
            <select
              name="professional_id"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.professional_id}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              {professionals.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.specialization}) — {(p.hourlyRate ?? 3500).toLocaleString()} KES/hr
                </option>
              ))}
            </select>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Reason / Consultation Details
            </label>
            <input
              type="text"
              name="reason"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.reason}
              placeholder="e.g. Routine Elderly Care Checkup"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
            {formik.touched.reason && formik.errors.reason && (
              <p className="text-xs text-rose-500 mt-1">{formik.errors.reason}</p>
            )}
          </div>

          {/* Visit Date */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Visit Date
            </label>
            <input
              type="date"
              name="date"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.date}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Availability Slots */}
          <AvailabilityCalendar
            professionalId={formik.values.professional_id}
            selectedDate={formik.values.date}
            selectedTimeSlot={formik.values.timeSlot}
            onSelectSlot={(slotTime, slotId) => {
              formik.setFieldValue("timeSlot", slotTime);
              if (slotId) formik.setFieldValue("availability_id", slotId);
            }}
          />

          {/* M-Pesa Phone */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              M-Pesa Phone Number
            </label>
            <div className="relative">
              <input
                type="text"
                name="phoneNumber"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber}
                placeholder="0712345678"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <CreditCard className="w-4 h-4 text-emerald-400 absolute right-3 top-3" />
            </div>
          </div>

          {/* Total & Action */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400">Total Consultation Fee</p>
              <p className="text-lg font-bold text-emerald-400">
                {(selectedProf?.hourlyRate ?? 3500).toLocaleString()} KES
              </p>
            </div>
            <button
              type="submit"
              disabled={isBooking}
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-xl transition shadow-lg shadow-emerald-950/40 disabled:opacity-50"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isBooking ? "Confirming..." : "Confirm & Pay"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
