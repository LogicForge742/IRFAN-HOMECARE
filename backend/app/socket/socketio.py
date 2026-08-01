import os
from flask_socketio import SocketIO

# Retrieve Redis url to coordinate events across processes (web server + Celery worker)
redis_url = os.getenv("CELERY_BROKER_URL", "redis://localhost:6379/0")

if os.getenv("TESTING") == "True" or os.getenv("TESTING") == "true":
    socketio = SocketIO(cors_allowed_origins="*")
else:
    socketio = SocketIO(
        cors_allowed_origins="*",
        message_queue=redis_url,
    )
