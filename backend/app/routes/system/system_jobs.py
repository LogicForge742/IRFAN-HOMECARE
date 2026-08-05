import time
from datetime import datetime, timedelta
from app.scheduler.task_registry import TASK_REGISTRY


def get_all_registered_jobs():
    jobs = []
    now = datetime.utcnow()
    for task_name, meta in TASK_REGISTRY.items():
        jobs.append({
            "id": task_name,
            "name": meta["name"],
            "task": meta["task"],
            "description": meta["description"],
            "cron": meta["cron"],
            "queue": meta["queue"],
            "category": meta["category"],
            "status": "IDLE",
            "last_run": (now - timedelta(minutes=25)).isoformat() + "Z",
            "next_run": (now + timedelta(minutes=35)).isoformat() + "Z",
        })
    return jobs


def get_job_history():
    now = datetime.utcnow()
    return [
        {
            "id": "hist-1",
            "job_id": "send-appointment-reminders-hourly",
            "task": "tasks.scheduled.appointment_reminders.send_upcoming_appointment_reminders",
            "status": "SUCCESS",
            "executed_at": (now - timedelta(minutes=25)).isoformat() + "Z",
            "duration_ms": 340,
            "result": {"reminders_sent": 14},
        },
        {
            "id": "hist-2",
            "job_id": "cleanup-telehealth-video-sessions",
            "task": "tasks.scheduled.video_session_cleanup.purge_stale_video_rooms",
            "status": "SUCCESS",
            "executed_at": (now - timedelta(minutes=10)).isoformat() + "Z",
            "duration_ms": 120,
            "result": {"purged_rooms": 2},
        },
        {
            "id": "hist-3",
            "job_id": "send-payment-reminders-daily",
            "task": "tasks.scheduled.payment_reminders.send_pending_payment_reminders",
            "status": "SUCCESS",
            "executed_at": (now - timedelta(hours=5)).isoformat() + "Z",
            "duration_ms": 510,
            "result": {"reminders_sent": 8},
        },
    ]


def get_scheduler_health():
    return {
        "status": "HEALTHY",
        "worker_count": 4,
        "active_queues": ["notifications", "payments", "reports", "maintenance", "video", "default"],
        "broker_connected": True,
        "pending_tasks": 0,
        "failed_tasks_24h": 0,
        "uptime_seconds": 184200,
    }
