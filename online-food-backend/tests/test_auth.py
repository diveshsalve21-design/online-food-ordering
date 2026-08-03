"""
Test suite for authentication endpoints
"""
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from main import app
from database import Base

# Test database setup
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@pytest.fixture(scope="function")
def client():
    """Create test client and database tables."""
    Base.metadata.create_all(bind=engine)
    
    def override_get_db():
        try:
            db = TestingSessionLocal()
            yield db
        finally:
            db.close()
    
    from main import get_db
    app.dependency_overrides[get_db] = override_get_db
    
    with TestClient(app) as test_client:
        yield test_client
    
    app.dependency_overrides.clear()
    Base.metadata.drop_all(bind=engine)


def test_register_user(client):
    """Test user registration."""
    response = client.post(
        "/auth/register",
        json={
            "full_name": "Test User",
            "email": "test@example.com",
            "phone": "1234567890",
            "password_hash": "password123",
            "password_confirm": "password123",
            "role": "CUSTOMER"
        }
    )
    assert response.status_code == 201
    data = response.json()
    assert data["email"] == "test@example.com"
    assert "id" in data


def test_register_user_password_mismatch(client):
    """Test registration with mismatched passwords."""
    response = client.post(
        "/auth/register",
        json={
            "full_name": "Test User",
            "email": "test2@example.com",
            "phone": "1234567891",
            "password_hash": "password123",
            "password_confirm": "password456"
        }
    )
    assert response.status_code == 400


def test_login_success(client):
    """Test successful login."""
    # First register a user
    client.post(
        "/auth/register",
        json={
            "full_name": "Login User",
            "email": "login@example.com",
            "phone": "1234567892",
            "password_hash": "password123",
            "password_confirm": "password123"
        }
    )
    
    # Then login
    response = client.post(
        "/auth/login",
        data={
            "username": "login@example.com",
            "password": "password123"
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert "refresh_token" in data
    assert data["token_type"] == "bearer"


def test_login_invalid_credentials(client):
    """Test login with invalid credentials."""
    response = client.post(
        "/auth/login",
        data={
            "username": "nonexistent@example.com",
            "password": "wrongpassword"
        }
    )
    assert response.status_code == 401


def test_get_current_user(client):
    """Test getting current user info."""
    # Register and login
    client.post(
        "/auth/register",
        json={
            "full_name": "Current User",
            "email": "current@example.com",
            "phone": "1234567893",
            "password_hash": "password123",
            "password_confirm": "password123"
        }
    )
    
    login_response = client.post(
        "/auth/login",
        data={
            "username": "current@example.com",
            "password": "password123"
        }
    )
    
    token = login_response.json()["access_token"]
    
    # Get current user
    response = client.get(
        "/auth/me",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "current@example.com"
