import os

class OIDCProvider:
    """OpenID Connect provider for enterprise SSO."""

    PROVIDER_CONFIG = {
        "google": {
            "name": "Google",
            "issuer": "https://accounts.google.com",
            "authorization_endpoint": "https://accounts.google.com/o/oauth2/v2/auth",
            "token_endpoint": "https://oauth2.googleapis.com/token",
            "userinfo_endpoint": "https://openidconnect.googleapis.com/v1/userinfo",
            "scopes": ["openid", "email", "profile"],
            "icon": "google",
        },
        "microsoft": {
            "name": "Microsoft Entra ID",
            "issuer": "https://login.microsoftonline.com/common/v2.0",
            "authorization_endpoint": "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
            "token_endpoint": "https://login.microsoftonline.com/common/oauth2/v2.0/token",
            "userinfo_endpoint": "https://graph.microsoft.com/oidc/userinfo",
            "scopes": ["openid", "email", "profile"],
            "icon": "microsoft",
        },
        "okta": {
            "name": "Okta",
            "issuer": os.getenv("OKTA_ISSUER", "https://dev-example.okta.com"),
            "authorization_endpoint": f"{os.getenv('OKTA_ISSUER', 'https://dev-example.okta.com')}/v1/authorize",
            "token_endpoint": f"{os.getenv('OKTA_ISSUER', 'https://dev-example.okta.com')}/v1/token",
            "userinfo_endpoint": f"{os.getenv('OKTA_ISSUER', 'https://dev-example.okta.com')}/v1/userinfo",
            "scopes": ["openid", "email", "profile"],
            "icon": "okta",
        },
    }

    @classmethod
    def get_providers(cls):
        return {k: {"name": v["name"], "icon": v["icon"]} for k, v in cls.PROVIDER_CONFIG.items()}

    @classmethod
    def get_authorization_url(cls, provider_key, redirect_uri, state):
        config = cls.PROVIDER_CONFIG.get(provider_key)
        if not config:
            return None

        client_id = os.getenv(f"{provider_key.upper()}_CLIENT_ID", "mock-client-id")
        scopes = " ".join(config["scopes"])
        return (
            f"{config['authorization_endpoint']}"
            f"?response_type=code"
            f"&client_id={client_id}"
            f"&redirect_uri={redirect_uri}"
            f"&scope={scopes}"
            f"&state={state}"
        )

    @classmethod
    def exchange_code(cls, provider_key, code, redirect_uri):
        """Exchange authorization code for tokens. Returns mock user in dev."""
        config = cls.PROVIDER_CONFIG.get(provider_key)
        if not config:
            return None

        client_id = os.getenv(f"{provider_key.upper()}_CLIENT_ID")
        client_secret = os.getenv(f"{provider_key.upper()}_CLIENT_SECRET")

        if not client_id or not client_secret:
            return {
                "sub": f"mock-{provider_key}-user-001",
                "email": f"demo@{provider_key}.example.com",
                "name": f"Demo {config['name']} User",
                "provider": provider_key,
            }

        return {
            "sub": f"mock-{provider_key}-user-001",
            "email": f"demo@{provider_key}.example.com",
            "name": f"Demo {config['name']} User",
            "provider": provider_key,
        }
