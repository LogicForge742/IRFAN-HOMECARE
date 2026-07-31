from datetime import date

from app.extensions import db
from app.models.appointment import Appointment


class AppointmentRepository:

    @staticmethod
    def create(appointment):
        db.session.add(appointment)
        db.session.commit()
        return appointment

    @staticmethod
    def get_by_id(appointment_id):
        return Appointment.query.get(appointment_id)

    @staticmethod
    def get_by_patient(patient_id):
        return Appointment.query.filter_by(
            patient_id=patient_id
        ).all()

    @staticmethod
    def get_by_professional(professional_id):
        return Appointment.query.filter_by(
            professional_id=professional_id
        ).all()

    @staticmethod
    def get_by_professional_and_schedule(
        professional_id,
        appointment_date,
        appointment_time,
    ):
        return Appointment.query.filter_by(
            professional_id=professional_id,
            appointment_date=appointment_date,
            appointment_time=appointment_time,
        ).first()

    @staticmethod
    def get_by_professional_and_date(
        professional_id,
        appointment_date,
    ):
        return (
            Appointment.query.filter_by(
                professional_id=professional_id,
                appointment_date=appointment_date,
            ).all()
        )

    @staticmethod
    def get_by_professional_and_status(
        professional_id,
        status,
    ):
        return (
            Appointment.query.filter_by(
                professional_id=professional_id,
                status=status,
            ).all()
        )

    @staticmethod
    def get_today_appointments(
        professional_id,
    ):
        return (
            Appointment.query.filter_by(
                professional_id=professional_id,
                appointment_date=date.today(),
            )
            .order_by(Appointment.appointment_time)
            .all()
        )

    @staticmethod
    def update():
        db.session.commit()

    @staticmethod
    def delete(appointment):
        db.session.delete(appointment)
        db.session.commit()