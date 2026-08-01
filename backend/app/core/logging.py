import json
import logging
from datetime import datetime


class JSONFormatter(logging.Formatter):
    """Custom JSON Formatter for structured production logs."""

    def format(self, record: logging.LogRecord) -> str:
        log_object = {
            "timestamp": datetime.utcnow().isoformat(),
            "level": record.levelname,
            "message": record.getMessage(),
            "logger": record.name,
        }

        if hasattr(record, "correlation_id"):
            log_object["correlation_id"] = record.correlation_id

        if hasattr(record, "method"):
            log_object["method"] = record.method
            log_object["endpoint"] = record.endpoint
            log_object["status"] = record.status
            log_object["duration_ms"] = record.duration_ms

        if hasattr(record, "user_id"):
            log_object["user_id"] = record.user_id

        if record.exc_info:
            log_object["exception"] = self.formatException(record.exc_info)

        return json.dumps(log_object)


def setup_logging(app):
    """Configure structured JSON logging on Flask app logger."""
    handler = logging.StreamHandler()
    handler.setFormatter(JSONFormatter())

    app.logger.handlers.clear()
    app.logger.addHandler(handler)
    app.logger.setLevel(logging.INFO)
