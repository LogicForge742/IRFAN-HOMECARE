import os
import tempfile

import pytest

from app import create_app
from app.extensions import db


@pytest.fixture(scope="session")
def app():
    """Create a Flask application configured for testing."""

    db_fd, db_path = tempfile.mkstemp()
    os.environ["TESTING"] = "True"

    app = create_app()

    app.config.update(
        TESTING=True,
        RATELIMIT_ENABLED=False,
        SQLALCHEMY_DATABASE_URI=f"sqlite:///{db_path}",
        JWT_SECRET_KEY="test-secret-key",
    )

    with app.app_context():
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()

    os.close(db_fd)
    os.unlink(db_path)


@pytest.fixture()
def client(app):
    return app.test_client()


@pytest.fixture()
def patient_payload():

    return {
        "first_name": "Milton",
        "last_name": "Ngeno",
        "email": "milton@example.com",
        "password": "Password123!",
        "role": "patient",
    }


@pytest.fixture()
def professional_payload():

    return {
        "first_name": "John",
        "last_name": "Doctor",
        "email": "doctor@example.com",
        "password": "Password123!",
        "role": "professional",
    }


@pytest.fixture()
def registered_patient(
    client,
    patient_payload,
):

    client.post(
        "/api/auth/register",
        json=patient_payload,
    )

    return patient_payload


@pytest.fixture()
def patient_token(
    client,
    registered_patient,
):

    response = client.post(
        "/api/auth/login",
        json={
            "email": registered_patient["email"],
            "password": registered_patient["password"],
        },
    )

    return response.get_json()["data"]["access_token"]


@pytest.fixture()
def patient_headers(
    patient_token,
):

    return {"Authorization": f"Bearer {patient_token}"}
