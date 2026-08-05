def test_register_user(client):

    response = client.post(
        "/api/auth/register",
        json={
            "first_name": "Milton",
            "last_name": "Ngeno",
            "email": "milton-new@example.com",
            "password": "Password123!",
            "role": "patient",
        },
    )

    assert response.status_code == 201

    data = response.get_json()

    assert data["message"] == "Account created successfully"

    assert "user" in data["data"]


def test_register_duplicate_email(client):

    payload = {
        "first_name": "Milton",
        "last_name": "Ngeno",
        "email": "duplicate@example.com",
        "password": "Password123!",
        "role": "patient",
    }

    client.post(
        "/api/auth/register",
        json=payload,
    )

    response = client.post(
        "/api/auth/register",
        json=payload,
    )

    assert response.status_code == 409

    data = response.get_json()

    assert "message" in data


def test_login_success(client):

    client.post(
        "/api/auth/register",
        json={
            "first_name": "John",
            "last_name": "Doe",
            "email": "john@example.com",
            "password": "Password123!",
            "role": "patient",
        },
    )

    response = client.post(
        "/api/auth/login",
        json={
            "email": "john@example.com",
            "password": "Password123!",
        },
    )

    assert response.status_code == 200

    data = response.get_json()

    assert "access_token" in data["data"]


def test_login_invalid_password(client):

    client.post(
        "/api/auth/register",
        json={
            "first_name": "Jane",
            "last_name": "Doe",
            "email": "jane@example.com",
            "password": "Password123!",
            "role": "patient",
        },
    )

    response = client.post(
        "/api/auth/login",
        json={
            "email": "jane@example.com",
            "password": "WrongPassword",
        },
    )

    assert response.status_code == 401


def test_login_unknown_user(client):

    response = client.post(
        "/api/auth/login",
        json={
            "email": "unknown@example.com",
            "password": "Password123!",
        },
    )

    assert response.status_code == 401


def test_access_protected_route_without_token(client):

    response = client.get("/api/auth/me")

    assert response.status_code == 401


def test_get_current_user(
    client,
    patient_headers,
):

    response = client.get(
        "/api/auth/me",
        headers=patient_headers,
    )

    assert response.status_code == 200

    data = response.get_json()

    assert "email" in data["user"]


def test_register_professional(client):
    response = client.post(
        "/api/auth/register",
        json={
            "first_name": "Jane",
            "last_name": "Provider",
            "email": "jane-provider@example.com",
            "password": "Password123!",
            "role": "professional",
        },
    )
    assert response.status_code == 201
    data = response.get_json()
    assert data["data"]["user"]["role"] == "professional"


def test_register_admin(client):
    response = client.post(
        "/api/auth/register",
        json={
            "first_name": "Admin",
            "last_name": "Sys",
            "email": "sysadmin@example.com",
            "password": "Password123!",
            "role": "admin",
        },
    )
    assert response.status_code == 201
    data = response.get_json()
    assert data["data"]["user"]["role"] == "admin"
