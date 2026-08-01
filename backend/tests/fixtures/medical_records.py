import pytest
from app.models.medical_record import MedicalRecord
from app.extensions import db
from tests.fixtures.appointments import test_appointment, test_patient
from tests.fixtures.users import test_user
from tests.fixtures.professionals import test_professional

@pytest.fixture
def test_medical_record(app, test_appointment, test_patient, test_professional):
    record = MedicalRecord(
        appointment_id=test_appointment.id,
        patient_id=test_patient.id,
        professional_id=test_professional.id,
        diagnosis="Hypertension",
        treatment="Prescribed Amlodipine 5mg once daily",
        prescription="Amlodipine 5mg - 30 Tabs",
        notes="Patient should monitor blood pressure twice daily.",
    )
    db.session.add(record)
    db.session.commit()
    yield record
    db.session.delete(record)
    db.session.commit()
