import cloudinary
import cloudinary.uploader
from app.core.config import settings

cloudinary.config(
    cloudinary_url=settings.CLOUDINARY_URL
)

def upload_image(file_data, folder="dash-it"):
    result = cloudinary.uploader.upload(file_data, folder=folder)
    return result.get("secure_url")
