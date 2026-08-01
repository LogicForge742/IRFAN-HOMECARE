from marshmallow import Schema, fields, validate


class PatientProfileSchema(Schema):

    class Meta:
        unknown = "RAISE"

    phone_number = fields.Str(
        required=False,
        validate=validate.Length(min=10, max=20),
    )

    date_of_birth = fields.Date(
        required=False,
    )

    gender = fields.Str(
        required=False,
        validate=validate.Length(min=3, max=20),
    )

    address = fields.Str(
        required=False,
        validate=validate.Length(max=255),
    )

    blood_group = fields.Str(
        required=False,
        validate=validate.Length(max=10),
    )

    emergency_contact_name = fields.Str(
        required=False,
        validate=validate.Length(max=100),
    )

    emergency_contact_phone = fields.Str(
        required=False,
        validate=validate.Length(min=10, max=20),
    )

    medical_notes = fields.Str(
        required=False,
    )
