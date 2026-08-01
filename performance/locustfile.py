from locust import HttpUser, task, between

class IrfanHomeCareUser(HttpUser):
    wait_time = between(1, 3)

    @task(3)
    def view_health(self):
        self.client.get("/api/health")

    @task(2)
    def view_professionals(self):
        self.client.get("/api/professionals?page=1&per_page=10")

    @task(1)
    def login_attempt(self):
        self.client.post("/api/auth/login", json={
            "email": "testuser@example.com",
            "password": "Password123!"
        })
