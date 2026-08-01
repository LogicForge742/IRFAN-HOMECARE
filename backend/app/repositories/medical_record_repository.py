from app.extensions import db
from app.models.medical_record import MedicalRecord


class MedicalRecordRepository:

    @staticmethod
    def create(record):
        db.session.add(record)
        db.session.commit()
        return record

    @staticmethod
    def update():
        db.session.commit()

    @staticmethod
    def delete(record):
        db.session.delete(record)
        db.session.commit()

    @staticmethod
    def get_by_id(record_id):
        return MedicalRecord.query.get(record_id)

    @staticmethod
    def get_by_appointment(appointment_id):
        return MedicalRecord.query.filter_by(appointment_id=appointment_id).first()

    @staticmethod
    def get_by_patient(patient_id):
        return (
            MedicalRecord.query.filter_by(patient_id=patient_id)
            .order_by(MedicalRecord.created_at.desc())
            .all()
        )

    @staticmethod
    def get_by_professional(professional_id):
        return (
            MedicalRecord.query.filter_by(professional_id=professional_id)
            .order_by(MedicalRecord.created_at.desc())
            .all()
        )
