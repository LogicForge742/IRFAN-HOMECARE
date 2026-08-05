PUSH_TEMPLATES = {
    "APPOINTMENT_REMINDER": {
        "title": "Upcoming Consultation Reminder",
        "body": "Your appointment starts in 1 hour. Tap to view details or join room.",
        "icon": "/assets/branding/default-favicon.svg",
    },
    "PAYMENT_RECEIPT": {
        "title": "Payment Confirmed",
        "body": "Your payment of KES {amount} was received via M-Pesa.",
        "icon": "/assets/branding/default-favicon.svg",
    },
    "CARE_PLAN_UPDATE": {
        "title": "Care Plan Update",
        "body": "Your practitioner has updated your care instructions.",
        "icon": "/assets/branding/default-favicon.svg",
    },
}


def build_push_payload(template_key: str, **kwargs) -> dict:
    template = PUSH_TEMPLATES.get(template_key, {"title": "Irfan HomeCare Notice", "body": "You have a new update."})
    body = template["body"].format(**kwargs)
    return {
        "title": template["title"],
        "body": body,
        "icon": template.get("icon", "/assets/branding/default-favicon.svg"),
        "data": kwargs,
    }
