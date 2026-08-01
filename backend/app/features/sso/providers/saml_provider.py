class SAMLProvider:
    """SAML 2.0 provider stub for enterprise healthcare federation."""

    PROVIDER_CONFIG = {
        "hospital_adfs": {
            "name": "Hospital ADFS",
            "entity_id": "urn:irfan-homecare:saml",
            "sso_url": "https://adfs.hospital.example.com/adfs/ls/",
            "slo_url": "https://adfs.hospital.example.com/adfs/ls/?wa=wsignout1.0",
            "certificate": None,
            "icon": "hospital",
        },
    }

    @classmethod
    def get_providers(cls):
        return {k: {"name": v["name"], "icon": v["icon"]} for k, v in cls.PROVIDER_CONFIG.items()}

    @classmethod
    def get_login_url(cls, provider_key, relay_state):
        config = cls.PROVIDER_CONFIG.get(provider_key)
        if not config:
            return None
        return f"{config['sso_url']}?RelayState={relay_state}"

    @classmethod
    def process_response(cls, provider_key, saml_response):
        """Process SAML response. Returns mock user in dev."""
        config = cls.PROVIDER_CONFIG.get(provider_key)
        if not config:
            return None

        return {
            "sub": f"mock-saml-{provider_key}-001",
            "email": "doctor@hospital.example.com",
            "name": "Dr. SAML Demo User",
            "provider": provider_key,
            "role": "professional",
        }
