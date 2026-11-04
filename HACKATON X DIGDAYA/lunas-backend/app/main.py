from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1 import api_router
from app.api.snap_mock import router as snap_mock_router
from app.api.engine import router as engine_router
from app.api.ai_nudging import router as ai_nudging_router

app = FastAPI(
    title=settings.APP_NAME,
    description="Financial backend for LUNAS application including sweep ordering, investments, and vector storage.",
    version="1.0.0",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    debug=settings.DEBUG
)

# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the API router
app.include_router(api_router, prefix=settings.API_V1_STR)
app.include_router(snap_mock_router, prefix="/api/snap", tags=["SNAP BI Simulation"])
app.include_router(engine_router, prefix="/api/engine", tags=["Core Engine"])
app.include_router(ai_nudging_router, prefix="/api/ai", tags=["AI Behavioral Nudging"])

@app.get("/")
def read_root():
    return {
        "message": f"Welcome to the {settings.APP_NAME} API. Access API documentation at {settings.API_V1_STR}/docs"
    }
