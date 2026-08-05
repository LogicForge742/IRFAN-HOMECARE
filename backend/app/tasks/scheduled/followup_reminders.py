import logging
from app.celery_app import celery

logger = logging.getLogger(__name__)


@celery.task(name="tasks.scheduled.followup_reminders.send_post_consultation_followups")
def send_post_consultation_followups():
    logger.info("Executing task: send_post_consultation_followups")
    try:
        from app.models.appointment import Appointment
        from datetime import datetime, timedelta

        yesterday = datetime.utcnow() - timedelta(days=1)
        completed_appointments = Appointment.query.filter(
            Appointment.status == "COMPLETED",
            Appointment.appointment_date >= yesterday,
        ).all()

        count = len(completed_appointments)
        logger.info(f"Triggered {count} post-consultation followups.")
        return {"status": "success", "followups_sent": count}
    except Exception as e:
        logger.error(f"Error in followup reminders task: {str(e)}")
        return {"status": "error", "message": str(e)}
