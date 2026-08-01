import pytest
from app.models.user import User
from app.extensions import db, bcrypt

@pytest.fixture
def test_user(app):
    user = User(
        email="testuser@example.com",
        first_name="Jane",
        last_name="Doe",
        role="patient",
        password_hash=bcrypt.generate_password_hash("Password123!").decode("utf-8"),
    )
    db.session.add(user)
    db.session.commit()
    yield user
    db.session.delete(user)
    db.session.commit()

@pytest.fixture
def admin_user(app):
    user = User(
        email="admin@example.com",
        first_name="Admin",
        last_name="User",
        role="admin",
        password_hash=bcrypt.generate_password_hash("Password123!").decode("utf-8"),
    )
    db.session.add(user)
    db.session.commit()
    yield user
    db.session.delete(user)
    db.session.commit()
