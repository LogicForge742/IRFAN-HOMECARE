from marshmallow import Schema, fields, validate


class TenantCreateSchema(Schema):
    class Meta:
        unknown = "EXCLUDE"

    name = fields.Str(
        required=True,
        validate=validate.Length(min=2, max=100),
    )

    slug = fields.Str(
        required=False,
        validate=validate.Length(min=2, max=100),
    )

    domain = fields.Str(
        required=False,
        allow_none=True,
        validate=validate.Length(max=255),
    )

    logo_url = fields.Str(
        required=False,
        allow_none=True,
    )

    primary_color = fields.Str(
        required=False,
        load_default="#10b981",
    )

    is_active = fields.Bool(
        required=False,
        load_default=True,
    )

    settings = fields.Dict(
        required=False,
        load_default=dict,
    )


class TenantUpdateSchema(Schema):
    class Meta:
        unknown = "EXCLUDE"

    name = fields.Str(required=False)
    logo_url = fields.Str(required=False, allow_none=True)
    primary_color = fields.Str(required=False)
    is_active = fields.Bool(required=False)
    settings = fields.Dict(required=False)
