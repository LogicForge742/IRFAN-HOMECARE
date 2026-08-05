import logging

logger = logging.getLogger(__name__)


class AfricaTalkingProvider:
    def send_sms(self, phone_number: str, message: str) -> dict:
        logger.info(f"[Africa's Talking SMS] Sending to {phone_number}: {message}")
        return {"provider": "africas_talking", "status": "sent", "recipient": phone_number}


class TwilioSMSProvider:
    def send_sms(self, phone_number: str, message: str) -> dict:
        logger.info(f"[Twilio SMS] Sending to {phone_number}: {message}")
        return {"provider": "twilio", "status": "sent", "recipient": phone_number}


class MPesaSMSProvider:
    def send_sms(self, phone_number: str, message: str) -> dict:
        logger.info(f"[M-Pesa SMS Gateway] Sending to {phone_number}: {message}")
        return {"provider": "mpesa_sms", "status": "sent", "recipient": phone_number}
