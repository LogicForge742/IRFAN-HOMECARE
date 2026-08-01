from marshmallow import Schema, fields

class AIConsultationSummarySchema(Schema):
    observations = fields.Str(required=True)
    symptoms = fields.Str(required=True)
    diagnosis = fields.Str(required=True)

class AIDifferentialDiagnosisSchema(Schema):
    symptoms = fields.Str(required=True)
    diagnosis = fields.Str(required=True)

class AIFollowupSchema(Schema):
    diagnosis = fields.Str(required=True)

class AIPatientInstructionsSchema(Schema):
    diagnosis = fields.Str(required=True)
