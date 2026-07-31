from app.extensions import db
from app.models.patient import Patient


class PatientRepository:

    @staticmethod
    def get_by_user_id(user_id):
        return Patient.query.filter_by(
            user_id=user_id
        ).first()


    @staticmethod
    def create(patient):
        db.session.add(patient)
        db.session.commit()

        return patient


    @staticmethod
    def update(patient):
        db.session.commit()

        return patient