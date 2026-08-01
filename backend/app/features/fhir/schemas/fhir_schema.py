from marshmallow import Schema, fields

class FHIRValidateSchema(Schema):
    resource = fields.Dict(keys=fields.Str(), values=fields.Raw(), required=True)

class FHIRImportSchema(Schema):
    resource = fields.Dict(keys=fields.Str(), values=fields.Raw(), required=True)

class FHIRExportSchema(Schema):
    patient_id = fields.Int(required=True)
