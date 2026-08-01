import threading


class MetricsCounter:
    """Lightweight in-memory metrics counter for app observability."""

    def __init__(self):
        self._lock = threading.Lock()
        self.requests_total = 0
        self.requests_failed = 0
        self.payment_failures = 0
        self.celery_task_failures = 0
        self.total_duration_ms = 0.0

    def record_request(self, status_code: int, duration_ms: float):
        with self._lock:
            self.requests_total += 1
            self.total_duration_ms += duration_ms
            if status_code >= 400:
                self.requests_failed += 1

    def record_payment_failure(self):
        with self._lock:
            self.payment_failures += 1

    def record_celery_task_failure(self):
        with self._lock:
            self.celery_task_failures += 1

    def get_summary(self):
        with self._lock:
            avg_duration = (
                self.total_duration_ms / self.requests_total
                if self.requests_total > 0
                else 0
            )
            return {
                "requests_total": self.requests_total,
                "requests_failed": self.requests_failed,
                "payment_failures": self.payment_failures,
                "celery_task_failures": self.celery_task_failures,
                "avg_response_time_ms": round(avg_duration, 2),
            }


metrics = MetricsCounter()
