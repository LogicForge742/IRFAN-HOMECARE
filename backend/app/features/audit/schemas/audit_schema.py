from marshmallow import Schema, fields

class AuditLogSchema(Schema):
    id = fields.Str(dump_only=True)
    user_id = fields.Str(required=True)
    action = fields.Str(required=True)
    resource = fields.Str(required=True)
    resource_id = fields.Str(allow_none=True)
    ip_address = fields.Str(allow_none=True)
    user_agent = fields.Str(allow_none=True)
    details = fields.Raw(allow_none=True)
    created_at = fields.DateTime(dump_only=True)

class AuditArchiveSchema(Schema):
    before_date = fields.DateTime(required=True)
