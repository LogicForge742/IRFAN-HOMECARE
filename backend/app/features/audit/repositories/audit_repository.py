from app.repositories.base.base_repository import BaseRepository
from app.models.audit_log import AuditLog
from app.extensions import db
from datetime import datetime

class AuditRepository(BaseRepository):
    model = AuditLog

    @classmethod
    def get_by_user_id(cls, user_id, params=None):
        query = cls.get_query().filter(AuditLog.user_id == user_id)
        from app.core.query import build_query
        return build_query(query, cls.model, params, search_fields=["action", "resource"])

    @classmethod
    def archive_logs(cls, before_date):
        logs_to_delete = cls.get_query().filter(AuditLog.created_at < before_date).all()
        count = len(logs_to_delete)
        for log in logs_to_delete:
            db.session.delete(log)
        db.session.commit()
        return count
