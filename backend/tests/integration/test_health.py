def test_health_check(client):
    response = client.get("/health")
    assert response.status_code == 200
    data = response.get_json()
    assert data["status"] == "healthy"


def test_ready_check(client):
    response = client.get("/ready")
    assert response.status_code == 200
    data = response.get_json()
    assert "database" in data
    assert "redis" in data


def test_metrics_check(client):
    response = client.get("/metrics")
    assert response.status_code == 200
    data = response.get_json()
    assert "requests_total" in data
    assert "requests_failed" in data
    assert "avg_response_time_ms" in data
