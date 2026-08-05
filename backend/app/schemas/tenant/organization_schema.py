from marshmallow import Schema, fields, validate


class OrganizationCreateSchema(Schema):
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

    is_active = fields.Bool(
        required=False,
        load_default=True,
    )


class AddMemberSchema(Schema):
    class Meta:
        unknown = "EXCLUDE"

    user_identifier = fields.Str(
        required=True,
        metadata={"description": "User ID or Email address"},
    )

    role = fields.Str(
        required=False,
        load_default="member",
        validate=validate.OneOf(["owner", "admin", "member"]),
    )
