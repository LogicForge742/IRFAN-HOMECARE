from marshmallow import Schema, fields

class DashboardTotalsSchema(Schema):
    total_users = fields.Int(required=True)
    total_patients = fields.Int(required=True)
    total_professionals = fields.Int(required=True)
    total_revenue = fields.Float(required=True)
    total_payments = fields.Int(required=True)
    total_appointments = fields.Int(required=True)

class DashboardSummarySchema(Schema):
    totals = fields.Nested(DashboardTotalsSchema, required=True)
    growth = fields.Dict(keys=fields.Str(), values=fields.Float(), required=True)

class RevenueTrendSchema(Schema):
    month = fields.Str(required=True)
    amount = fields.Float(required=True)

class PaymentAnalyticsSchema(Schema):
    distribution = fields.Dict(keys=fields.Str(), values=fields.Int(), required=True)
    recent = fields.List(fields.Dict(), required=True)

class AppointmentAnalyticsSchema(Schema):
    distribution = fields.Dict(keys=fields.Str(), values=fields.Int(), required=True)
    trends = fields.List(fields.Dict(), required=True)

class ProfessionalAnalyticSchema(Schema):
    id = fields.Str(required=True)
    name = fields.Str(required=True)
    specialization = fields.Str(required=True)
    appointments_count = fields.Int(required=True)

class PatientGrowthSchema(Schema):
    month = fields.Str(required=True)
    count = fields.Int(required=True)

class SystemHealthSchema(Schema):
    services = fields.Dict(keys=fields.Str(), values=fields.Str(), required=True)
    metrics = fields.Dict(keys=fields.Str(), values=fields.Float(), required=True)
