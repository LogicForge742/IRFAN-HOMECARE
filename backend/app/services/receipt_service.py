import os

from app.models.file import File
from app.repositories.appointment_repository import AppointmentRepository
from app.repositories.file_repository import FileRepository
from app.repositories.patient_repository import PatientRepository
from app.repositories.payment_repository import PaymentRepository
from app.repositories.professional_repository import ProfessionalRepository
from app.repositories.user_repository import UserRepository
from app.utils.pdf_generator import PDFGenerator


class ReceiptService:

    @staticmethod
    def generate_receipt_for_payment(payment_id):
        """
        Loads payment, appointment, patient, and professional details,
        generates a receipt PDF using PDFGenerator, registers a File entry,
        and returns the output file path.
        """
        payment = PaymentRepository.get_by_id(payment_id)
        if not payment:
            raise ValueError("Payment not found.")

        appointment = AppointmentRepository.get_by_id(payment.appointment_id)
        patient = (
            PatientRepository.get_by_id(appointment.patient_id) if appointment else None
        )
        professional = (
            ProfessionalRepository.get_by_id(appointment.professional_id)
            if appointment
            else None
        )

        patient_user = UserRepository.get_by_id(patient.user_id) if patient else None
        prof_user = (
            UserRepository.get_by_id(professional.user_id) if professional else None
        )

        patient_name = (
            f"{patient_user.first_name} {patient_user.last_name}"
            if patient_user
            else "N/A"
        )
        prof_name = (
            f"{prof_user.first_name} {prof_user.last_name}" if prof_user else "N/A"
        )

        receipt_data = {
            "reference": payment.reference,
            "status": payment.status,
            "amount": str(payment.amount),
            "patient": patient_name,
            "professional": prof_name,
            "appointment_date": (
                appointment.appointment_date.isoformat() if appointment else "N/A"
            ),
            "payment_date": payment.created_at.strftime("%Y-%m-%d %H:%M:%S"),
            "provider": payment.provider,
            "transaction_id": (
                payment.provider_reference or payment.checkout_request_id or "N/A"
            ),
        }

        output_filename = f"receipt_{payment.reference}.pdf"
        output_path = os.path.join("uploads", "receipts", output_filename)

        PDFGenerator.generate_receipt(output_path, receipt_data)

        # Store metadata in files table if not already created
        file_size = os.path.getsize(output_path)
        file_entry = File(
            user_id=payment.user_id,
            original_filename=output_filename,
            stored_filename=output_filename,
            storage_path=output_path,
            mime_type="application/pdf",
            file_size=file_size,
            category="receipt",
        )
        FileRepository.create(file_entry)

        return output_path
