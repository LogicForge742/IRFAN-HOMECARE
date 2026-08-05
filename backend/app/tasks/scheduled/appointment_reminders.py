import logging
from app.celery_app import celery

logger = logging.getLogger(__name__)


@celery.task(name="tasks.scheduled.appointment_reminders.send_upcoming_appointment_reminders")
def send_upcoming_appointment_reminders():
    logger.info("Executing task: send_upcoming_appointment_reminders")
    try:
        from app.models.appointment import Appointment
        from datetime import datetime, timedelta

        now = datetime.utcnow()
        upcoming_window = now + timedelta(hours=24)

        appointments = Appointment.query.filter(
            Appointment.appointment_date >= now,
            Appointment.appointment_date <= upcoming_window,
            Appointment.status == "CONFIRMED",
        ).all()

        count = len(appointments)
        logger.info(f"Processed {count} upcoming appointment reminders.")
        return {"status": "success", "reminders_sent": count}
    except Exception as e:
        logger.error(f"Error sending appointment reminders: {str(e)}")
        return {"status": "error", "message": str(e)}
