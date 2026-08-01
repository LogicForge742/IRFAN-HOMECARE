from marshmallow import Schema, fields

class SSOLinkAccountSchema(Schema):
    provider = fields.Str(required=True)
    provider_subject_id = fields.Str(required=True)

class SSOUnlinkAccountSchema(Schema):
    confirm = fields.Bool(required=True)
