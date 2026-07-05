from fastapi import APIRouter
from backend.models import RecallRequest
from backend.services.memory_service import MemoryService

router = APIRouter()

memory = MemoryService()


@router.post("/recall")
async def recall(req: RecallRequest):
    return await memory.recall(req.query)