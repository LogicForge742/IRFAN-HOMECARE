import logging
import time
from uuid import uuid4

from flask import g, request
from flask_jwt_extended import get_jwt_identity, verify_jwt_in_request

from app.core.metrics import metrics


def init_request_logger(app):

    @app.before_request
    def before_request():
        g.start_time = time.time()
        g.correlation_id = request.headers.get("X-Correlation-ID", str(uuid4()))

    @app.after_request
    def after_request(response):
        duration_ms = (
            round((time.time() - g.start_time) * 1000, 2)
            if hasattr(g, "start_time")
            else 0.0
        )

        user_id = None
        try:
            verify_jwt_in_request(optional=True)
            user_id = get_jwt_identity()
        except Exception:
            pass

        record = logging.LogRecord(
            name="request_logger",
            level=logging.INFO,
            pathname="",
            lineno=0,
            msg=f"{request.method} {request.path} {response.status_code} {duration_ms}ms",
            args=(),
            exc_info=None,
        )

        record.correlation_id = getattr(g, "correlation_id", None)
        record.method = request.method
        record.endpoint = request.path
        record.status = response.status_code
        record.duration_ms = duration_ms
        if user_id:
            record.user_id = user_id

        app.logger.handle(record)

        metrics.record_request(response.status_code, duration_ms)

        response.headers["X-Correlation-ID"] = getattr(g, "correlation_id", "")
        return response
