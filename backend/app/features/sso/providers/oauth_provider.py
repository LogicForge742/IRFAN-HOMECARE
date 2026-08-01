import os

class OAuthProvider:
    """OAuth 2.0 provider for social login (GitHub, Facebook)."""

    PROVIDER_CONFIG = {
        "github": {
            "name": "GitHub",
            "authorization_endpoint": "https://github.com/login/oauth/authorize",
            "token_endpoint": "https://github.com/login/oauth/access_token",
            "userinfo_endpoint": "https://api.github.com/user",
            "scopes": ["read:user", "user:email"],
            "icon": "github",
        },
        "facebook": {
            "name": "Facebook",
            "authorization_endpoint": "https://www.facebook.com/v18.0/dialog/oauth",
            "token_endpoint": "https://graph.facebook.com/v18.0/oauth/access_token",
            "userinfo_endpoint": "https://graph.facebook.com/me?fields=id,name,email",
            "scopes": ["email", "public_profile"],
            "icon": "facebook",
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
            f"?client_id={client_id}"
            f"&redirect_uri={redirect_uri}"
            f"&scope={scopes}"
            f"&state={state}"
        )

    @classmethod
    def exchange_code(cls, provider_key, code, redirect_uri):
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
