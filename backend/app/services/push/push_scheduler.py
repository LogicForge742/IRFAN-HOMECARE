import logging
from app.services.push.push_templates import build_push_payload

logger = logging.getLogger(__name__)


class PushScheduler:
    def schedule_push(self, user_id: str, template_key: str, **kwargs) -> dict:
        payload = build_push_payload(template_key, **kwargs)
        logger.info(f"[Push Notification] Scheduled for user {user_id}: {payload['title']}")
        return {
            "status": "queued",
            "user_id": user_id,
            "payload": payload,
        }
