from datetime import datetime
from uuid import uuid4

from app.extensions import db


class MedicalRecord(db.Model):
    __tablename__ = "medical_records"

    id = db.Column(
        db.String(36),
        primary_key=True,
        default=lambda: str(uuid4()),
    )

    appointment_id = db.Column(
        db.String(36),
        db.ForeignKey("appointments.id"),
        nullable=False,
        unique=True,
    )

    patient_id = db.Column(
        db.String(36),
        db.ForeignKey("patients.id"),
        nullable=False,
    )

    professional_id = db.Column(
        db.String(36),
        db.ForeignKey("healthcare_professionals.id"),
        nullable=False,
    )

    diagnosis = db.Column(
        db.Text,
        nullable=False,
    )

    treatment = db.Column(
        db.Text,
        nullable=False,
    )

    prescription = db.Column(
        db.Text,
        nullable=True,
    )

    notes = db.Column(
        db.Text,
        nullable=True,
    )

    follow_up_date = db.Column(
        db.Date,
        nullable=True,
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    updated_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )
