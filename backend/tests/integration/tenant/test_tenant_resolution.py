def test_tenant_header_resolution(client):
    headers = {"X-Tenant-Slug": "nyeri-provincial"}
    res = client.get("/api/tenants", headers=headers)
    assert res.status_code in [200, 401]


def test_tenant_subdomain_resolution(client):
    headers = {"Host": "nyeri-provincial.irfanhomecare.ke"}
    res = client.get("/api/tenants", headers=headers)
    assert res.status_code in [200, 401]
