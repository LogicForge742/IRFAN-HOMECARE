from marshmallow import Schema, fields

class SearchSchema(Schema):
    search = fields.Str(load_default=None)
