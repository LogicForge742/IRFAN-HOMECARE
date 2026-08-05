import logging
from functools import wraps
from flask import g, jsonify
from flask_jwt_extended import get_jwt_identity, verify_jwt_in_request

from app.config.tenant.tenant_loader import TenantLoader
from app.middleware.tenant_resolver import TenantResolver
from app.repositories.tenant.organization_repository import OrganizationRepository

logger = logging.getLogger(__name__)


def init_tenant_context(app):
    @app.before_request
    def resolve_tenant_context():
        try:
            tenant_id, tenant_obj, source = TenantResolver.resolve_tenant_from_request()
        except Exception as e:
            # Gracefully degrade — e.g. 'tenants' table not yet migrated
            logger.warning(f"Tenant resolution skipped (DB may not be migrated yet): {e}")
            tenant_id, tenant_obj, source = None, None, "none"

        g.tenant_id = tenant_id
        g.tenant = tenant_obj
        g.tenant_resolution_source = source
        g.tenant_config = TenantLoader.get_tenant_config(tenant_obj)


def tenant_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not getattr(g, "tenant_id", None):
            return jsonify({"message": "Invalid or missing tenant identification"}), 400
        if getattr(g, "tenant", None) and hasattr(g.tenant, "is_active") and not g.tenant.is_active:
            return jsonify({"message": "Tenant account is currently suspended"}), 403
        return f(*args, **kwargs)

    return decorated_function


def tenant_member_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not getattr(g, "tenant_id", None):
            return jsonify({"message": "Invalid or missing tenant identification"}), 400

        try:
            verify_jwt_in_request(optional=True)
            user_id = get_jwt_identity()
            if user_id:
                member = OrganizationRepository.get_member(g.tenant_id, user_id)
                if not member:
                    return (
                        jsonify(
                            {
                                "message": "Forbidden: You are not an enrolled member of this healthcare organization"
                            }
                        ),
                        403,
                    )
        except Exception:
            pass

        return f(*args, **kwargs)

    return decorated_function
