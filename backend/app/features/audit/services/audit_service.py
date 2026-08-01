import csv
import io
from datetime import datetime
from app.features.audit.repositories.audit_repository import AuditRepository
from app.models.audit_log import AuditLog

class AuditService:
    @staticmethod
    def get_logs(params=None):
        return AuditRepository.find_all(params, search_fields=["action", "resource"])

    @staticmethod
    def get_log_by_id(log_id):
        return AuditRepository.get_by_id(log_id)

    @staticmethod
    def get_logs_by_user(user_id, params=None):
        return AuditRepository.get_by_user_id(user_id, params)

    @staticmethod
    def log_action(user_id, action, resource, resource_id=None, ip_address=None, user_agent=None, details=None):
        log = AuditLog(
            user_id=user_id,
            action=action,
            resource=resource,
            resource_id=resource_id,
            ip_address=ip_address,
            user_agent=user_agent,
            details=details
        )
        return AuditRepository.create(log)

    @staticmethod
    def export_logs_csv():
        logs_data = AuditRepository.find_all(params={"per_page": 10000})
        items = logs_data.get("items", [])
        
        output = io.StringIO()
        writer = csv.writer(output)
        writer.writerow(["ID", "User ID", "Action", "Resource", "Resource ID", "IP Address", "Created At"])
        for item in items:
            writer.writerow([
                item.id,
                item.user_id,
                item.action,
                item.resource,
                item.resource_id,
                item.ip_address,
                item.created_at.isoformat()
            ])
        output.seek(0)
        return output.getvalue()

    @staticmethod
    def archive_logs(before_date):
        return AuditRepository.archive_logs(before_date)
