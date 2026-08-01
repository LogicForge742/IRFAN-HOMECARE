from marshmallow import RAISE, Schema, fields, validate


class NotificationSchema(Schema):

    class Meta:
        unknown = RAISE

    title = fields.Str(
        required=True,
        validate=validate.Length(
            min=3,
            max=255,
        ),
    )

    message = fields.Str(
        required=True,
        validate=validate.Length(
            min=3,
            max=2000,
        ),
    )

    notification_type = fields.Str(
        required=True,
        validate=validate.OneOf(
            [
                "appointment",
                "medical_record",
                "payment",
                "system",
                "reminder",
            ]
        ),
    )
