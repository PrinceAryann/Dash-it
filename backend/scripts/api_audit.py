import httpx
import asyncio
import time
import json

API_URL = "http://localhost:8000/api"

async def run_tests():
    print("--- STARTING API AUDIT (CHUNK B) ---")
    
    async with httpx.AsyncClient(base_url=API_URL, timeout=10.0) as client:
        # 1. Test Rate Limiting on Contact Form
        print("\n1. Testing Rate Limiting on Contact Form (/contact)")
        responses = []
        for i in range(10):
            res = await client.post("/contact/", json={
                "name": f"Spammer {i}",
                "email": f"spam{i}@spam.com",
                "message": "Spam message"
            })
            responses.append(res.status_code)
        print(f"Status codes: {responses}")
        if 429 in responses:
            print("[PASS] Rate limiting is working.")
        else:
            print("[FAIL] Rate limiting failed. Allowed spam flood.")
            
        # 2. Test XSS / SQLi Payloads
        print("\n2. Testing XSS/SQLi Payload on Contact Form")
        payload = {
            "name": "<script>alert('XSS')</script>",
            "email": "test@test.com",
            "message": "DROP TABLE admin_users; --"
        }
        res = await client.post("/contact/", json=payload)
        print(f"Payload response code: {res.status_code}")
        if res.status_code == 422:
            print("[PASS] Pydantic successfully rejected the malicious payload.")
        elif res.status_code == 200:
            print("[WARNING] API accepted the malicious payload. Let's verify if the database sanitized it.")
            
        # 3. Test Invalid JWT Handling
        print("\n3. Testing Invalid JWT Handling on Admin Route")
        res = await client.get("/auth/me", headers={"Authorization": "Bearer fake_token_12345"})
        print(f"Invalid token response: {res.status_code}")
        if res.status_code == 401:
            print("[PASS] Successfully rejected fake JWT.")
        else:
            print("[FAIL] Unexpected response for fake JWT.")
            
        # 4. Test Analytics Rate Limiting
        print("\n4. Testing Analytics Visit Tracking")
        res1 = await client.post("/analytics/visit", json={"path": "/about"})
        res2 = await client.post("/analytics/visit", json={"path": "/about"})
        print(f"Visit 1: {res1.status_code}, Visit 2: {res2.status_code}")
        
    print("\n--- API AUDIT COMPLETE ---")

if __name__ == "__main__":
    asyncio.run(run_tests())
