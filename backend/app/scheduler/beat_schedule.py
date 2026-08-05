from celery.schedules import crontab

BEAT_SCHEDULE = {
    "send-appointment-reminders-hourly": {
        "task": "tasks.scheduled.appointment_reminders.send_upcoming_appointment_reminders",
        "schedule": crontab(minute=0),  # Every hour
        "options": {"queue": "notifications"},
    },
    "send-payment-reminders-daily": {
        "task": "tasks.scheduled.payment_reminders.send_pending_payment_reminders",
        "schedule": crontab(hour=9, minute=0),  # Daily at 9 AM
        "options": {"queue": "payments"},
    },
    "trigger-followup-reminders-daily": {
        "task": "tasks.scheduled.followup_reminders.send_post_consultation_followups",
        "schedule": crontab(hour=10, minute=0),  # Daily at 10 AM
        "options": {"queue": "notifications"},
    },
    "flag-inactive-accounts-weekly": {
        "task": "tasks.scheduled.inactive_accounts.check_and_notify_inactive_users",
        "schedule": crontab(day_of_week=0, hour=2, minute=0),  # Sunday at 2 AM
        "options": {"queue": "default"},
    },
    "generate-daily-admin-report": {
        "task": "tasks.scheduled.daily_reports.generate_and_send_daily_digest",
        "schedule": crontab(hour=23, minute=55),  # Daily at 11:55 PM
        "options": {"queue": "reports"},
    },
    "purge-expired-sessions-and-files": {
        "task": "tasks.scheduled.database_cleanup.cleanup_expired_data",
        "schedule": crontab(hour=3, minute=0),  # Daily at 3 AM
        "options": {"queue": "maintenance"},
    },
    "archive-audit-logs-monthly": {
        "task": "tasks.scheduled.audit_archiver.archive_old_audit_logs",
        "schedule": crontab(day_of_month=1, hour=1, minute=0),  # 1st of month at 1 AM
        "options": {"queue": "maintenance"},
    },
    "automated-database-backup": {
        "task": "tasks.scheduled.backup_scheduler.trigger_database_backup",
        "schedule": crontab(hour=4, minute=0),  # Daily at 4 AM
        "options": {"queue": "maintenance"},
    },
    "send-patient-notification-digest": {
        "task": "tasks.scheduled.notification_digest.send_bundled_notification_digest",
        "schedule": crontab(hour=18, minute=0),  # Daily at 6 PM
        "options": {"queue": "notifications"},
    },
    "cleanup-telehealth-video-sessions": {
        "task": "tasks.scheduled.video_session_cleanup.purge_stale_video_rooms",
        "schedule": crontab(minute="*/15"),  # Every 15 minutes
        "options": {"queue": "video"},
    },
}
