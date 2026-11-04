from fastapi import APIRouter

api_router = APIRouter()

@api_router.get("/health", status_code=200)
def health_check():
    """
    Simple API health check endpoint.
    """
    return {
        "status": "healthy",
        "service": "LUNAS API",
        "version": "1.0.0"
    }
