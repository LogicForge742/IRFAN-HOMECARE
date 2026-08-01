import pytest
from decimal import Decimal
from app.models.payment import Payment
from app.extensions import db
from tests.fixtures.appointments import test_appointment, test_patient
from tests.fixtures.users import test_user
from tests.fixtures.professionals import test_professional

@pytest.fixture
def test_payment(app, test_user, test_appointment):
    payment = Payment(
        appointment_id=test_appointment.id,
        user_id=test_user.id,
        amount=Decimal("1500.00"),
        currency="KES",
        provider="MPESA",
        status="pending",
        reference="MPESA-REF-12345",
    )
    db.session.add(payment)
    db.session.commit()
    yield payment
    db.session.delete(payment)
    db.session.commit()
