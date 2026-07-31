from app.models.appointment import Appointment
from app.repositories.appointment_repository import AppointmentRepository
from app.repositories.patient_repository import PatientRepository
from app.repositories.professional_repository import ProfessionalRepository


class AppointmentService:

    @staticmethod
    def create_appointment(user_id, data):

        patient = PatientRepository.get_by_user_id(user_id)

        if not patient:
            raise ValueError("Patient profile not found.")

        professional = ProfessionalRepository.get_by_id(
            data["professional_id"]
        )

        if not professional:
            raise ValueError("Healthcare professional not found.")

        existing_appointment = (
            AppointmentRepository.get_by_professional_and_schedule(
                professional.id,
                data["appointment_date"],
                data["appointment_time"],
            )
        )

        if existing_appointment:
            raise ValueError(
                "This healthcare professional is already booked for the selected date and time."
            )

        appointment = Appointment(
            patient_id=patient.id,
            professional_id=professional.id,
            appointment_date=data["appointment_date"],
            appointment_time=data["appointment_time"],
            location=data["location"],
            reason=data["reason"],
        )

        AppointmentRepository.create(appointment)

        return {
            "id": appointment.id,
            "patient_id": appointment.patient_id,
            "professional_id": appointment.professional_id,
            "appointment_date": appointment.appointment_date.isoformat(),
            "appointment_time": appointment.appointment_time.isoformat(),
            "location": appointment.location,
            "reason": appointment.reason,
            "status": appointment.status,
        }