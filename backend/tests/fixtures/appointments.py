import pytest
from datetime import date, time
from app.models.user import User
from app.models.patient import Patient
from app.models.appointment import Appointment
from app.extensions import db
from tests.fixtures.users import test_user
from tests.fixtures.professionals import test_professional

@pytest.fixture
def test_patient(app, test_user):
    patient = Patient(
        user_id=test_user.id,
        phone_number="+254712345678",
        gender="Male",
        address="123 Road, Nairobi",
    )
    db.session.add(patient)
    db.session.commit()
    yield patient
    db.session.delete(patient)
    db.session.commit()

@pytest.fixture
def test_appointment(app, test_patient, test_professional):
    appointment = Appointment(
        patient_id=test_patient.id,
        professional_id=test_professional.id,
        appointment_date=date.today(),
        appointment_time=time(10, 0),
        location="Nairobi",
        reason="Routine elderly health checkup",
        status="pending",
    )
    db.session.add(appointment)
    db.session.commit()
    yield appointment
    db.session.delete(appointment)
    db.session.commit()
