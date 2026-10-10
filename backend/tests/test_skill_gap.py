from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_analyze_skill_gap():
    response = client.get("/api/v1/skill-gap/analyze")
    assert response.status_code == 200
    data = response.json()
    assert "targetRole" in data
    assert "readinessScore" in data
    assert "demonstratedSkills" in data
    assert "missingSkills" in data
