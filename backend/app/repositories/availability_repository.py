from app.extensions import db
from app.models.availability import Availability


class AvailabilityRepository:

    @staticmethod
    def create(availability):
        db.session.add(availability)
        db.session.commit()
        return availability

    @staticmethod
    def update():
        db.session.commit()

    @staticmethod
    def delete(availability):
        db.session.delete(availability)
        db.session.commit()

    @staticmethod
    def get_by_id(availability_id):
        return Availability.query.get(availability_id)

    @staticmethod
    def get_by_professional(professional_id):
        return (
            Availability.query.filter_by(professional_id=professional_id)
            .order_by(
                Availability.day_of_week,
                Availability.start_time,
            )
            .all()
        )

    @staticmethod
    def get_by_professional_and_day(
        professional_id,
        day_of_week,
    ):
        return (
            Availability.query.filter_by(
                professional_id=professional_id,
                day_of_week=day_of_week,
            )
            .order_by(Availability.start_time)
            .all()
        )
