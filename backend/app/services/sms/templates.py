SMS_TEMPLATES = {
    "appointment_reminder": "Irfan HomeCare: Reminder for your appointment with {practitioner} at {time}. Reply 1 to confirm.",
    "payment_reminder": "Irfan HomeCare: Outstanding balance of KES {amount} for invoice {invoice_id}. Pay via M-Pesa Till 889922.",
    "followup_checkin": "Irfan HomeCare: How are you feeling post-consultation? Access your care plan: {link}",
    "otp_code": "Your Irfan HomeCare verification code is: {code}. Valid for 10 minutes.",
}


def render_sms_template(template_name: str, **kwargs) -> str:
    template = SMS_TEMPLATES.get(template_name, "{message}")
    return template.format(**kwargs)
