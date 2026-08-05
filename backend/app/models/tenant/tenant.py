from datetime import datetime
from uuid import uuid4

from app.extensions import db


class Tenant(db.Model):
    __tablename__ = "tenants"

    id = db.Column(
        db.String(36),
        primary_key=True,
        default=lambda: str(uuid4()),
    )

    name = db.Column(
        db.String(100),
        nullable=False,
    )

    slug = db.Column(
        db.String(100),
        unique=True,
        nullable=False,
        index=True,
    )

    domain = db.Column(
        db.String(255),
        unique=True,
        nullable=True,
        index=True,
    )

    logo_url = db.Column(
        db.String(512),
        nullable=True,
    )

    primary_color = db.Column(
        db.String(30),
        default="#10b981",
        nullable=False,
    )

    is_active = db.Column(
        db.Boolean,
        default=True,
        nullable=False,
    )

    settings = db.Column(
        db.JSON,
        default=dict,
        nullable=False,
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
