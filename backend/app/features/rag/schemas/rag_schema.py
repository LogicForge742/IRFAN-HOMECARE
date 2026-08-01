from marshmallow import Schema, fields

class RAGQuerySchema(Schema):
    query = fields.Str(required=True)

class RAGIngestSchema(Schema):
    title = fields.Str(required=True)
    text = fields.Str(required=True)
    metadata = fields.Dict(keys=fields.Str(), values=fields.Raw(), required=False)
