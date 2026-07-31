from datetime import datetime, timedelta

from app.repositories.availability_repository import (
    AvailabilityRepository,
)
from app.repositories.appointment_repository import (
    AppointmentRepository,
)
from app.repositories.professional_repository import (
    ProfessionalRepository,
)


class SchedulingService:

    SLOT_DURATION = 30

    @staticmethod
    def get_available_slots(
        professional_id,
        appointment_date,
    ):

        weekday = appointment_date.weekday()

        availability = (
            AvailabilityRepository.get_by_professional_and_day(
                professional_id,
                weekday,
            )
        )

        booked = (
            AppointmentRepository.get_by_professional_and_date(
                professional_id,
                appointment_date,
            )
        )

        booked_times = {
            appointment.appointment_time
            for appointment in booked
        }

        available_slots = []

        for window in availability:

            current = datetime.combine(
                appointment_date,
                window.start_time,
            )

            end = datetime.combine(
                appointment_date,
                window.end_time,
            )

            while current < end:

                slot = current.time()

                if slot not in booked_times:
                    available_slots.append(
                        slot.strftime("%H:%M")
                    )

                current += timedelta(
                    minutes=SchedulingService.SLOT_DURATION
                )

        return available_slots