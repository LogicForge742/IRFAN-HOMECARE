from datetime import datetime
from uuid import uuid4

from app.extensions import db


class File(db.Model):
    __tablename__ = "files"

    id = db.Column(
        db.String(36),
        primary_key=True,
        default=lambda: str(uuid4()),
    )

    user_id = db.Column(
        db.String(36),
        db.ForeignKey("users.id"),
        nullable=False,
        index=True,
    )

    original_filename = db.Column(
        db.String(255),
        nullable=False,
    )

    stored_filename = db.Column(
        db.String(255),
        nullable=False,
        unique=True,
    )

    storage_path = db.Column(
        db.String(500),
        nullable=False,
    )

    mime_type = db.Column(
        db.String(100),
        nullable=False,
    )

    file_size = db.Column(
        db.BigInteger,
        nullable=False,
    )

    category = db.Column(
        db.String(50),
        nullable=False,
        index=True,
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        nullable=False,
    )
