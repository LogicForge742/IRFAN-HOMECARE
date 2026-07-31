from datetime import datetime
from uuid import uuid4

from app.extensions import db


class Appointment(db.Model):
    __tablename__ = "appointments"

    id = db.Column(
        db.String(36),
        primary_key=True,
        default=lambda: str(uuid4()),
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

    appointment_date = db.Column(
        db.Date,
        nullable=False,
    )

    appointment_time = db.Column(
        db.Time,
        nullable=False,
    )

    location = db.Column(
        db.String(255),
        nullable=False,
    )

    reason = db.Column(
        db.Text,
        nullable=False,
    )

    status = db.Column(
        db.String(20),
        nullable=False,
        default="pending",
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