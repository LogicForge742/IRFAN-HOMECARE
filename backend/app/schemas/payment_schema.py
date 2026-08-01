from marshmallow import RAISE, Schema, fields, validate


class PaymentSchema(Schema):

    class Meta:
        unknown = RAISE

    appointment_id = fields.Str(
        required=True,
    )

    amount = fields.Decimal(
        required=True,
        as_string=True,
        validate=validate.Range(min=1),
    )

    provider = fields.Str(
        required=True,
        validate=validate.OneOf(
            [
                "MPESA",
            ]
        ),
    )
