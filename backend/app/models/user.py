from datetime import datetime
from uuid import uuid4

from app.extensions import db


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(
        db.String(36),
        primary_key=True,
        default=lambda: str(uuid4()),
    )

    first_name = db.Column(
        db.String(100),
        nullable=False,
    )

    last_name = db.Column(
        db.String(100),
        nullable=False,
    )

    email = db.Column(
        db.String(255),
        unique=True,
        nullable=False,
        index=True,
    )

    password_hash = db.Column(
        db.String(255),
        nullable=False,
    )

    role = db.Column(
        db.String(20),
        nullable=False,
        default="patient",
    )

    is_active = db.Column(
        db.Boolean,
        default=True,
        nullable=False,
    )

    email_verified = db.Column(
        db.Boolean,
        default=False,
        nullable=False,
    )

    verification_token = db.Column(
        db.String(255),
        nullable=True,
    )

    verification_token_expires_at = db.Column(
        db.DateTime,
        nullable=True,
    )

    password_reset_token = db.Column(
        db.String(255),
        nullable=True,
    )

    password_reset_token_expires_at = db.Column(
        db.DateTime,
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

    sso_provider = db.Column(
        db.String(50),
        nullable=True,
    )

    sso_subject_id = db.Column(
        db.String(255),
        nullable=True,
    )

    @property
    def name(self):
        return f"{self.first_name} {self.last_name}"
