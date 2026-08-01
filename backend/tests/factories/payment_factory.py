from decimal import Decimal
from app.models.payment import Payment
from app.extensions import db

class PaymentFactory:
    @staticmethod
    def create(appointment_id, user_id, amount=1500.0, currency="KES", provider="MPESA", status="pending", reference="MPESA-REF-DEFAULT"):
        payment = Payment(
            appointment_id=appointment_id,
            user_id=user_id,
            amount=Decimal(str(amount)),
            currency=currency,
            provider=provider,
            status=status,
            reference=reference,
        )
        db.session.add(payment)
        db.session.commit()
        return payment
