import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_my_roadmap():
    response = client.get("/api/v1/roadmaps")
    assert response.status_code == 200
    data = response.json()
    assert "roadmapId" in data
    assert "nodes" in data
    assert len(data["nodes"]) > 0

def test_complete_node_prerequisite_check():
    # Attempting to complete a locked node with incomplete prerequisites should return 400 Bad Request
    response = client.post(
        "/api/v1/roadmaps/rm_test/nodes/task_2_3/completion",
        json={"evidenceSummary": "Testing locked task completion"}
    )
    assert response.status_code == 400
    data = response.json()
    assert "Prerequisite tasks are incomplete" in data["detail"]

def test_complete_available_node_success():
    # task_1_2 is available after task_1_1
    response = client.post(
        "/api/v1/roadmaps/rm_test/nodes/task_1_2/completion",
        json={"evidenceSummary": "Completed TypeScript strict interfaces exercise"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["completedNodeId"] == "task_1_2"
    assert data["newStatus"] == "completed"
