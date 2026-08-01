from app.celery_app import celery
from app.services.receipt_service import ReceiptService


@celery.task(
    bind=True,
    max_retries=3,
)
def generate_receipt_task(
    self,
    payment_id,
):
    """
    Background task for receipt generation.
    """
    return ReceiptService.generate_receipt_for_payment(
        payment_id,
    )
