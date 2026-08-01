from marshmallow import RAISE, Schema, fields, validate


class MedicalRecordSchema(Schema):

    class Meta:
        unknown = RAISE

    appointment_id = fields.Str(
        required=True,
    )

    diagnosis = fields.Str(
        required=True,
        validate=validate.Length(
            min=3,
            max=1000,
        ),
    )

    treatment = fields.Str(
        required=True,
        validate=validate.Length(
            min=3,
            max=2000,
        ),
    )

    prescription = fields.Str(
        required=False,
        allow_none=True,
        validate=validate.Length(
            max=2000,
        ),
    )

    notes = fields.Str(
        required=False,
        allow_none=True,
        validate=validate.Length(
            max=5000,
        ),
    )

    follow_up_date = fields.Date(
        required=False,
        allow_none=True,
    )
