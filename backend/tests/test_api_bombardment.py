import pytest
import httpx
import asyncio

BASE_URL = "http://localhost"

PAYLOADS = {
    "sql_injection": "' OR 1=1 --",
    "xss": "<script>alert(1)</script>",
    "malformed_json": "{ broken: json,",
    "large_payload": "A" * 10000
}

endpoints = [
    ("/api/health", "GET"),
    ("/api/projects", "GET"),
    ("/api/projects", "POST"),
    ("/api/contact", "POST"),
    ("/api/auth/login", "POST")
]

@pytest.mark.asyncio
async def test_bombardment():
    async with httpx.AsyncClient(base_url=BASE_URL, follow_redirects=True) as client:
        for path, method in endpoints:
            if method == "GET":
                res = await client.get(path)
                assert res.status_code in [200, 401, 403, 404, 405]
                
                # Malicious query string
                res_malicious = await client.get(path + "?q=" + PAYLOADS["sql_injection"])
                assert res_malicious.status_code != 500, f"500 Internal Server Error on {path} with SQLi GET"
                
            elif method == "POST":
                # Test invalid payload
                res = await client.post(path, json={"malicious": PAYLOADS["sql_injection"]})
                # It should not return 500. It should return 422 or 401
                assert res.status_code != 500, f"500 Internal Server Error on {path} with SQLi POST"
                
                res2 = await client.post(path, content=PAYLOADS["malformed_json"])
                assert res2.status_code in [400, 422, 415, 401, 403], f"Failed to handle malformed json on {path}"
