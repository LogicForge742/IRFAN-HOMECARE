from datetime import datetime
from uuid import uuid4

from app.extensions import db


class Payment(db.Model):
    __tablename__ = "payments"

    id = db.Column(
        db.String(36),
        primary_key=True,
        default=lambda: str(uuid4()),
    )

    appointment_id = db.Column(
        db.String(36),
        db.ForeignKey("appointments.id"),
        nullable=False,
        index=True,
    )

    user_id = db.Column(
        db.String(36),
        db.ForeignKey("users.id"),
        nullable=False,
        index=True,
    )

    amount = db.Column(
        db.Numeric(10, 2),
        nullable=False,
    )

    currency = db.Column(
        db.String(10),
        nullable=False,
        default="KES",
    )

    provider = db.Column(
        db.String(30),
        nullable=False,
        default="MPESA",
    )

    status = db.Column(
        db.String(30),
        nullable=False,
        default="pending",
        index=True,
    )

    reference = db.Column(
        db.String(100),
        unique=True,
        nullable=False,
        index=True,
    )

    provider_reference = db.Column(
        db.String(255),
        nullable=True,
    )

    checkout_request_id = db.Column(
        db.String(255),
        nullable=True,
        index=True,
    )

    merchant_request_id = db.Column(
        db.String(255),
        nullable=True,
    )

    provider_payload = db.Column(
        db.JSON,
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
