from app.models.healthcare_professional import HealthcareProfessional
from app.repositories.professional_repository import ProfessionalRepository


class ProfessionalService:

    @staticmethod
    def create_profile(user_id, data):

        if ProfessionalRepository.get_by_user_id(user_id):
            raise ValueError("Professional profile already exists.")

        if ProfessionalRepository.license_exists(data["license_number"]):
            raise ValueError("License number already exists.")

        professional = HealthcareProfessional(
            user_id=user_id,
            **data,
        )

        ProfessionalRepository.create(professional)

        return {
            "id": professional.id,
            "user_id": professional.user_id,
            "license_number": professional.license_number,
            "specialization": professional.specialization,
            "qualification": professional.qualification,
            "years_of_experience": professional.years_of_experience,
            "bio": professional.bio,
            "phone_number": professional.phone_number,
            "consultation_fee": professional.consultation_fee,
            "verification_status": professional.verification_status,
        }

    @staticmethod
    def get_profile(user_id):

        professional = ProfessionalRepository.get_by_user_id(user_id)

        if not professional:
            raise ValueError("Professional profile not found.")

        return {
            "id": professional.id,
            "user_id": professional.user_id,
            "license_number": professional.license_number,
            "specialization": professional.specialization,
            "qualification": professional.qualification,
            "years_of_experience": professional.years_of_experience,
            "bio": professional.bio,
            "phone_number": professional.phone_number,
            "consultation_fee": professional.consultation_fee,
            "verification_status": professional.verification_status,
        }

    @staticmethod
    def update_profile(user_id, data):

        professional = ProfessionalRepository.get_by_user_id(user_id)

        if not professional:
            raise ValueError("Professional profile not found.")

        for key, value in data.items():
            setattr(professional, key, value)

        ProfessionalRepository.update()

        return {
            "id": professional.id,
            "user_id": professional.user_id,
            "license_number": professional.license_number,
            "specialization": professional.specialization,
            "qualification": professional.qualification,
            "years_of_experience": professional.years_of_experience,
            "bio": professional.bio,
            "phone_number": professional.phone_number,
            "consultation_fee": professional.consultation_fee,
            "verification_status": professional.verification_status,
        }
