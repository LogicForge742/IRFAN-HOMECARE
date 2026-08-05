import logging
from app.celery_app import celery

logger = logging.getLogger(__name__)


@celery.task(name="tasks.scheduled.payment_reminders.send_pending_payment_reminders")
def send_pending_payment_reminders():
    logger.info("Executing task: send_pending_payment_reminders")
    try:
        from app.models.payment import Payment

        pending_payments = Payment.query.filter_by(status="PENDING").all()
        count = len(pending_payments)
        logger.info(f"Sent {count} payment reminders.")
        return {"status": "success", "reminders_sent": count}
    except Exception as e:
        logger.error(f"Error in payment reminders task: {str(e)}")
        return {"status": "error", "message": str(e)}
