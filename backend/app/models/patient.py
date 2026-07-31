from datetime import datetime
from uuid import uuid4

from app.extensions import db


class Patient(db.Model):

    __tablename__ = "patients"

    id = db.Column(
        db.String(36),
        primary_key=True,
        default=lambda: str(uuid4()),
    )

    user_id = db.Column(
        db.String(36),
        db.ForeignKey("users.id"),
        unique=True,
        nullable=False,
    )

    phone_number = db.Column(
        db.String(20),
        nullable=True,
    )

    date_of_birth = db.Column(
        db.Date,
        nullable=True,
    )

    gender = db.Column(
        db.String(20),
        nullable=True,
    )

    address = db.Column(
        db.String(255),
        nullable=True,
    )

    blood_group = db.Column(
        db.String(10),
        nullable=True,
    )

    emergency_contact_name = db.Column(
        db.String(100),
        nullable=True,
    )

    emergency_contact_phone = db.Column(
        db.String(20),
        nullable=True,
    )

    medical_notes = db.Column(
        db.Text,
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