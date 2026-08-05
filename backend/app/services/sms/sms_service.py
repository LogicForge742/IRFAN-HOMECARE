from app.services.sms.providers import AfricaTalkingProvider, TwilioSMSProvider, MPesaSMSProvider
from app.services.sms.templates import render_sms_template


class SMSService:
    def __init__(self, provider_type: str = "africas_talking"):
        if provider_type == "twilio":
            self.provider = TwilioSMSProvider()
        elif provider_type == "mpesa":
            self.provider = MPesaSMSProvider()
        else:
            self.provider = AfricaTalkingProvider()

    def dispatch_sms(self, phone_number: str, template_name: str, **kwargs) -> dict:
        message = render_sms_template(template_name, **kwargs)
        return self.provider.send_sms(phone_number, message)
