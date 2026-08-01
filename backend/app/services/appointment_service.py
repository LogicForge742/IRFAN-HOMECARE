from app.models.appointment import Appointment
from app.repositories.appointment_repository import AppointmentRepository
from app.repositories.patient_repository import PatientRepository
from app.repositories.professional_repository import ProfessionalRepository
from app.services.notification_service import NotificationService


class AppointmentService:

    @staticmethod
    def create_appointment(user_id, data):

        patient = PatientRepository.get_by_user_id(user_id)

        if not patient:
            raise ValueError("Patient profile not found.")

        professional = ProfessionalRepository.get_by_id(data["professional_id"])

        if not professional:
            raise ValueError("Healthcare professional not found.")

        existing_appointment = AppointmentRepository.get_by_professional_and_schedule(
            professional.id,
            data["appointment_date"],
            data["appointment_time"],
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

        NotificationService.create_notification(
            user_id=patient.user_id,
            title="Appointment Request Submitted",
            message=(
                "Your appointment request has been submitted "
                "and is awaiting confirmation."
            ),
            notification_type="appointment",
        )

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

    @staticmethod
    def get_patient_appointments(user_id):
        patient = PatientRepository.get_by_user_id(user_id)
        if not patient:
            raise ValueError("Patient profile not found.")

        appointments = AppointmentRepository.get_by_patient(patient.id)
        return [
            {
                "id": appt.id,
                "patient_id": appt.patient_id,
                "professional_id": appt.professional_id,
                "appointment_date": appt.appointment_date.isoformat(),
                "appointment_time": appt.appointment_time.isoformat(),
                "location": appt.location,
                "reason": appt.reason,
                "status": appt.status,
            }
            for appt in appointments
        ]

    @staticmethod
    def update_status(appointment_id, status):
        appointment = AppointmentRepository.get_by_id(appointment_id)
        if not appointment:
            raise ValueError("Appointment not found.")

        appointment.status = status
        AppointmentRepository.update()

        title_map = {
            "confirmed": "Appointment Confirmed",
            "cancelled": "Appointment Cancelled",
            "completed": "Appointment Completed",
        }
        title = title_map.get(status.lower(), "Appointment Updated")

        patient = PatientRepository.get_by_id(appointment.patient_id)
        if patient:
            NotificationService.create_notification(
                user_id=patient.user_id,
                title=title,
                message=f"Your appointment status is now '{status}'.",
                notification_type="appointment",
            )

        return {
            "id": appointment.id,
            "status": appointment.status,
        }
