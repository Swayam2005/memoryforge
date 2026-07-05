from fastapi import APIRouter
from backend.models import ForgetRequest
from backend.services.memory_service import MemoryService

router = APIRouter()

memory = MemoryService()


@router.post("/forget")
async def forget(req: ForgetRequest):

    return await memory.forget(req.query)