from app.config.tenant.default_settings import DEFAULT_TENANT_SETTINGS


class TenantLoader:

    @staticmethod
    def get_tenant_config(tenant):
        if not tenant:
            return DEFAULT_TENANT_SETTINGS

        custom_settings = getattr(tenant, "settings", None) or {}

        merged_features = {
            **DEFAULT_TENANT_SETTINGS["features"],
            **custom_settings.get("features", {}),
        }

        merged_branding = {
            **DEFAULT_TENANT_SETTINGS["branding"],
            "primary_color": getattr(tenant, "primary_color", None)
            or DEFAULT_TENANT_SETTINGS["branding"]["primary_color"],
            "logo_url": getattr(tenant, "logo_url", None)
            or DEFAULT_TENANT_SETTINGS["branding"]["logo_url"],
            **custom_settings.get("branding", {}),
        }

        merged_localization = {
            **DEFAULT_TENANT_SETTINGS["localization"],
            **custom_settings.get("localization", {}),
        }

        merged_security = {
            **DEFAULT_TENANT_SETTINGS["security"],
            **custom_settings.get("security", {}),
        }

        return {
            "tenant_id": getattr(tenant, "id", None),
            "tenant_name": getattr(tenant, "name", "Default"),
            "tenant_slug": getattr(tenant, "slug", "default"),
            "features": merged_features,
            "branding": merged_branding,
            "localization": merged_localization,
            "security": merged_security,
        }
