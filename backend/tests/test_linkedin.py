from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_analyze_linkedin_profile():
    # Login demo user to get access token
    login_res = client.post(
        "/api/v1/auth/login",
        json={"email": "captain@careeriq.io", "password": "password123"}
    )
    token = login_res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # Analyze profile URL with custom handle
    response = client.post(
        "/api/v1/profile/linkedin/analyze",
        headers=headers,
        json={
            "linkedinUrl": "https://linkedin.com/in/alex-rivera-data-analyst",
            "targetRole": "Data Analyst"
        }
    )

    assert response.status_code == 200
    data = response.json()
    assert data["extractedUsername"] == "alex-rivera-data-analyst"
    assert data["customUrlDetected"] is True
    assert data["overallScore"] >= 70
    assert len(data["suggestedHeadlines"]) == 3
    assert len(data["issuesFound"]) > 0
    assert len(data["sectionScores"]) == 6
