from marshmallow import RAISE, Schema, fields, validate


class AvailabilitySchema(Schema):

    class Meta:
        unknown = RAISE

    day_of_week = fields.Integer(
        required=True,
        validate=validate.Range(min=0, max=6),
    )

    start_time = fields.Time(
        required=True,
    )

    end_time = fields.Time(
        required=True,
    )

    is_available = fields.Boolean(
        load_default=True,
    )
