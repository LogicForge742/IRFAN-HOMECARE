from marshmallow import Schema, fields, validate, RAISE


class AppointmentSchema(Schema):

    class Meta:
        unknown = RAISE

    professional_id = fields.Str(
        required=True,
    )

    appointment_date = fields.Date(
        required=True,
    )

    appointment_time = fields.Time(
        required=True,
    )

    reason = fields.Str(
        required=True,
        validate=validate.Length(min=5, max=500),
    )

    location = fields.Str(
        required=True,
        validate=validate.Length(min=3, max=255),
    )