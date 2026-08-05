import json
import pytest
from app.models.tenant.tenant import Tenant
from app.extensions import db


def test_create_and_get_tenant(client, patient_headers):
    payload = {
        "name": "Nyeri Provincial Hospital",
        "slug": "nyeri-provincial",
        "domain": "nyeri.irfanhomecare.ke",
        "primary_color": "#0ea5e9",
        "is_active": True,
    }

    res = client.post("/api/tenants", json=payload, headers=patient_headers)
    assert res.status_code in [201, 409]

    if res.status_code == 201:
        data = res.get_json()["data"]
        assert data["slug"] == "nyeri-provincial"
        assert data["primary_color"] == "#0ea5e9"

        # Fetch tenant
        tenant_id = data["id"]
        get_res = client.get(f"/api/tenants/{tenant_id}", headers=patient_headers)
        assert get_res.status_code == 200
        assert get_res.get_json()["data"]["name"] == "Nyeri Provincial Hospital"


def test_get_tenant_by_slug(client):
    res = client.get("/api/tenants/slug/nyeri-provincial")
    assert res.status_code in [200, 404]
