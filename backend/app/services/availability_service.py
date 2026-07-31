from app.models.availability import Availability
from app.repositories.availability_repository import (
    AvailabilityRepository,
)
from app.repositories.professional_repository import (
    ProfessionalRepository,
)


class AvailabilityService:

    @staticmethod
    def create_availability(user_id, data):

        professional = ProfessionalRepository.get_by_user_id(
            user_id
        )

        if not professional:
            raise ValueError(
                "Healthcare professional profile not found."
            )

        if data["start_time"] >= data["end_time"]:
            raise ValueError(
                "Start time must be before end time."
            )

        existing = (
            AvailabilityRepository.get_by_professional_and_day(
                professional.id,
                data["day_of_week"],
            )
        )

        for slot in existing:

            overlaps = (
                data["start_time"] < slot.end_time
                and data["end_time"] > slot.start_time
            )

            if overlaps:
                raise ValueError(
                    "Availability overlaps with an existing schedule."
                )

        availability = Availability(
            professional_id=professional.id,
            day_of_week=data["day_of_week"],
            start_time=data["start_time"],
            end_time=data["end_time"],
            is_available=data.get("is_available", True),
        )

        AvailabilityRepository.create(
            availability
        )

        return {
            "id": availability.id,
            "professional_id": availability.professional_id,
            "day_of_week": availability.day_of_week,
            "start_time": availability.start_time.isoformat(),
            "end_time": availability.end_time.isoformat(),
            "is_available": availability.is_available,
        }

    @staticmethod
    def get_my_availability(user_id):

        professional = ProfessionalRepository.get_by_user_id(
            user_id
        )

        if not professional:
            raise ValueError(
                "Healthcare professional profile not found."
            )

        schedules = (
            AvailabilityRepository.get_by_professional(
                professional.id
            )
        )

        return [
            {
                "id": item.id,
                "day_of_week": item.day_of_week,
                "start_time": item.start_time.isoformat(),
                "end_time": item.end_time.isoformat(),
                "is_available": item.is_available,
            }
            for item in schedules
        ]