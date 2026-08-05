from app.extensions import db
from app.models.tenant.tenant import Tenant
from app.repositories.base.base_repository import BaseRepository


class TenantRepository(BaseRepository):
    model = Tenant

    @classmethod
    def get_by_slug(cls, slug):
        return cls.model.query.filter_by(slug=slug).first()

    @classmethod
    def get_by_domain(cls, domain):
        return cls.model.query.filter_by(domain=domain).first()

    @classmethod
    def list_active(cls):
        return cls.model.query.filter_by(is_active=True).order_by(cls.model.name.asc()).all()

    @classmethod
    def update_settings(cls, tenant_id, settings):
        tenant = cls.get_by_id(tenant_id)
        if tenant:
            tenant.settings = {**(tenant.settings or {}), **settings}
            db.session.commit()
            return tenant
        return None
