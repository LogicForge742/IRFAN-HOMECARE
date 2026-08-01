import pytest
from tests.fixtures.users import admin_user

def test_analytics_dashboard_admin(client, admin_user):
    response = client.post(
        "/api/auth/login",
        json={"email": admin_user.email, "password": "Password123!"},
    )
    assert response.status_code == 200
    token = response.get_json()["data"]["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    
    response = client.get("/api/analytics/dashboard", headers=headers)
    assert response.status_code == 200
    data = response.get_json()
    assert "totals" in data
    assert "growth" in data
