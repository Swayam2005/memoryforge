from fastapi import APIRouter
from backend.services.memory_service import MemoryService

router = APIRouter()

memory = MemoryService()


@router.post("/improve")
async def improve():

    return await memory.improve()