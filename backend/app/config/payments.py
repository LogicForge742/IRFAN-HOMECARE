import os

SUPPORTED_PROVIDERS = [
    "MPESA",
]

DEFAULT_CURRENCY = "KES"

MPESA_ENV = os.getenv("MPESA_ENV", "sandbox")

MPESA_BASE_URL = (
    "https://sandbox.safaricom.co.ke"
    if MPESA_ENV == "sandbox"
    else "https://api.safaricom.co.ke"
)
