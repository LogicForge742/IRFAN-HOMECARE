from app.celery_app import celery
from app.services.email_service import EmailService


@celery.task(
    bind=True,
    max_retries=3,
)
def send_welcome_email_task(
    self,
    user_id,
):
    """
    Background task to send welcome email.
    """
    return EmailService.send_welcome_email(user_id)


@celery.task(
    bind=True,
    max_retries=3,
)
def send_appointment_confirmation_task(
    self,
    user_id,
    appointment_id,
):
    """
    Background task to send appointment confirmation email.
    """
    return EmailService.send_appointment_confirmation(user_id, appointment_id)


@celery.task(
    bind=True,
    max_retries=3,
)
def send_payment_receipt_task(
    self,
    user_id,
    payment_id,
    receipt_path=None,
):
    """
    Background task to send payment receipt email.
    """
    return EmailService.send_payment_receipt(user_id, payment_id, receipt_path)


@celery.task(
    bind=True,
    max_retries=3,
)
def send_password_reset_task(
    self,
    user_id,
    reset_link,
):
    """
    Background task to send password reset email.
    """
    return EmailService.send_password_reset(user_id, reset_link)


@celery.task(
    bind=True,
    max_retries=3,
)
def send_email_verification_task(
    self,
    user_id,
    verification_link,
):
    """
    Background task to send email verification link.
    """
    return EmailService.send_email_verification(user_id, verification_link)
