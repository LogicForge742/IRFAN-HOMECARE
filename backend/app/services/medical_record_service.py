from app.models.medical_record import MedicalRecord
from app.repositories.appointment_repository import AppointmentRepository
from app.repositories.medical_record_repository import MedicalRecordRepository
from app.repositories.patient_repository import PatientRepository
from app.repositories.professional_repository import ProfessionalRepository
from app.services.notification_service import NotificationService


class MedicalRecordService:

    @staticmethod
    def create_medical_record(user_id, data):

        professional = ProfessionalRepository.get_by_user_id(user_id)

        if not professional:
            raise ValueError("Healthcare professional profile not found.")

        appointment = AppointmentRepository.get_by_id(data["appointment_id"])

        if not appointment:
            raise ValueError("Appointment not found.")

        if appointment.professional_id != professional.id:
            raise ValueError("You are not assigned to this appointment.")

        existing_record = MedicalRecordRepository.get_by_appointment(appointment.id)

        if existing_record:
            raise ValueError("Medical record already exists for this appointment.")

        if appointment.status.lower() != "completed":
            raise ValueError(
                "Medical records can only be created for completed appointments."
            )

        record = MedicalRecord(
            appointment_id=appointment.id,
            patient_id=appointment.patient_id,
            professional_id=professional.id,
            diagnosis=data["diagnosis"],
            treatment=data["treatment"],
            prescription=data.get("prescription"),
            notes=data.get("notes"),
            follow_up_date=data.get("follow_up_date"),
        )

        MedicalRecordRepository.create(record)

        patient = PatientRepository.get_by_id(appointment.patient_id)
        if patient:
            NotificationService.create_notification(
                user_id=patient.user_id,
                title="Medical Record Available",
                message=(
                    "Your consultation has been completed and "
                    "your medical record is now available."
                ),
                notification_type="medical_record",
            )

        return {
            "id": record.id,
            "appointment_id": record.appointment_id,
            "patient_id": record.patient_id,
            "professional_id": record.professional_id,
            "diagnosis": record.diagnosis,
            "treatment": record.treatment,
            "prescription": record.prescription,
            "notes": record.notes,
            "follow_up_date": (
                record.follow_up_date.isoformat() if record.follow_up_date else None
            ),
            "created_at": record.created_at.isoformat(),
        }

    @staticmethod
    def get_patient_records(patient_id):

        records = MedicalRecordRepository.get_by_patient(patient_id)

        return [
            {
                "id": record.id,
                "appointment_id": record.appointment_id,
                "diagnosis": record.diagnosis,
                "treatment": record.treatment,
                "prescription": record.prescription,
                "notes": record.notes,
                "follow_up_date": (
                    record.follow_up_date.isoformat() if record.follow_up_date else None
                ),
                "created_at": record.created_at.isoformat(),
            }
            for record in records
        ]

    @staticmethod
    def get_professional_records(user_id):

        professional = ProfessionalRepository.get_by_user_id(user_id)

        if not professional:
            raise ValueError("Healthcare professional profile not found.")

        records = MedicalRecordRepository.get_by_professional(professional.id)

        return [
            {
                "id": record.id,
                "appointment_id": record.appointment_id,
                "patient_id": record.patient_id,
                "diagnosis": record.diagnosis,
                "treatment": record.treatment,
                "prescription": record.prescription,
                "notes": record.notes,
                "follow_up_date": (
                    record.follow_up_date.isoformat() if record.follow_up_date else None
                ),
                "created_at": record.created_at.isoformat(),
            }
            for record in records
        ]
