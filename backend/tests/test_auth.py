from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_login_demo_user():
    response = client.post(
        "/api/v1/auth/login",
        json={"email": "captain@careeriq.io", "password": "password123"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "access_token" in data
    assert data["user"]["email"] == "captain@careeriq.io"

def test_register_new_user():
    email = f"test_{int(client.get('/health').elapsed.total_seconds() * 1000)}@careeriq.io"
    response = client.post(
        "/api/v1/auth/register",
        json={"email": email, "password": "securepassword123", "name": "Nautical Explorer"}
    )
    assert response.status_code == 201
    data = response.json()
    assert data["success"] is True
    assert "access_token" in data
