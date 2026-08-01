from datetime import date, time
from app.models.appointment import Appointment
from app.extensions import db

class AppointmentFactory:
    @staticmethod
    def create(patient_id, professional_id, appointment_date=None, appointment_time=None, location="Nairobi", reason="General Checkup", status="pending"):
        if appointment_date is None:
            appointment_date = date.today()
        if appointment_time is None:
            appointment_time = time(10, 0)
            
        appointment = Appointment(
            patient_id=patient_id,
            professional_id=professional_id,
            appointment_date=appointment_date,
            appointment_time=appointment_time,
            location=location,
            reason=reason,
            status=status,
        )
        db.session.add(appointment)
        db.session.commit()
        return appointment
