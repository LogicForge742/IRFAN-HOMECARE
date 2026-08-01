from marshmallow import RAISE, Schema, fields


class AvailableSlotsSchema(Schema):

    class Meta:
        unknown = RAISE

    appointment_date = fields.Date(
        required=True,
    )
