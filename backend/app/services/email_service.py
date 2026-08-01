from flask import render_template

from app.integrations.email_client import EmailClient
from app.repositories.appointment_repository import AppointmentRepository
from app.repositories.patient_repository import PatientRepository
from app.repositories.payment_repository import PaymentRepository
from app.repositories.professional_repository import ProfessionalRepository
from app.repositories.user_repository import UserRepository


class EmailService:

    @staticmethod
    def send_welcome_email(user_id):
        user = UserRepository.get_by_id(user_id)
        if not user:
            return False

        html = render_template(
            "emails/welcome.html",
            name=f"{user.first_name} {user.last_name}",
        )

        return EmailClient.send(
            recipients=user.email,
            subject="Welcome to Irfan HomeCare",
            html=html,
        )

    @staticmethod
    def send_appointment_confirmation(user_id, appointment_id):
        user = UserRepository.get_by_id(user_id)
        appointment = AppointmentRepository.get_by_id(appointment_id)

        if not user or not appointment:
            return False

        patient = PatientRepository.get_by_id(appointment.patient_id)
        prof = ProfessionalRepository.get_by_id(appointment.professional_id)

        patient_user = UserRepository.get_by_id(patient.user_id) if patient else user
        prof_user = UserRepository.get_by_id(prof.user_id) if prof else None

        patient_name = (
            f"{patient_user.first_name} {patient_user.last_name}"
            if patient_user
            else "Valued Patient"
        )
        prof_name = (
            f"{prof_user.first_name} {prof_user.last_name}"
            if prof_user
            else "Healthcare Professional"
        )

        html = render_template(
            "emails/appointment_confirmation.html",
            patient_name=patient_name,
            professional_name=prof_name,
            appointment_date=appointment.appointment_date.isoformat(),
            start_time=appointment.start_time.strftime("%H:%M"),
        )

        return EmailClient.send(
            recipients=user.email,
            subject="Appointment Confirmation - Irfan HomeCare",
            html=html,
        )

    @staticmethod
    def send_payment_receipt(user_id, payment_id, receipt_path=None):
        user = UserRepository.get_by_id(user_id)
        payment = PaymentRepository.get_by_id(payment_id)

        if not user or not payment:
            return False

        html = render_template(
            "emails/payment_receipt.html",
            patient_name=f"{user.first_name} {user.last_name}",
            reference=payment.reference,
            amount=str(payment.amount),
            appointment_reference=payment.appointment_id,
            transaction_id=payment.provider_reference or "N/A",
        )

        attachments = []
        if receipt_path:
            attachments.append(
                {
                    "filename": f"receipt_{payment.reference}.pdf",
                    "content_type": "application/pdf",
                    "path": receipt_path,
                }
            )

        return EmailClient.send(
            recipients=user.email,
            subject=f"Payment Receipt [{payment.reference}] - Irfan HomeCare",
            html=html,
            attachments=attachments if attachments else None,
        )

    @staticmethod
    def send_password_reset(user_id, reset_link):
        user = UserRepository.get_by_id(user_id)
        if not user:
            return False

        html = render_template(
            "emails/password_reset.html",
            name=f"{user.first_name} {user.last_name}",
            reset_url=reset_link,
        )

        return EmailClient.send(
            recipients=user.email,
            subject="Reset Your Password - Irfan HomeCare",
            html=html,
        )

    @staticmethod
    def send_email_verification(user_id, verification_link):
        user = UserRepository.get_by_id(user_id)
        if not user:
            return False

        html = render_template(
            "emails/email_verification.html",
            name=f"{user.first_name} {user.last_name}",
            verification_url=verification_link,
        )

        return EmailClient.send(
            recipients=user.email,
            subject="Verify Your Email - Irfan HomeCare",
            html=html,
        )
