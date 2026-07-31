from marshmallow import Schema, fields, RAISE


class AvailableSlotsSchema(Schema):

    class Meta:
        unknown = RAISE

    appointment_date = fields.Date(
        required=True,
    )