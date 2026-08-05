import logging
from app.celery_app import celery

logger = logging.getLogger(__name__)


@celery.task(name="tasks.scheduled.daily_reports.generate_and_send_daily_digest")
def generate_and_send_daily_digest():
    logger.info("Executing task: generate_and_send_daily_digest")
    try:
        from app.models.appointment import Appointment
        from app.models.payment import Payment
        from datetime import datetime, timedelta

        today_start = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
        appointments_today = Appointment.query.filter(Appointment.created_at >= today_start).count()
        payments_today = Payment.query.filter(Payment.created_at >= today_start, Payment.status == "COMPLETED").all()
        total_revenue = sum([p.amount for p in payments_today if p.amount])

        report_summary = {
            "date": today_start.strftime("%Y-%m-%d"),
            "new_appointments": appointments_today,
            "completed_payments": len(payments_today),
            "total_revenue_kes": float(total_revenue),
        }

        logger.info(f"Daily digest generated: {report_summary}")
        return {"status": "success", "report": report_summary}
    except Exception as e:
        logger.error(f"Error generating daily report: {str(e)}")
        return {"status": "error", "message": str(e)}
