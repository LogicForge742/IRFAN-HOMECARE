from app.celery_app import celery
from app.scheduler.beat_schedule import BEAT_SCHEDULE


def init_scheduler(app=None):
    """
    Attaches beat schedule and queues configuration to Celery instance.
    """
    celery.conf.beat_schedule = BEAT_SCHEDULE
    celery.conf.task_routes = {
        "tasks.scheduled.appointment_reminders.*": {"queue": "notifications"},
        "tasks.scheduled.payment_reminders.*": {"queue": "payments"},
        "tasks.scheduled.daily_reports.*": {"queue": "reports"},
        "tasks.scheduled.database_cleanup.*": {"queue": "maintenance"},
        "tasks.scheduled.backup_scheduler.*": {"queue": "maintenance"},
        "tasks.scheduled.video_session_cleanup.*": {"queue": "video"},
    }
    return celery
