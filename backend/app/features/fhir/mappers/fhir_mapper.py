from app.features.fhir.resources.patient import make_fhir_patient
from app.features.fhir.resources.practitioner import make_fhir_practitioner
from app.features.fhir.resources.appointment import make_fhir_appointment
from app.features.fhir.resources.observation import make_fhir_observation
from app.features.fhir.resources.medication_request import make_fhir_medication_request
from app.features.fhir.resources.condition import make_fhir_condition

class FHIRMapper:
    @staticmethod
    def to_fhir_patient(user):
        return make_fhir_patient(user)

    @staticmethod
    def to_fhir_practitioner(user, professional_meta=None):
        return make_fhir_practitioner(user, professional_meta)

    @staticmethod
    def to_fhir_appointment(appointment):
        return make_fhir_appointment(appointment)

    @staticmethod
    def to_fhir_observation(record):
        return make_fhir_observation(record)

    @staticmethod
    def to_fhir_medication_request(prescription):
        return make_fhir_medication_request(prescription)

    @staticmethod
    def to_fhir_condition(record):
        return make_fhir_condition(record)
