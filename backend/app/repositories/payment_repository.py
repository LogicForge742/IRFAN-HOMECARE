from app.extensions import db
from app.models.payment import Payment


class PaymentRepository:

    @staticmethod
    def create(payment):
        db.session.add(payment)
        db.session.commit()
        return payment

    @staticmethod
    def get_by_id(payment_id):
        return Payment.query.get(payment_id)

    @staticmethod
    def get_by_reference(reference):
        return Payment.query.filter_by(reference=reference).first()

    @staticmethod
    def get_by_provider_reference(provider_reference):
        return Payment.query.filter_by(provider_reference=provider_reference).first()

    @staticmethod
    def get_by_appointment(appointment_id):
        return Payment.query.filter_by(appointment_id=appointment_id).all()

    @staticmethod
    def get_by_checkout_request_id(
        checkout_request_id,
    ):
        return Payment.query.filter_by(checkout_request_id=checkout_request_id).first()

    @staticmethod
    def get_by_merchant_request_id(
        merchant_request_id,
    ):
        return Payment.query.filter_by(merchant_request_id=merchant_request_id).first()

    @staticmethod
    def update():
        db.session.commit()

    @staticmethod
    def save():
        db.session.commit()
