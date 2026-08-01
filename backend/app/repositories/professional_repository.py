from app.extensions import db
from app.models.healthcare_professional import HealthcareProfessional


class ProfessionalRepository:

    @staticmethod
    def get_by_user_id(user_id):
        return HealthcareProfessional.query.filter_by(user_id=user_id).first()

    @staticmethod
    def get_by_license_number(license_number):
        return HealthcareProfessional.query.filter_by(
            license_number=license_number
        ).first()

    @staticmethod
    def license_exists(license_number):
        return (
            HealthcareProfessional.query.filter_by(
                license_number=license_number
            ).first()
            is not None
        )

    @staticmethod
    def create(professional):
        db.session.add(professional)
        db.session.commit()

        return professional

    @staticmethod
    def update():
        db.session.commit()

    @staticmethod
    def get_by_id(professional_id):
        return HealthcareProfessional.query.get(professional_id)
