import os
import sys

CRITICAL_VARS = [
    "DATABASE_URL",
    "REDIS_URL",
    "CELERY_BROKER_URL",
    "JWT_SECRET_KEY"
]

def validate_env_vars():
    missing = [var for var in CRITICAL_VARS if not os.getenv(var)]
    if missing:
        print(f"CRITICAL STARTUP ERROR: Missing environment variables: {', '.join(missing)}")
        sys.exit(1)
    print("Startup: Environment variables verified successfully.")
