from marshmallow import Schema, fields, validate

class VideoSessionCreateSchema(Schema):
    appointment_id = fields.Str(
        required=True,
        validate=validate.Length(equal=36),
    )

class VideoSessionRoomSchema(Schema):
    room_id = fields.Str(
        required=True,
        validate=validate.Length(min=5, max=100),
    )
