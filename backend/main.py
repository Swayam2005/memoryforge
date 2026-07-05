from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.api.dashboard import router as dashboard_router
from backend.api.remember import router as remember_router
from backend.api.recall import router as recall_router
from backend.api.improve import router as improve_router
from backend.api.forget import router as forget_router
from backend.api.health import router as health_router
from backend.api.memory import router as memory_router

app = FastAPI(
    title="MemoryForge API",
    version="2.0.0",
    description="AI Memory Management Platform",
)

# ==========================================
# CORS
# ==========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================
# API Routes
# ==========================================

app.include_router(dashboard_router)
app.include_router(remember_router)
app.include_router(recall_router)
app.include_router(improve_router)
app.include_router(forget_router)
app.include_router(health_router)
app.include_router(memory_router)

# ==========================================
# Root
# ==========================================

@app.get("/")
async def root():
    return {
        "project": "MemoryForge",
        "version": "2.0.0",
        "status": "running",
        "message": "MemoryForge API is running successfully.",
    }