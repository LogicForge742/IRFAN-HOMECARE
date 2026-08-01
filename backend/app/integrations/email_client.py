from flask_mail import Message

from app.extensions import mail


class EmailClient:

    @staticmethod
    def send(
        *,
        recipients,
        subject,
        html,
        attachments=None,
    ):
        """
        Builds and dispatches an HTML email using Flask-Mail.
        """
        if isinstance(recipients, str):
            recipients = [recipients]

        msg = Message(
            subject=subject,
            recipients=recipients,
            html=html,
        )

        if attachments:
            for attachment in attachments:
                filename = attachment.get("filename")
                content_type = attachment.get(
                    "content_type", "application/octet-stream"
                )
                data = attachment.get("data")
                path = attachment.get("path")

                if data:
                    msg.attach(filename, content_type, data)
                elif path:
                    with open(path, "rb") as f:
                        msg.attach(filename, content_type, f.read())

        mail.send(msg)
        return True
