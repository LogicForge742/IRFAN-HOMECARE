from app.extensions import db
from app.repositories.base.base_repository import BaseRepository
from app.models.healthcare_professional import HealthcareProfessional
from app.models.user import User

class ProfessionalRepository(BaseRepository):
    model = HealthcareProfessional

    @classmethod
    def get_query(cls):
        """
        Overrides default query to perform a join with the User table
        to support name search and other user property filters.
        """
        return cls.model.query.join(User, cls.model.user_id == User.id)

    @classmethod
    def find_all(cls, params=None, search_fields=None):
        """
        Retrieves paginated, filtered professionals.
        Includes User fields (first_name, last_name) in search fields by default.
        """
        if search_fields is None:
            search_fields = [
                cls.model.specialization,
                cls.model.qualification,
                cls.model.bio,
                User.first_name,
                User.last_name,
            ]
        
        query = cls.get_query()
        from app.core.query import build_query
        return build_query(query, cls.model, params, search_fields)

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
