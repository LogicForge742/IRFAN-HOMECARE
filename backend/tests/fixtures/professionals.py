import pytest
from app.models.user import User
from app.models.healthcare_professional import HealthcareProfessional
from app.extensions import db, bcrypt

@pytest.fixture
def test_professional(app):
    user = User(
        email="professional@test.com",
        first_name="Dr. John",
        last_name="Smith",
        role="professional",
        password_hash=bcrypt.generate_password_hash("Password123!").decode("utf-8"),
    )
    db.session.add(user)
    db.session.commit()
    
    prof = HealthcareProfessional(
        user_id=user.id,
        specialization="General Nursing",
        license_number="HP-9921",
        experience_years=8,
        bio="Experienced homecare nurse.",
        hourly_rate=1500.0,
        availability_status="available",
    )
    db.session.add(prof)
    db.session.commit()
    
    yield prof
    
    db.session.delete(prof)
    db.session.delete(user)
    db.session.commit()
