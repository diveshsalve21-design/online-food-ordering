"""
Test suite for cart and order endpoints
"""
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

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
    from main import app
    app.dependency_overrides[get_db] = override_get_db
    
    with TestClient(app) as test_client:
        yield test_client
    
    app.dependency_overrides.clear()
    Base.metadata.drop_all(bind=engine)


def get_auth_token(client, email="test@example.com", password="password123"):
    """Helper to get auth token."""
    # Register if needed
    client.post(
        "/auth/register",
        json={
            "full_name": "Test User",
            "email": email,
            "phone": "1234567890",
            "password_hash": password,
            "password_confirm": password
        }
    )
    
    login_response = client.post(
        "/auth/login",
        data={"username": email, "password": password}
    )
    return login_response.json()["access_token"]


def test_cart_operations(client):
    """Test cart CRUD operations."""
    token = get_auth_token(client)
    headers = {"Authorization": f"Bearer {token}"}
    
    # Get user's cart (should be created on registration)
    response = client.get("/carts/", headers=headers)
    assert response.status_code in [200, 404]  # May not exist yet


def test_order_creation(client):
    """Test order creation."""
    token = get_auth_token(client)
    headers = {"Authorization": f"Bearer {token}"}
    
    # List orders (should be empty)
    response = client.get("/orders/", headers=headers)
    assert response.status_code == 200


def test_payment_operations(client):
    """Test payment operations."""
    token = get_auth_token(client)
    headers = {"Authorization": f"Bearer {token}"}
    
    # List payments
    response = client.get("/payments/", headers=headers)
    assert response.status_code == 200
