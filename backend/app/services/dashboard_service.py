from app.repositories.professional_repository import (
    ProfessionalRepository,
)
from app.repositories.appointment_repository import (
    AppointmentRepository,
)


class DashboardService:

    @staticmethod
    def get_professional_dashboard(user_id):

        professional = (
            ProfessionalRepository.get_by_user_id(
                user_id
            )
        )

        if not professional:
            raise ValueError(
                "Healthcare professional profile not found."
            )

        today = (
            AppointmentRepository.get_today_appointments(
                professional.id
            )
        )

        pending = (
            AppointmentRepository.get_by_professional_and_status(
                professional.id,
                "pending",
            )
        )

        confirmed = (
            AppointmentRepository.get_by_professional_and_status(
                professional.id,
                "confirmed",
            )
        )

        completed = (
            AppointmentRepository.get_by_professional_and_status(
                professional.id,
                "completed",
            )
        )

        return {
            "today": len(today),
            "pending": len(pending),
            "confirmed": len(confirmed),
            "completed": len(completed),
            "today_appointments": [
                {
                    "id": appointment.id,
                    "patient_id": appointment.patient_id,
                    "appointment_time": appointment.appointment_time.strftime("%H:%M"),
                    "status": appointment.status,
                }
                for appointment in today
            ],
        }
