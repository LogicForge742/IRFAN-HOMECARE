from flask import request

from app.models.audit_log import AuditLog
from app.repositories.audit_log_repository import AuditLogRepository


class AuditLogService:

    @staticmethod
    def log(
        *,
        user_id,
        action,
        resource,
        resource_id=None,
        details=None,
    ):

        log = AuditLog(
            user_id=user_id,
            action=action,
            resource=resource,
            resource_id=resource_id,
            ip_address=request.remote_addr,
            user_agent=request.headers.get("User-Agent"),
            details=details,
        )

        AuditLogRepository.create(log)

        return log
