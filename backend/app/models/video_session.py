from datetime import datetime
from uuid import uuid4
from app.extensions import db

class VideoSession(db.Model):
    __tablename__ = "video_sessions"

    id = db.Column(
        db.String(36),
        primary_key=True,
        default=lambda: str(uuid4()),
    )

    appointment_id = db.Column(
        db.String(36),
        db.ForeignKey("appointments.id"),
        nullable=False,
    )

    room_id = db.Column(
        db.String(100),
        unique=True,
        nullable=False,
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

    status = db.Column(
        db.String(20),
        nullable=False,
        default="scheduled",
    )

    started_at = db.Column(
        db.DateTime,
        nullable=True,
    )

    ended_at = db.Column(
        db.DateTime,
        nullable=True,
    )

    duration = db.Column(
        db.Integer,
        nullable=True,
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    # Relationships
    appointment = db.relationship("Appointment", backref="video_sessions")
    patient = db.relationship("Patient", backref="video_sessions")
    professional = db.relationship("HealthcareProfessional", backref="video_sessions")
