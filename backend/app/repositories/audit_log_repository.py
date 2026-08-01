from app.extensions import db
from app.models.audit_log import AuditLog


class AuditLogRepository:

    @staticmethod
    def create(log):
        db.session.add(log)
        db.session.commit()
        return log

    @staticmethod
    def get_by_id(log_id):
        return AuditLog.query.get(log_id)

    @staticmethod
    def get_by_user(user_id):
        return (
            AuditLog.query.filter_by(user_id=user_id)
            .order_by(AuditLog.created_at.desc())
            .all()
        )

    @staticmethod
    def get_by_resource(resource):
        return (
            AuditLog.query.filter_by(resource=resource)
            .order_by(AuditLog.created_at.desc())
            .all()
        )

    @staticmethod
    def get_all(limit=100):
        return AuditLog.query.order_by(AuditLog.created_at.desc()).limit(limit).all()
