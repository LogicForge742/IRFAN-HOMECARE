from datetime import datetime
from uuid import uuid4

from app.extensions import db


class Organization(db.Model):
    __tablename__ = "organizations"

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

    is_active = db.Column(
        db.Boolean,
        default=True,
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

    members = db.relationship(
        "OrganizationMember",
        back_populates="organization",
        cascade="all, delete-orphan",
    )


class OrganizationMember(db.Model):
    __tablename__ = "organization_members"

    id = db.Column(
        db.String(36),
        primary_key=True,
        default=lambda: str(uuid4()),
    )

    organization_id = db.Column(
        db.String(36),
        db.ForeignKey("organizations.id", ondelete="CASCADE"),
        nullable=False,
    )

    user_id = db.Column(
        db.String(36),
        db.ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )

    role = db.Column(
        db.String(20),
        nullable=False,
        default="member",
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

    organization = db.relationship(
        "Organization",
        back_populates="members",
    )

    user = db.relationship(
        "User",
        foreign_keys=[user_id],
    )
