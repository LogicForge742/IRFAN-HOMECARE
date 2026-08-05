from flask import request
from app.repositories.tenant.tenant_repository import TenantRepository
from app.repositories.tenant.organization_repository import OrganizationRepository


class TenantResolver:

    @staticmethod
    def resolve_tenant_from_request():
        """
        Resolves tenant by evaluating request headers, query string, subdomain, and domain.
        Returns a tuple: (tenant_id, tenant_obj_or_dict, resolution_source)
        """
        # 1. Header resolution
        tenant_id = request.headers.get("X-Tenant-ID") or request.headers.get("X-Organization-ID")
        if tenant_id:
            tenant = TenantRepository.get_by_id(tenant_id) or OrganizationRepository.get_by_id(tenant_id)
            if tenant:
                return (tenant.id, tenant, "header")

        slug_header = request.headers.get("X-Tenant-Slug")
        if slug_header:
            tenant = TenantRepository.get_by_slug(slug_header) or OrganizationRepository.get_by_slug(slug_header)
            if tenant:
                return (tenant.id, tenant, "header_slug")

        # 2. Query String resolution
        tenant_param = request.args.get("tenant_id") or request.args.get("organization_id")
        if tenant_param:
            tenant = TenantRepository.get_by_id(tenant_param) or OrganizationRepository.get_by_id(tenant_param)
            if tenant:
                return (tenant.id, tenant, "query")

        # 3. Host Subdomain/Domain resolution
        host = request.host.split(":")[0]
        parts = host.split(".")
        if len(parts) > 2:
            subdomain = parts[0]
            tenant = TenantRepository.get_by_slug(subdomain) or OrganizationRepository.get_by_slug(subdomain)
            if tenant:
                return (tenant.id, tenant, "subdomain")

        tenant = TenantRepository.get_by_domain(host) or OrganizationRepository.get_by_domain(host)
        if tenant:
            return (tenant.id, tenant, "domain")

        return (None, None, "none")
