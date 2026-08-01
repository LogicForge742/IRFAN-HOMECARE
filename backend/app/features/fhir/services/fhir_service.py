from app.models.user import User
from app.models.appointment import Appointment
from app.models.medical_record import MedicalRecord
from app.features.fhir.mappers.fhir_mapper import FHIRMapper
from app.features.fhir.validators.fhir_validator import FHIRValidator

class FHIRService:
    @staticmethod
    def get_patient_resource(patient_id):
        user = User.query.filter_by(id=patient_id, role="patient").first()
        if not user:
            return None
        return FHIRMapper.to_fhir_patient(user)

    @staticmethod
    def get_appointment_resource(appointment_id):
        appointment = Appointment.query.filter_by(id=appointment_id).first()
        if not appointment:
            return None
        return FHIRMapper.to_fhir_appointment(appointment)

    @staticmethod
    def get_observation_resource(record_id):
        record = MedicalRecord.query.filter_by(id=record_id).first()
        if not record:
            return None
        return FHIRMapper.to_fhir_observation(record)

    @classmethod
    def validate_fhir_resource(cls, resource):
        return FHIRValidator.validate_resource(resource)

    @classmethod
    def import_fhir_resource(cls, resource):
        is_valid, errors = cls.validate_fhir_resource(resource)
        if not is_valid:
            return False, f"Validation failed: {', '.join(errors)}"
        
        resource_type = resource.get("resourceType")
        resource_id = resource.get("id")
        return True, f"Successfully imported FHIR {resource_type} (ID: {resource_id})"

    @classmethod
    def export_patient_bundle(cls, patient_id):
        patient_res = cls.get_patient_resource(patient_id)
        if not patient_res:
            return None
        
        bundle = {
            "resourceType": "Bundle",
            "type": "collection",
            "entry": [
                {"resource": patient_res}
            ]
        }
        
        appointments = Appointment.query.filter_by(patient_id=patient_id).all()
        for appt in appointments:
            bundle["entry"].append({"resource": FHIRMapper.to_fhir_appointment(appt)})
            
        records = MedicalRecord.query.filter_by(patient_id=patient_id).all()
        for rec in records:
            bundle["entry"].append({"resource": FHIRMapper.to_fhir_observation(rec)})
            
        return bundle
