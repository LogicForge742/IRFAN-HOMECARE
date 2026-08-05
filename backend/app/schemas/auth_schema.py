from marshmallow import Schema, fields, validate


class RegisterSchema(Schema):
    class Meta:
        unknown = "RAISE"

    first_name = fields.Str(
        required=True,
        validate=validate.Length(min=2, max=100),
    )

    last_name = fields.Str(
        required=True,
        validate=validate.Length(min=2, max=100),
    )

    email = fields.Email(required=True)

    password = fields.Str(
        required=True,
        validate=validate.Length(min=8),
    )

    role = fields.Str(
        required=False,
        validate=validate.OneOf(["patient", "professional", "admin"]),
        load_default="patient",
    )


class LoginSchema(Schema):
    class Meta:
        unknown = "RAISE"

    email = fields.Email(required=True)

    password = fields.Str(required=True)
