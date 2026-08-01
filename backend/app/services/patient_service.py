from app.models.patient import Patient
from app.repositories.patient_repository import PatientRepository


class PatientService:

    @staticmethod
    def create_profile(user_id, data):

        existing_patient = PatientRepository.get_by_user_id(user_id)

        if existing_patient:
            raise ValueError("Patient profile already exists")

        patient = Patient(
            user_id=user_id,
            **data,
        )

        PatientRepository.create(patient)

        return PatientService.serialize(patient)

    @staticmethod
    def get_profile(user_id):

        patient = PatientRepository.get_by_user_id(user_id)

        if not patient:
            raise ValueError("Patient profile not found")

        return PatientService.serialize(patient)

    @staticmethod
    def update_profile(user_id, data):

        patient = PatientRepository.get_by_user_id(user_id)

        if not patient:
            raise ValueError("Patient profile not found")

        for key, value in data.items():
            setattr(
                patient,
                key,
                value,
            )

        PatientRepository.update(patient)

        return PatientService.serialize(patient)

    @staticmethod
    def serialize(patient):

        return {
            "id": patient.id,
            "user_id": patient.user_id,
            "phone_number": patient.phone_number,
            "date_of_birth": (
                patient.date_of_birth.isoformat() if patient.date_of_birth else None
            ),
            "gender": patient.gender,
            "address": patient.address,
            "blood_group": patient.blood_group,
            "emergency_contact_name": patient.emergency_contact_name,
            "emergency_contact_phone": patient.emergency_contact_phone,
            "medical_notes": patient.medical_notes,
        }
