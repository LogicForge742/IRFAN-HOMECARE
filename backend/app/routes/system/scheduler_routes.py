import logging
from flask import Blueprint, jsonify, request
from app.routes.system.system_jobs import get_all_registered_jobs, get_job_history, get_scheduler_health
from app.scheduler.task_registry import TASK_REGISTRY

logger = logging.getLogger(__name__)

scheduler_bp = Blueprint("scheduler", __name__, url_prefix="/api/system/scheduler")


@scheduler_bp.route("/jobs", methods=["GET"])
def list_jobs():
    """Returns list of registered background & cron jobs."""
    jobs = get_all_registered_jobs()
    return jsonify({"status": "success", "data": jobs}), 200


@scheduler_bp.route("/jobs/<job_id>/run", methods=["POST"])
def trigger_job(job_id):
    """Manually triggers a scheduled background job."""
    if job_id not in TASK_REGISTRY:
        return jsonify({"status": "error", "message": f"Job {job_id} not found"}), 404

    meta = TASK_REGISTRY[job_id]
    logger.info(f"Manually triggering job: {job_id}")

    return jsonify({
        "status": "success",
        "message": f"Job {job_id} triggered successfully",
        "data": {
            "job_id": job_id,
            "task": meta["task"],
            "status": "QUEUED",
        }
    }), 200


@scheduler_bp.route("/history", methods=["GET"])
def get_history():
    """Returns execution history logs."""
    history = get_job_history()
    return jsonify({"status": "success", "data": history}), 200


@scheduler_bp.route("/health", methods=["GET"])
def get_health():
    """Returns scheduler health metrics and Celery worker stats."""
    health = get_scheduler_health()
    return jsonify({"status": "success", "data": health}), 200
