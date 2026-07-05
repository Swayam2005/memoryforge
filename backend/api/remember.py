from fastapi import APIRouter
from backend.models import RememberRequest
from backend.services.memory_service import MemoryService

router = APIRouter()

memory = MemoryService()


@router.post("/remember")
async def remember(req: RememberRequest):
    return await memory.remember(req.text)