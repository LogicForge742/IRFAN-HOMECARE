from marshmallow import RAISE, Schema, fields, validate


class ProfessionalProfileSchema(Schema):

    class Meta:
        unknown = RAISE

    license_number = fields.Str(
        required=True,
        validate=validate.Length(min=3, max=100),
    )

    specialization = fields.Str(
        required=True,
        validate=validate.Length(min=2, max=100),
    )

    qualification = fields.Str(
        required=True,
        validate=validate.Length(min=2, max=255),
    )

    years_of_experience = fields.Int(
        required=True,
        validate=validate.Range(min=0),
    )

    bio = fields.Str(
        allow_none=True,
    )

    phone_number = fields.Str(
        required=True,
        validate=validate.Length(min=10, max=20),
    )

    consultation_fee = fields.Float(
        required=True,
        validate=validate.Range(min=0),
    )
