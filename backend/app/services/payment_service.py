from decimal import Decimal
from uuid import uuid4

from app.models.payment import Payment
from app.repositories.appointment_repository import AppointmentRepository
from app.repositories.payment_repository import PaymentRepository
from app.services.audit_log_service import AuditLogService
from app.services.mpesa_service import MpesaService
from app.tasks.notification_tasks import create_notification_task
from app.tasks.receipt_tasks import generate_receipt_task


class PaymentService:

    @staticmethod
    def create_payment(
        *,
        appointment_id,
        user_id,
        amount,
        provider,
    ):

        appointment = AppointmentRepository.get_by_id(appointment_id)

        if not appointment:
            raise ValueError("Appointment not found.")

        reference = f"IRF-{uuid4().hex[:12].upper()}"

        payment = Payment(
            appointment_id=appointment.id,
            user_id=user_id,
            amount=Decimal(amount),
            provider=provider,
            reference=reference,
            status="pending",
        )

        PaymentRepository.create(payment)

        return payment

    @staticmethod
    def initiate_payment(
        *,
        user_id,
        appointment_id,
        amount,
        provider,
        phone_number,
    ):
        """
        Creates a payment, initiates STK Push,
        stores Safaricom request identifiers,
        and returns the payment summary.
        """
        payment = PaymentService.create_payment(
            appointment_id=appointment_id,
            user_id=user_id,
            amount=amount,
            provider=provider,
        )

        if provider.upper() == "MPESA":
            stk_response = MpesaService.initiate_stk_push(
                phone_number=phone_number,
                amount=amount,
                account_reference=payment.reference,
            )

            if stk_response.get("ResponseCode") == "0":
                payment.checkout_request_id = stk_response.get("CheckoutRequestID")
                payment.merchant_request_id = stk_response.get("MerchantRequestID")
                payment.provider_payload = stk_response
                payment.status = "processing"
                PaymentRepository.update()

        return {
            "id": payment.id,
            "reference": payment.reference,
            "amount": str(payment.amount),
            "currency": payment.currency,
            "provider": payment.provider,
            "status": payment.status,
            "checkout_request_id": payment.checkout_request_id,
        }

    @staticmethod
    def process_mpesa_callback(callback_data):
        """
        Parses Daraja callback, updates payment status,
        enqueues receipt generation & notifications asynchronously,
        and logs audit events.
        """
        parsed = MpesaService.process_callback(callback_data)
        checkout_request_id = parsed.get("checkout_request_id")

        if not checkout_request_id:
            return None

        payment = PaymentRepository.get_by_checkout_request_id(checkout_request_id)

        if not payment:
            return None

        payment.provider_payload = parsed["raw_payload"]

        if parsed["result_code"] == 0:
            payment.status = "completed"
            payment.provider_reference = parsed.get("receipt_number")

            # Update associated appointment status to confirmed
            appointment = AppointmentRepository.get_by_id(payment.appointment_id)
            if appointment:
                appointment.status = "confirmed"
                AppointmentRepository.update()

            # Enqueue background receipt generation
            generate_receipt_task.delay(payment.id)

            # Enqueue background payment receipt email
            from app.tasks.email_tasks import send_payment_receipt_task

            send_payment_receipt_task.delay(payment.user_id, payment.id)

            # Enqueue background notification
            create_notification_task.delay(
                user_id=payment.user_id,
                title="Payment Successful",
                message=(
                    f"Your payment of KES {payment.amount} "
                    f"(Ref: {payment.reference}) was received successfully."
                ),
                notification_type="payment",
            )

            # Audit log
            AuditLogService.log(
                user_id=payment.user_id,
                action="PAYMENT_COMPLETED",
                resource="payments",
                resource_id=payment.id,
                details={
                    "reference": payment.reference,
                    "receipt": parsed.get("receipt_number"),
                    "amount": str(payment.amount),
                },
            )

        else:
            payment.status = "failed"

            # Enqueue background notification for failed payment
            create_notification_task.delay(
                user_id=payment.user_id,
                title="Payment Failed",
                message=(
                    f"Your payment for reference {payment.reference} could "
                    f"not be processed. Reason: {parsed.get('result_desc')}"
                ),
                notification_type="payment",
            )

            # Audit log for failed payment
            AuditLogService.log(
                user_id=payment.user_id,
                action="PAYMENT_FAILED",
                resource="payments",
                resource_id=payment.id,
                details={
                    "reference": payment.reference,
                    "reason": parsed.get("result_desc"),
                },
            )

        PaymentRepository.save()
        return payment
