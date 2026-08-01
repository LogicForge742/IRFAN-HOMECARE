import uuid
from flask_jwt_extended import create_access_token
from app.models.user import User
from app.extensions import db
from app.features.sso.providers.oidc_provider import OIDCProvider
from app.features.sso.providers.oauth_provider import OAuthProvider
from app.features.sso.providers.saml_provider import SAMLProvider

class SSOService:
    ALL_PROVIDERS = {}

    @classmethod
    def _build_provider_registry(cls):
        if cls.ALL_PROVIDERS:
            return
        for key, val in OIDCProvider.get_providers().items():
            cls.ALL_PROVIDERS[key] = {**val, "protocol": "oidc"}
        for key, val in OAuthProvider.get_providers().items():
            cls.ALL_PROVIDERS[key] = {**val, "protocol": "oauth2"}
        for key, val in SAMLProvider.get_providers().items():
            cls.ALL_PROVIDERS[key] = {**val, "protocol": "saml"}

    @classmethod
    def list_providers(cls):
        cls._build_provider_registry()
        return cls.ALL_PROVIDERS

    @classmethod
    def get_login_url(cls, provider_key, redirect_uri):
        cls._build_provider_registry()
        meta = cls.ALL_PROVIDERS.get(provider_key)
        if not meta:
            return None

        state = str(uuid.uuid4())

        if meta["protocol"] == "oidc":
            url = OIDCProvider.get_authorization_url(provider_key, redirect_uri, state)
        elif meta["protocol"] == "oauth2":
            url = OAuthProvider.get_authorization_url(provider_key, redirect_uri, state)
        elif meta["protocol"] == "saml":
            url = SAMLProvider.get_login_url(provider_key, redirect_uri)
        else:
            return None

        return {"url": url, "state": state}

    @classmethod
    def handle_callback(cls, provider_key, code, redirect_uri):
        cls._build_provider_registry()
        meta = cls.ALL_PROVIDERS.get(provider_key)
        if not meta:
            return None, "Unknown provider"

        if meta["protocol"] == "oidc":
            user_info = OIDCProvider.exchange_code(provider_key, code, redirect_uri)
        elif meta["protocol"] == "oauth2":
            user_info = OAuthProvider.exchange_code(provider_key, code, redirect_uri)
        elif meta["protocol"] == "saml":
            user_info = SAMLProvider.process_response(provider_key, code)
        else:
            return None, "Unsupported protocol"

        if not user_info:
            return None, "Failed to retrieve user info from provider"

        user = User.query.filter_by(email=user_info["email"]).first()
        if not user:
            full_name = user_info.get("name", "SSO User")
            name_parts = full_name.split(" ", 1)
            first_name = name_parts[0]
            last_name = name_parts[1] if len(name_parts) > 1 else ""

            user = User(
                first_name=first_name,
                last_name=last_name,
                email=user_info["email"],
                password_hash="sso-managed",
                role=user_info.get("role", "patient"),
                sso_provider=provider_key,
                sso_subject_id=user_info["sub"],
            )
            db.session.add(user)
            db.session.commit()

        access_token = create_access_token(identity=str(user.id))
        return {
            "access_token": access_token,
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "role": user.role,
            },
        }, None

    @classmethod
    def link_account(cls, user_id, provider_key, provider_subject_id):
        user = User.query.filter_by(id=user_id).first()
        if not user:
            return False, "User not found"
        user.sso_provider = provider_key
        user.sso_subject_id = provider_subject_id
        db.session.commit()
        return True, "Account linked successfully"

    @classmethod
    def unlink_account(cls, user_id):
        user = User.query.filter_by(id=user_id).first()
        if not user:
            return False, "User not found"
        user.sso_provider = None
        user.sso_subject_id = None
        db.session.commit()
        return True, "Account unlinked successfully"
