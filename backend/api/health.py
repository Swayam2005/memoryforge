from fastapi import APIRouter

router = APIRouter()


@router.get("/health")
async def health():
    return {
        "status": "healthy",
        "project": "MemoryForge",
        "version": "1.0"
    }