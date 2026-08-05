DEFAULT_TENANT_SETTINGS = {
    "features": {
        "telehealth_video": True,
        "ai_triage_assistant": True,
        "fhir_interoperability": True,
        "mpesa_payments": True,
        "sso_integration": True,
    },
    "branding": {
        "logo_url": "/assets/branding/default-logo.svg",
        "primary_color": "#10b981",
        "secondary_color": "#064e3b",
        "accent_color": "#34d399",
    },
    "localization": {
        "default_timezone": "Africa/Nairobi",
        "currency": "KES",
        "locale": "en-KE",
    },
    "security": {
        "mfa_required": False,
        "session_timeout_minutes": 60,
    },
}
