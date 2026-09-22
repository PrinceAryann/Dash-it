import os
import httpx
from pydantic import EmailStr
import logging

logger = logging.getLogger(__name__)

async def send_contact_notification(name: str, email: EmailStr, message: str):
    html = f"""<p>New Contact Inquiry from {name} ({email}):</p><p>{message}</p>"""
    
    api_key = os.environ.get('RESEND_API_KEY')
    if not api_key:
        logger.warning("RESEND_API_KEY is not set. Skipping email notification.")
        return
        
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                "https://api.resend.com/emails",
                headers={
                    "Authorization": f"Bearer {api_key}",
                    "Content-Type": "application/json"
                },
                json={
                    "from": "onboarding@resend.dev",
                    "to": os.environ.get("ADMIN_EMAIL", "admin@example.com"),
                    "subject": f"New Contact Inquiry from {name}",
                    "html": html
                }
            )
            response.raise_for_status()
        except Exception as e:
            logger.error(f"Failed to send email via Resend API: {e}")
