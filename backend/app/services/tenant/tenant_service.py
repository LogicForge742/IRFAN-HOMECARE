import re
from app.models.tenant.tenant import Tenant
from app.repositories.tenant.tenant_repository import TenantRepository


class TenantService:

    @staticmethod
    def create_tenant(data):
        name = data.get("name")
        if not name:
            raise ValueError("Tenant name is required")

        slug = data.get("slug")
        if not slug:
            slug = re.sub(r"[^\w\s-]", "", name.lower()).strip()
            slug = re.sub(r"[-\s]+", "-", slug)

        existing_slug = TenantRepository.get_by_slug(slug)
        if existing_slug:
            raise ValueError(f"Tenant with slug '{slug}' already exists")

        domain = data.get("domain")
        if domain:
            existing_domain = TenantRepository.get_by_domain(domain)
            if existing_domain:
                raise ValueError(f"Tenant with domain '{domain}' already exists")

        tenant = Tenant(
            name=name,
            slug=slug,
            domain=domain,
            logo_url=data.get("logo_url"),
            primary_color=data.get("primary_color", "#10b981"),
            is_active=data.get("is_active", True),
            settings=data.get("settings", {}),
        )

        TenantRepository.create(tenant)
        return TenantService.serialize(tenant)

    @staticmethod
    def get_tenant(tenant_id):
        tenant = TenantRepository.get_by_id(tenant_id)
        if not tenant:
            raise ValueError("Tenant not found")
        return TenantService.serialize(tenant)

    @staticmethod
    def get_tenant_by_slug(slug):
        tenant = TenantRepository.get_by_slug(slug)
        if not tenant:
            raise ValueError("Tenant not found")
        return TenantService.serialize(tenant)

    @staticmethod
    def list_tenants():
        tenants = Tenant.query.order_by(Tenant.created_at.desc()).all()
        return [TenantService.serialize(t) for t in tenants]

    @staticmethod
    def update_tenant(tenant_id, data):
        tenant = TenantRepository.get_by_id(tenant_id)
        if not tenant:
            raise ValueError("Tenant not found")

        if "name" in data:
            tenant.name = data["name"]
        if "logo_url" in data:
            tenant.logo_url = data["logo_url"]
        if "primary_color" in data:
            tenant.primary_color = data["primary_color"]
        if "is_active" in data:
            tenant.is_active = data["is_active"]
        if "settings" in data:
            tenant.settings = {**(tenant.settings or {}), **data["settings"]}

        TenantRepository.update(tenant)
        return TenantService.serialize(tenant)

    @staticmethod
    def serialize(tenant):
        return {
            "id": tenant.id,
            "name": tenant.name,
            "slug": tenant.slug,
            "domain": tenant.domain,
            "logo_url": tenant.logo_url,
            "primary_color": tenant.primary_color,
            "is_active": tenant.is_active,
            "settings": tenant.settings or {},
            "created_at": tenant.created_at.isoformat() if tenant.created_at else None,
            "updated_at": tenant.updated_at.isoformat() if tenant.updated_at else None,
        }
