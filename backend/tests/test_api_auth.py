import pytest
import httpx

BASE_URL = "http://localhost"

@pytest.mark.asyncio
async def test_auth_flows():
    async with httpx.AsyncClient(base_url=BASE_URL, follow_redirects=True) as client:
        # Test 1: Access protected route without JWT
        res = await client.post("/api/projects", json={"title": "Test"})
        assert res.status_code == 401, "Should reject unauthenticated POST"

        # Test 2: Access protected route with Invalid JWT
        res_invalid = await client.post(
            "/api/projects", 
            json={"title": "Test"},
            headers={"Authorization": "Bearer invalid.jwt.token"}
        )
        assert res_invalid.status_code == 401, "Should reject invalid JWT"

        # Test 3: Login with invalid credentials
        res_login_fail = await client.post(
            "/api/auth/login", 
            data={"username": "admin", "password": "wrongpassword"}
        )
        assert res_login_fail.status_code in [401, 400], "Should reject bad credentials"
        
        # Test 4: Missing Authorization Header formatting
        res_bad_header = await client.post(
            "/api/projects", 
            json={"title": "Test"},
            headers={"Authorization": "Bearer"}
        )
        assert res_bad_header.status_code == 401, "Should reject malformed Bearer header"
