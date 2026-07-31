from datetime import datetime
from uuid import uuid4

from app.extensions import db


class HealthcareProfessional(db.Model):

    __tablename__ = "healthcare_professionals"


    id = db.Column(
        db.String(36),
        primary_key=True,
        default=lambda: str(uuid4()),
    )


    user_id = db.Column(
        db.String(36),
        db.ForeignKey("users.id"),
        nullable=False,
        unique=True,
    )


    license_number = db.Column(
        db.String(100),
        unique=True,
        nullable=False,
    )


    specialization = db.Column(
        db.String(100),
        nullable=False,
    )


    qualification = db.Column(
        db.String(255),
        nullable=False,
    )


    years_of_experience = db.Column(
        db.Integer,
        nullable=False,
        default=0,
    )


    bio = db.Column(
        db.Text,
        nullable=True,
    )


    phone_number = db.Column(
        db.String(20),
        nullable=False,
    )


    consultation_fee = db.Column(
        db.Float,
        nullable=False,
        default=0,
    )


    verification_status = db.Column(
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