import redis
from flask import Blueprint, current_app, jsonify
from sqlalchemy import text

from app.core.metrics import metrics
from app.extensions import db

health_bp = Blueprint("health", __name__)


@health_bp.get("/health")
def health_check():
    return jsonify({"status": "healthy"}), 200


@health_bp.get("/ready")
def readiness_check():
    status = {"database": "disconnected", "redis": "disconnected", "status": "ready"}
    is_ready = True

    try:
        db.session.execute(text("SELECT 1"))
        status["database"] = "connected"
    except Exception as e:
        status["database"] = f"error: {str(e)}"
        is_ready = False

    try:
        broker_url = current_app.config.get(
            "CELERY_BROKER_URL", "redis://localhost:6379/0"
        )
        r = redis.Redis.from_url(broker_url, socket_timeout=2)
        if r.ping():
            status["redis"] = "connected"
        else:
            status["redis"] = "disconnected"
            is_ready = False
    except Exception as e:
        status["redis"] = f"error: {str(e)}"
        is_ready = False

    if is_ready:
        return jsonify(status), 200
    else:
        status["status"] = "not_ready"
        return jsonify(status), 503


@health_bp.get("/metrics")
def get_metrics():
    return jsonify(metrics.get_summary()), 200
